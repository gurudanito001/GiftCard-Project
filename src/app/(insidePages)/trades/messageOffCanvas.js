"use client"
import AvatarClient from '@/components/avater';
import useGetMessages from "@/hooks/useGetMessages";
import { apiPost, apiPatch } from '@/services/apiService';
import { useMutation } from '@tanstack/react-query';
import { useState, useEffect } from 'react';
import useDispatchMessage from '@/hooks/useDispatchMessage';
import { usePathname } from 'next/navigation';
import { IconButton } from '@mui/material';
import {CircularProgress} from '@mui/material';
import ConfirmCardTimer from "./confirmCardTimer";



const styles = {
  offCanvasContainer: {
    width: "450px",
  },
  item: {
    width: "clamp(250px, 75%, 300px)",
    fontSize: "12px"
  }
}

/* const CommentItem = ({message, sender, date, userId }) =>{
  return (
    <li style={styles.item} className={`${sender?.id === userId ? "accent-bg ms-auto rounded-start rounded-top" : "secondary-bg me-auto rounded-end rounded-top"} p-2 text-white my-2`}>
      {message}
      <span className="d-flex">
        <span className='ms-auto' style={{fontSize: '9px'}}>{moment(date).format('lll')}</span>
      </span>
    </li>
  )
} */


const MessageOffCanvas = ({trade, resourceId, userId, receiverId, receiverName}) => {

  const {listMessages, refetch} = useGetMessages(resourceId, userId);
  const dispatchMessage = useDispatchMessage();
  const pathName = usePathname();
  const [isLoading, setIsLoading] = useState(false);
  
  const [commentData, setCommentData] = useState({
    senderId: "",
    receiverId: "",
    resourceId: "",
    resourceUrl: "",
    message: ""
  });

  const clearComment = () => {
    setCommentData( prevState => ({
      ...prevState, 
      message: ""
    }))
  }
  
  const commentMutation = useMutation({
    mutationFn: () => apiPost({ url: "/message", data: commentData })
      .then(res => {
        clearComment();
        console.log(res.data)
        refetch()
      })
      .catch(error => {
        console.log(error)
        dispatchMessage({ severity: "error", message: error.message })
      }),
  })


  const handleChangeComment =  (event) => {
    setCommentData(prevState => ({
      ...prevState,
      message: event.target.value
    }))
  }

  const handleSubmit = () =>{
    if(commentData?.message.trim()){
      commentMutation.mutate()
    }
  }

  const handleSentCode = () =>{
    setIsLoading(true);
    apiPatch({ url: `/trades/haveSentGiftcard/${trade?.id}` })
      .then(res => {
        setIsLoading(false)
        refetch()
      })
      .catch(error => {
        setIsLoading(false)
        console.log(error)
        dispatchMessage({ severity: "error", message: error.message })
      })
  }

  useEffect(()=>{
    setCommentData( prevState =>({
      ...prevState,
      senderId: userId,
      receiverId: receiverId,
      resourceId: resourceId,
      resourceUrl: pathName
    }))
  },[pathName, receiverId, resourceId, userId])


  return (
    <div className="offcanvas offcanvas-end messageOffCanvas" tabIndex="-1" id="messaging" data-bs-backdrop="static" aria-labelledby="offcanvasRightLabel" >
      <div className="offcanvas-header px-3 py-3 border-bottom d-flex justify-content-between align-items-center">
        <div className="d-flex align-items-center gap-2">
          <AvatarClient />
          <div className="d-flex flex-column primary-text">
            <p className="fw-bold mb-0 text-capitalize">{receiverName}</p>
            {/* <p className="mb-0 small">Last seen at 12:02am</p> */}
          </div>
        </div>
        <div className="d-flex align-items-center ms-auto gap-3">
          {/* <i className="fa fa-ellipsis-vertical me-2"></i> */}
          {trade?.timeSent && <ConfirmCardTimer timeCodeSent={trade?.timeSent} />}
          <div className="btn-group">
            <button type="button" className="btn btn-outline-secondary rounded" data-bs-toggle="dropdown" aria-expanded="false">
              {isLoading ? <CircularProgress size={15} /> : <i className="fa fa-ellipsis-vertical"></i>}
            </button>
            <ul className="dropdown-menu py-0">
              {trade?.sellerId === userId &&
                <li className='bg-success-subtle text-dark'>
                  <a className="dropdown-item p-3" onClick={handleSentCode}>
                    I have sent GiftCard
                    <i className="fa-solid fa-circle-check ms-3" style={{ color: "#136c25" }}></i>
                  </a>
                </li>
              }
            </ul>
          </div>
          <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
      </div>
      <div className="offcanvas-body px-0 d-flex flex-column">
        <ul className='list-unstyled h-100 d-flex flex-column px-2' style={{overflowY: "scroll"}}>
          {listMessages()}
        </ul>

        <div className="d-flex align-items-center gap-2 mt-auto pt-3 px-2 border-top">
          <textarea rows={3} value={commentData.message} onChange={handleChangeComment} className='form-control w-100 small' placeholder='Write message.......'></textarea>
          <div className="d-flex align-items-center">
            <IconButton disabled={commentMutation.isLoading} onClick={handleSubmit}>
              <img className="img img-fluid" width={35} src="/images/send_message.svg" alt="" />
            </IconButton>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MessageOffCanvas;