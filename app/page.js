'use client'
import { Box, Button, Typography } from "@mui/material";
import Navbar from "./components/navbar";

const FeatureBox = ({ title, description, align }) => (
  <Box 
    display={'flex'} 
    flexDirection={'column'}
    alignItems={align} // Align items based on the align prop
    width='40vw'
    sx={{
      backgroundColor: 'black', 
      borderRadius: align === 'flex-start' ? '0 12px 12px 0' : '12px 0 0 12px', // Conditional border-radius
      color: 'white', 
      mb: 4,
      p: 2 // Padding for spacing
    }}
  >
    <Typography variant="h4" sx={{ textAlign: 'left' }}>{title}</Typography>
    <Typography variant='h6' sx={{ textAlign: 'left' }}>{description}</Typography>
  </Box>
)

export default function Home() {
  return (
    <Box
      width={'100vw'}
      display={'flex'}
      flexDirection={'column'}
      alignItems={'center'}
      sx={{
        color: '#f0f0f0', 
        padding: 0,
        minHeight: '100vh'
      }}
    >
      <Navbar />
      <Box 
        display={'flex'} 
        flexDirection={'column'} 
        justifyContent={'center'}
        alignItems={'center'}
        width={'90vw'}
        height={'40vh'}
        sx={{
          mt:2,
          backgroundColor:'#111111',
          color:'#f0f0f0',
          borderRadius:12
        }}
      >
        <Typography variant="h1" sx={{mb:10, fontWeight:'bold'}}>Rate My Professor</Typography>
        <Button variant="contained" sx={{fontSize:20, fontWeight:'bold'}} href='/professors'>Professors List</Button>
      </Box>
      <Box 
        width='100vw' 
        height='400px' 
        display='flex'
        flexDirection='column'
      >
        <Typography variant="h2" textAlign='center' mt={4} mb={4} fontWeight='bold' >Features</Typography>
        <Box
          display='flex'
          flexDirection='column'
          alignItems='flex-start'
          width='70vw'
          p={4}
          sx={{
            backgroundColor:'#111111', 
            color:'#f0f0f0', 
            mb:10,
            borderRadius: '0 50px 50px 0'
          }}
        >
          <Typography variant="h3" mb={3} fontWeight={'bold'}>AI ChatBot</Typography>
          <Typography variant='h4'>Chat with a helpful chatbot that will provide you with advice and suggestions on which professor to choose.</Typography>
        </Box>
        <Box
          display='flex'
          flexDirection='column'
          alignItems='flex-end'
          width='70vw'
          p={4}
          sx={{
            backgroundColor:'#111111', 
            color:'#f0f0f0', 
            ml:'30%', 
            mb:10,
            borderRadius: '50px 0 0 50px'
          }}
        >
          <Typography variant="h3" textAlign={'left'} mb={3} fontWeight={'bold'}>RAG Application</Typography>
          <Typography variant="h4">Uses Pinecone to enable efficient and scalable retrievable data based on user queries.</Typography>
        </Box>
        <Box
          display='flex'
          flexDirection='column'
          alignItems='flex-start'
          width='70vw'
          p={4}
          sx={{
            backgroundColor:'#111111', 
            color:'#f0f0f0', 
            mb:10,
            borderRadius: '0 50px 50px 0'
          }}
        >
          <Typography variant="h3" mb={3} fontWeight={'bold'}>Easy Search</Typography>
          <Typography variant="h4">Easily search for a professor via filters. Can be done by their stars, subject, or name.</Typography>
        </Box>
      </Box>
      {/* <Box width='100vw' sx={{ mt: 4 }}>
        <Typography variant="h3" align='center'>Features</Typography>
        <Box sx={{ mt: 2 }}>
          <FeatureBox 
            title="AI Chatbot" 
            description="Chat with a helpful chatbot that will provide you with advice and suggestions on which professor to choose."
            align="flex-start" // Align to the left
          />
          <FeatureBox 
            title="RAG Application" 
            description="Uses Pinecone to enable efficient and scalable retrievable data based on user queries."
            align="flex-end" // Align to the right
          />
          <FeatureBox 
            title="Easy Search" 
            description="Easily search for a professor via filters. Can be done by their stars, subject, or name."
            align="flex-start" // Align to the left
          />
        </Box>
      </Box> */}
    </Box>
  )
}
