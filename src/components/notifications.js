import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { clearMessage, setMessage } from '../store/slices/notificationSlice';
import { millisToMinutesAndSeconds } from '../services/formatTime';
import { Alert, AlertTitle, Stack } from '@mui/material';


const styles = {
  root: {
    width: '400px',
    position: 'fixed',
    top: "50px",
    right: "10px",
    zIndex: 3000,
  }
}

const Toast = ({id, message, severity }) => {
  const dispatch = useDispatch();
  return(
<>
    <Alert className='w-100' severity={severity} onClose={()=>dispatch(clearMessage({ severity: severity, key: id }))}>
      <AlertTitle><span className='text-capitalize'>{severity}</span></AlertTitle>
      {message}
    </Alert>



    {/* <div className={`toast-container3 p-3`}>
      <div id="liveToast" className={`toast d-inline-block border ${severity === "success" ? "border-success" : "border-danger"} `} role="alert" aria-live="assertive" aria-atomic="true">
        <div className="toast-header">
          <strong className={`me-auto ${severity === "success" ? "text-success" : "text-danger"} text-capitalize`}>{severity}</strong>
          <small>{millisToMinutesAndSeconds( Date.now() - id )} ago</small>
          <button type="button" className="btn-close" data-bs-dismiss="toast" aria-label="Close" onClick={() => {
            dispatch(clearMessage({ severity: severity, key: id }))
          }}></button>
        </div>
        <div className="toast-body">
          {message}
        </div>
      </div>
    </div> */}
    </>
  )
}

export default function AlertNotification() {
  const messages = useSelector((state) => state.notificationMessages.messages)
  const { success, error } = messages

  useEffect(() => {
  }, [])

  const dispatch = useDispatch();

  const successMessages = () => {
    return success.map((message, index) => {
      setTimeout(() => {
        dispatch(clearMessage({severity: "success", key: message.key}))
      }, 5000);
      return (
        <Toast key={message.key} id={message.key} message={message.message} severity="success" />
      )
    })
  }

  const errorMessages = () => {
    return error.map((message, index) => {
      setTimeout(() => {
        dispatch(clearMessage({ severity: "error", key: message.key }))
      }, 5000);
      return (
        <Toast key={message.key} id={message.key} message={message.message} severity="error" />
      )
    })
  }

  return (
    <Stack  sx={styles.root} spacing={2}>
      {successMessages()}
      {errorMessages()}
    </Stack>
  );
}