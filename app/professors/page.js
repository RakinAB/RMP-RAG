import { Box, Card, CardContent, Grid, Stack, Typography } from '@mui/material'
import Data from '../../reviews.json'
import Navbar from '../components/navbar'

export default function Professors(){
    return(
        <Box>
            <Navbar />
            <Box ml={2} mr={2}>
                <Typography variant='h2' fontWeight={'bold'} mt={2}>List of Professors</Typography>
                <Grid></Grid>
                <Stack>
                    {Data.reviews.map(rev => {
                        return(
                            <Box key={rev.id}>
                                <Card sx={{mt:3, backgroundColor:'#111111', color:'#f0f0f0'}}>
                                    <CardContent>
                                        <Typography variant='h4' fontWeight={'bold'} sx={{textDecoration:'underline'}}>{rev.professor}</Typography>
                                        <Typography variant='h5'>Rating: {rev.stars} out of 5</Typography>
                                        <Typography variant='h6'>Subject: {rev.subject}</Typography>
                                        <Typography variant='h6'>{rev.review}</Typography>
                                    </CardContent>
                                </Card>
                            </Box>
                        )
                    })}
                </Stack>
            </Box>
        </Box>
    )
}