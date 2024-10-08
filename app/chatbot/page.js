'use client'
import { Box, Button, Stack, TextField } from "@mui/material";
import { useState } from "react";
import Navbar from "../components/navbar";


export default function Home() {
  const[messages, setMessages] = useState([
    {
      role:'assistant',
      content: 'Welcome to the Rate My Professor RAG App. How may I help you today?'
    }
  ])
  const[message, setMessage] = useState('')


  const sendMessage = async () =>{
    setMessage('')
    setMessages((messages) => [
      ...messages,
      { role: 'user', content: message },
      { role: 'assistant', content: '' }
    ])
    const response = fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify([...messages, {role:'user', content:message}])
    }).then(async(res)=>{
      const reader = res.body.getReader()
      const decoder = new TextDecoder()


      let result = ''
      return reader.read().then(function processText({done, value}){
        if(done){
          return result
        }
        const text = decoder.decode(value || new Int8Array(), {stream:true})
        setMessages((messages)=>{
          let lastMessage = messages[messages.length-1]
          let otherMessages = messages.slice(0, messages.length-1)
          return [
            ...otherMessages,
            {
              ...lastMessage, 
              content: lastMessage.content + text
            },
          ]
        })
        return reader.read().then(processText)
      })
    })
  }
  return (
    <Box
      width={'100vw'}
      height={'100vh'}
      display={'flex'}
      flexDirection={'column'}
      alignItems={'center'}
    >
      <Navbar />
      <Stack
        direction='column'
        width = '500px'
        height = '700px'
        p={2}
        spacing={3}
        sx={{
          mt:6,
          backgroundColor:'#333333',
          borderRadius:12
        }}
      >
        <Stack
          direction={'column'}
          spacing={2}
          flexGrow={1}
          overflow={'auto'}
          minHeight={'100%'}
        >
          {
            messages.map((message, index)=>(
              <Box
                key={index}
                display={'flex'}
                justifyContent={message.role === 'assistant' ? 'flex-start' : 'flex-end'}
              >
                <Box
                  bgcolor={message.role === 'assistant' ? 'primary.main' : 'gray'}
                  color={message.role === 'assistant' ? 'white' : 'black'}
                  borderRadius={16}
                  p={3}
                >
                  {message.content}
                </Box>
              </Box>
            ))
          }
        </Stack>
        <Stack
          direction={'row'}
          spacing={2}
        >
          <TextField
            label='message'
            fullWidth
            value={message}
            onChange={(e)=>{setMessage(e.target.value)}}
            variant="filled"
            sx={{
              input: { color: '#f0f0f0' },
              '& .MuiInputLabel-root': { color: '#f0f0f0' },
              '& .MuiFilledInput-underline:before': { borderBottomColor: '#f0f0f0' },
              '& .MuiFilledInput-underline:hover:before': { borderBottomColor: '#f0f0f0' },
              '& .MuiFilledInput-underline:after': { borderBottomColor: '#f0f0f0' },
              '& .MuiSelect-icon': { color: '#f0f0f0' }  // Makes the dropdown arrow white
          }}
          />
          <Button variant='contained' onClick={sendMessage}> Send </Button>
        </Stack>
      </Stack>
    </Box>
  )
}



