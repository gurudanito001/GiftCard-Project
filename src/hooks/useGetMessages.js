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

const MessageItem = ({message, sender, date, userId }) =>{
  return (
    <li style={styles.item} className={`${sender?.id === userId ? "accent-bg ms-auto rounded-start rounded-top" : "secondary-bg me-auto rounded-end rounded-top"} p-2 text-white my-2`}>
      {message}
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
          <MessageItem key={item.id} message={item.message} sender={item.sender} date={item.createdAt} userId={userId} />
        )
      })
    }
  }

  return {comments: messageQuery.data, refetch: messageQuery.refetch, listMessages}
}

export default useGetMessages;