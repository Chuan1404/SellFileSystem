import { Close } from '@mui/icons-material';
import { Alert, Stack } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { closeAlert } from '../store/slices/pageSlice';

const MyAlert = () => {
    const {isOpen, message, type} = useSelector(store => store.page.alert)
    const dispatch = useDispatch()
    let ref = useRef(null)

    const handleClose = () => {
        dispatch(closeAlert())
    }
    useEffect(() => {
        if(isOpen) {
            ref.current.style.transform = "translateY(0px)"
            setTimeout(() => handleClose(), 4000)
        }
        else {
            ref.current.style.transform = "translateY(-70px)"
        }
    }, [isOpen])

    return (
        <Alert
          sx={{ position: "fixed", top: 0, right: 0, zIndex: 1000, height: 70, alignItems: "center", transition: "0.4s" }}
          security={type}
          ref={ref}
        >
          <Stack direction={"row"} spacing={1} height={"100%"} alignItems={"center"}>
            {message}
            <Close sx={{cursor: "pointer"}} onClick={handleClose}/>
          </Stack>
        </Alert>
    );
}

export default MyAlert;
