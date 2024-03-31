"use client"
import AvatarClient from '@/components/avater';
import useGetMessages from "@/hooks/useGetMessages";
import { apiPost, apiPatch } from '@/services/apiService';
import { useMutation } from '@tanstack/react-query';
import { useState, useEffect, useRef } from 'react';
import useDispatchMessage from '@/hooks/useDispatchMessage';
import { usePathname } from 'next/navigation';
import { Icon, IconButton } from '@mui/material';
import {CircularProgress} from '@mui/material';
import ConfirmCardTimer from "./confirmCardTimer";
import { Modal, ClickAwayListener } from "@mui/material";



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

  const [fileUrl, setFileUrl] = useState("");
  const [isSendingFile, setIsSendingFile] = useState(false);
  const inputFileRef = useRef(null);

  const [open, setOpen] = useState(false);
  const handleOpen = (imageUrl) => {
    setModalImage(imageUrl)
    setOpen(true);
  }
  const handleClose = () => {
    setModalImage("")
    setOpen(false);
  }
  const [modalImage, setModalImage] = useState("")

  const createFileUrl = () => {
    const file = inputFileRef.current.files[0];
    console.log(file)
    if (file) {
      setFileUrl(URL.createObjectURL(file));
      console.log(URL.createObjectURL(file))
    } else {
      setFileUrl("")
    }
  }
  
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
    mutationFn: (data) => apiPost({ url: "/message", data })
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

  const handleClickUploadImageIcon = () =>{
    inputFileRef.current.click();
  }

  const cancelImage = () =>{
    setFileUrl("");
    inputFileRef.current.value = ""
  }

  const handleSubmit = async () =>{
    let data = {...commentData};

    if(inputFileRef.current.files.length){
      console.log(inputFileRef.current?.files)
      const file = inputFileRef.current.files[0];
      setIsSendingFile(true)
      const fileUrl = await postFile(file.name, file)
      data.message = fileUrl;
      setIsSendingFile(false);
      cancelImage()
    }

    if(data?.message.trim()){
      commentMutation.mutate(data)
    }else{
      dispatchMessage({ severity: "error", message: "Message content is empty" })
    }
  }

  const postFile = async (filename, file) =>{
    const response = await fetch(
      `/api/v1/uploadFiles?filename=${filename}`,
      {
        method: 'POST',
        body: file,
      },
    );
    const newBlob = await response.json();
    console.log(newBlob.url);
    return newBlob.url
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

  const listCarouselImages = () =>{
    if(data?.images){
      return data?.images.map ((image, index) =>{
        return (
          <div key={image} className={`carousel-item ${index === 0 && "active"}`}>
            <img src={image} className="d-block w-100" alt="carousel image" />
          </div>
        )
      })
    }
  }

  const listCarouselButtons = () =>{
    if(data?.images){
      return data?.images.map ((image, index) =>{
        return(
          <button
            key={image}
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to={index}
            className={`${index === 0 && "active"}`}
            aria-current={`${index === 0 && "true"}`}
            aria-label={`Slide ${index}`}
          />
        )
      })
    }
  }


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
                  <a className="dropdown-item p-3 d-flex align-items-center" onClick={handleSentCode}>
                    I have sent GiftCard
                    <i className="fa-solid fa-circle-check ms-3" style={{ color: "#136c25" }}></i>
                  </a>
                </li>
              }
              <li className='bg-danger-subtle text-dark'>
                <a className="dropdown-item p-3 d-flex align-items-center" data-bs-toggle="offcanvas" data-bs-target={`#dispute-${trade?.id}`}>
                  Raise Dispute
                  <i className="fa-solid fa-circle-check ms-auto" style={{ color: "red" }}></i>
                </a>
                {/* <button type="button" className="btn btn-link px-0 secondary-text fw-bold text-decoration-none d-flex align-items-center gap-1 ms-auto" data-bs-toggle="offcanvas" data-bs-target={`#dispute-${trade?.id}`}>
                  Open Dispute
                </button> */}
              </li>
            </ul>
          </div>
          <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
      </div>
      <div className="offcanvas-body px-0 d-flex flex-column">
        <ul className='list-unstyled h-100 d-flex flex-column px-2' style={{overflowY: "scroll"}}>
          {listMessages(handleOpen)}
        </ul>

        <div className="d-flex align-items-center gap-2 mt-auto pt-3 px-2 border-top">
          {fileUrl ?
            <div className='w-100 d-flex flex-column'>
              <h6 className='small fw-bold mt-3'>File Preview</h6>
              <IconButton className='ms-auto' style={{background: "rgb(0, 0, 0, .7)"}} onClick={cancelImage}>
                <i className="fa-solid fa-xmark" style={{fontSize: "12px", color: "white"}}></i>
              </IconButton>
              <img src={fileUrl} alt="File Preview"  className='border rounded img img-fluid' />
            </div> :
            <div className='w-100'> 
              <textarea rows={5} value={commentData.message} onChange={handleChangeComment} className='form-control w-100 small' placeholder='Write message.......'></textarea>
            </div>
          }

          <div className="d-flex flex-column align-items-center">
            <IconButton onClick={handleClickUploadImageIcon}>
              <i className="fa-regular fa-image"></i>
            </IconButton>
            <input accept="image/*" className='d-none' onChange={createFileUrl} ref={inputFileRef} type="file" id="imageUpload" name="imageUpload"></input>
            <IconButton disabled={commentMutation.isLoading || isSendingFile} onClick={handleSubmit}>
              <img className="img img-fluid" width={35} src="/images/send_message.svg" alt="" />
            </IconButton>
          </div>
        </div>
      </div>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="row d-flex h-100">
          <ClickAwayListener onClickAway={handleClose}>
            <div className="col-12 col-md-8 col-lg-6 m-auto">
              <div id="carouselExampleIndicators" className="carousel slide">
                <div className="carousel-indicators">
                  {/* {listCarouselButtons()} */}
                </div>
                <div className="carousel-inner">
                  <div key={modalImage} className="carousel-item active">
                    <img src={modalImage} className="d-block w-100" alt="carousel image" />
                  </div>
                </div>
                {/* <button
                  className="carousel-control-prev"
                  type="button"
                  data-bs-target="#carouselExampleIndicators"
                  data-bs-slide="prev"
                >
                  <span className="carousel-control-prev-icon" aria-hidden="true" />
                  <span className="visually-hidden">Previous</span>
                </button>
                <button
                  className="carousel-control-next"
                  type="button"
                  data-bs-target="#carouselExampleIndicators"
                  data-bs-slide="next"
                >
                  <span className="carousel-control-next-icon" aria-hidden="true" />
                  <span className="visually-hidden">Next</span>
                </button> */}
              </div>

            </div>
          </ClickAwayListener>
          
        </div>
      </Modal>
    </div>
  )
}

export default MessageOffCanvas;