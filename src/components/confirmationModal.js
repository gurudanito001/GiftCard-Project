"use client"


import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { CircularProgress } from '@mui/material';
import { apiPatch } from "@/services/apiService"
import useDispatchMessage from "@/hooks/useDispatchMessage";
import { useRouter } from "next/navigation";
import { useState } from "react";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function ConfirmationModal({tradeId, btnName, btnStyles, title, message, action, btnColor="secondary"}) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const router = useRouter();
  const dispatchMessage = useDispatchMessage();
  const [isLoadingCancel, setIsLoadingCancel] = useState(false);
  const [isLoadingDecline, setIsLoadingDecline] = useState(false);
  const [isLoadingAccept, setIsLoadingAccept] = useState(false);
  const [isLoadingComplete, setIsLoadingComplete] = useState(false);

  const cancelTrade = () =>{
    setIsLoadingCancel(true);
    apiPatch({ url: `/trades/cancelTrade/${tradeId}`})
      .then(res => {
        console.log(res.data)
        setIsLoadingCancel(false)
        dispatchMessage({ message: `Trade request has been cancelled` })
        router.refresh()
      })
      .catch(error => {
        setIsLoadingCancel(false)
        console.log(error)
        dispatchMessage({ severity: "error", message: error.message })
      })
  }

  const declineTrade = () =>{
    setIsLoadingDecline(true);
    apiPatch({ url: `/trades/declineTrade/${tradeId}`})
      .then(res => {
        console.log(res.data)
        setIsLoadingDecline(false)
        dispatchMessage({ message: `Trade request has been declined` })
        router.refresh()
      })
      .catch(error => {
        setIsLoadingDecline(false)
        console.log(error)
        dispatchMessage({ severity: "error", message: error.message })
      })
  }

  const acceptTrade = () =>{
    setIsLoadingAccept(true);
    apiPatch({ url: `/trades/acceptTrade/${tradeId}`})
      .then(res => {
        console.log(res.data)
        setIsLoadingAccept(false)
        dispatchMessage({ message: `Trade request has been accepted` })
        router.refresh()
      })
      .catch(error => {
        setIsLoadingAccept(false)
        console.log(error)
        dispatchMessage({ severity: "error", message: error.message })
      })
  }

  const completeTrade = () =>{
    setIsLoadingComplete(true);
    apiPatch({ url: `/trades/completeTrade/${tradeId}`})
      .then(res => {
        console.log(res.data)
        setIsLoadingComplete(false)
        dispatchMessage({ message: `Trade has been completed. Seller will now receive payment` })
        router.refresh()
      })
      .catch(error => {
        setIsLoadingComplete(false)
        console.log(error)
        dispatchMessage({ severity: "error", message: error.message })
      })
  }

  const handleSubmit = () =>{
    if(action === "cancel"){
      return cancelTrade();
    }else if( action === "decline"){
      return declineTrade();
    }else if( action === "accept"){
      return acceptTrade();
    }else if( action === "complete"){
      return completeTrade();
    }else{
      return
    }
  }
  const handleisLoading = () =>{
    if(action === "cancel"){
      return isLoadingCancel;
    }else if( action === "decline"){
      return isLoadingDecline;
    }else if( action === "accept"){
      return isLoadingAccept;
    }else if( action === "complete"){
      return isLoadingComplete;
    }else{
      return false
    }
  }

  return (
    <div>
      <Button variant="contained" sx={btnStyles} color={btnColor} onClick={handleOpen}><small>{btnName}</small></Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            <span className='fw-bold h4'>{title}</span>
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 5 }}>
            <span className='h6'>{message}</span>
          </Typography>

          <div className='d-flex mt-4'>
            <Button variant="outlined"  color="primary" onClick={handleClose}>Close</Button>
            <Button variant="contained" sx={{ml: 3}} disabled={handleisLoading()} color="primary" onClick={handleSubmit}>{handleisLoading() ? <CircularProgress size={15} /> : "Proceed"}</Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
