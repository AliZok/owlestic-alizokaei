'use client';
import React from 'react';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';

export default function myTest() {
    return (
        <Container>
            <h1>Welcome to Next.js with Material-UI!</h1>
            <Button variant="contained" color="primary">
                Click Me
            </Button>
            <Button variant="text">Text</Button>
            <Button variant="contained">Contained</Button>
            <Button variant="outlined">Outlined</Button>
        </Container>
    )
}