import { Box } from '@mui/material';
import React from 'react';
import loading from '../assets/images/loading.svg'


const Loading = () => {
    return (
       <Box className="loading">
        <img src={loading} />
       </Box>
    );
};


export default Loading;
