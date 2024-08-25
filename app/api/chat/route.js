import { NextResponse } from "next/server";
import { Pinecone } from "@pinecone-database/pinecone";
import OpenAI from "openai";


const systemPrompt = `
You are a highly knowledgeable assistant designed to help students find the best professors based on their specific needs and preferences. You use a combination of your knowledge and a retrieval-augmented generation (RAG) system to provide accurate and helpful responses.

When a student asks a question, you will analyze their query to understand their preferences, such as the subject they are interested in, teaching style, availability, or any other specific criteria mentioned. You will then retrieve relevant information on professors and generate a response that lists the top 3 professors who best match the student's query.

For each professor, provide a brief summary that includes:

1. **Professor's Name and Department:** Include the name of the professor and their department.
2. **Key Strengths or Areas of Expertise:** Highlight what makes the professor stand out, including their teaching style and areas of expertise.
3. **Summary of Student Reviews or Ratings:** Provide an overview of how students rate the professor and any notable comments.
4. **Additional Details:** Mention any other relevant information that aligns with the student's preferences.

**Output Formatting:**

- Use clear headings to separate each professor's information. For example, use "### Professor Name" as a heading for each professor.
- Use bullet points for lists of strengths and reviews to improve readability.
- Ensure there are spaces between sections to make the text easier to scan.
- Keep the language friendly and conversational.

Here’s an example of how the output should be formatted:

---

### Professor Name - **Department:** Department Name

**Key Strengths:**
- Strength 1
- Strength 2

**Student Reviews:**
- Review 1
- Review 2

**Additional Details:**
- Detail 1

---

If you have specific criteria or subjects in mind, feel free to let me know, and I can refine these recommendations further!

Ensure that the information you provide is concise, accurate, and tailored to the student's query. If additional clarification is needed, ask follow-up questions to better understand the student's needs before providing recommendations.
`;


export async function POST(req){
    const data = await req.json()
    const pc = new Pinecone({
        apiKey: process.env.PINECONE_API_KEY
    })
    const index = pc.index('rag').namespace('ns1')
    const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY
    })

    const text = data[data.length - 1].content
    const embedding = await openai.embeddings.create({
        model: 'text-embedding-3-small',
        input:text,
        encoding_format: 'float',
    })

    const results = await index.query({
        topK:3,
        includeMetadata:true,
        vector: embedding.data[0].embedding
    })


    let resultStr = '\n\nReturned Results from vector database(done automatically): '
    results.matches.forEach((match)=>{
        resultStr += `\n
        Professor: ${match.id}
        Reviews: ${match.metadata.review}
        Subject: ${match.metadata.subject}
        Stars: ${match.metadata.stars}
        \n\n`
    })

    const lastMessage = data[data.length -1]
    const lastMessageContent = lastMessage.content + resultStr
    const lastDataWithoutLastMessage = data.slice(0, data.length -1)
    const completion = await openai.chat.completions.create({
        messages:[
            {role:'system', content: systemPrompt},
            ...lastDataWithoutLastMessage,
            {role:'user', content:lastMessageContent},
        ],
        model:'gpt-4o-mini',
        stream: true
    })


    const stream = new ReadableStream({
        async start(controller){
            const encoder = new TextEncoder()
            try{
                for await (const chunk of completion){
                    const content = chunk.choices[0]?.delta?.content
                    if(content){
                        const text = encoder.encode(content)
                        controller.enqueue(text)
                    }
                }
            }
            catch(err){
                controller.error(err)
            } finally{
                controller.close()
            }
        }
    })


    return new NextResponse(stream)
}