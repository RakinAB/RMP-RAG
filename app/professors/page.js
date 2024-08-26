'use client'
import { useState } from 'react';
import { Box, Card, CardContent, Grid, Stack, Typography, TextField, MenuItem } from '@mui/material';
import Data from '../../reviews.json';
import Navbar from '../components/navbar';

export default function Professors() {
    const [filter, setFilter] = useState('');
    const [sort, setSort] = useState('');
    const [filteredData, setFilteredData] = useState(Data.reviews);

    // Handle filtering
    const handleFilterChange = (event) => {
        const value = event.target.value.toLowerCase();
        setFilter(value);
        const filtered = Data.reviews.filter(rev =>
            rev.professor.toLowerCase().includes(value) ||
            rev.subject.toLowerCase().includes(value)
        );
        setFilteredData(filtered);
    };

    // Handle sorting
    const handleSortChange = (event) => {
        const value = event.target.value;
        setSort(value);
        const sorted = [...filteredData].sort((a, b) => {
            if (value === 'name') {
                return a.professor.localeCompare(b.professor);
            } else if (value === 'rating') {
                return b.stars - a.stars;
            } else {
                return 0; // No sorting
            }
        });
        setFilteredData(sorted);
    };

    return (
        <Box>
            <Navbar />
            <Box ml={2} mr={2}>
                <Typography variant='h2' fontWeight={'bold'} mt={2}>List of Professors</Typography>
                <Grid container spacing={2} mt={2}>
    <Grid item xs={6}>
        <TextField
            fullWidth
            label="Filter by name or subject"
            variant="filled"
            value={filter}
            onChange={handleFilterChange}
            sx={{
                input: { color: '#f0f0f0' },
                '& .MuiInputLabel-root': { color: '#f0f0f0' },
                '& .MuiFilledInput-underline:before': { borderBottomColor: '#f0f0f0' },
                '& .MuiFilledInput-underline:hover:before': { borderBottomColor: '#f0f0f0' },
                '& .MuiFilledInput-underline:after': { borderBottomColor: '#f0f0f0' },
            }}
        />
    </Grid>
    <Grid item xs={6}>
        <TextField
            fullWidth
            select
            label="Sort by"
            variant="filled"
            value={sort}
            onChange={handleSortChange}
            sx={{
                input: { color: '#f0f0f0' },
                '& .MuiInputLabel-root': { color: '#f0f0f0' },
                '& .MuiFilledInput-underline:before': { borderBottomColor: '#f0f0f0' },
                '& .MuiFilledInput-underline:hover:before': { borderBottomColor: '#f0f0f0' },
                '& .MuiFilledInput-underline:after': { borderBottomColor: '#f0f0f0' },
                '& .MuiSelect-icon': { color: '#f0f0f0' }  // Makes the dropdown arrow white
            }}
            MenuProps={{
                PaperProps: {
                    sx: {
                        backgroundColor: '#333333', // Dark background color for dropdown
                        color: '#f0f0f0', // White text color
                    },
                },
            }}
        >
            <MenuItem value="name">Name</MenuItem>
            <MenuItem value="rating">Rating</MenuItem>
        </TextField>
    </Grid>
</Grid>

                <Stack>
                    {filteredData.map(rev => (
                        <Box key={rev.id}>
                            <Card sx={{ mt: 3, backgroundColor: '#111111', color: '#f0f0f0' }}>
                                <CardContent>
                                    <Typography variant='h4' fontWeight={'bold'} sx={{ textDecoration: 'underline' }}>{rev.professor}</Typography>
                                    <Typography variant='h5' color='gold'>Rating: {rev.stars} out of 5</Typography>
                                    <Typography variant='h6' mb={3}>Subject: {rev.subject}</Typography>
                                    <Typography variant='h6'>{rev.review}</Typography>
                                </CardContent>
                            </Card>
                        </Box>
                    ))}
                </Stack>
            </Box>
        </Box>
    );
}
