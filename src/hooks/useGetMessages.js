"use client"

import { useQuery } from "@tanstack/react-query";
import { apiGet } from "@/services/apiService";
import moment from "moment";

const styles = {
  offCanvasContainer: {
    width: "450px",
  },
  item: {
    width: "clamp(250px, 75%, 300px)",
    fontSize: "12px"
  }
}

const getMessageStyles = (senderId, userId, appMessage) =>{
  if(appMessage){
    return "bg-success-subtle mx-auto rounded-2 w-100 text-dark px-3"
  }else if(senderId === userId){
    return "accent-bg ms-auto rounded-start rounded-top text-white"
  }else{
    return "secondary-bg me-auto rounded-end rounded-top text-white"
  }
}

const MessageItem = ({message, sender, date, userId, appMessage}) =>{
  return (
    <li style={styles.item} className={`${getMessageStyles(sender?.id, userId, appMessage)} p-2 my-2`}>
      <span className="d-flex align-items-center"> { appMessage && <i className="fa-solid fa-circle-check me-1 fs-6" style={{ color: "#136c25" }}></i>} {message}</span>
      <span className="d-flex">
        <span className='ms-auto' style={{fontSize: '9px'}}>{moment(date).format('lll')}</span>
      </span>
    </li>
  )
}


const useGetMessages = (id, userId) =>{
  
  const messageQuery = useQuery({
    queryKey: ["allMessages", id],
    queryFn: () => apiGet({ url: `/message?resourceId=${id}` })
      .then(res => {
        return res.data
      })
      .catch(error => {
        console.log(error)
        return []
      }),
      refetchInterval: 5000,
      refetchIntervalInBackground: true
  })

  const listMessages = ()=>{
    if(messageQuery?.data){
      return messageQuery.data.map( item =>{
        return (
          <MessageItem key={item.id} message={item.message} sender={item.sender} date={item.createdAt} userId={userId} appMessage={item?.appMessage} />
        )
      })
    }
  }

  return {comments: messageQuery.data, refetch: messageQuery.refetch, listMessages}
}

export default useGetMessages;