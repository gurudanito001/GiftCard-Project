"use client"

import { apiPatch } from "@/services/apiService"
import useDispatchMessage from "@/hooks/useDispatchMessage";
import { CircularProgress } from "@mui/material";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ConfirmationModal from "@/components/confirmationModal";


export const CancelButton = ({id}) =>{
  const router = useRouter();
  const dispatchMessage = useDispatchMessage();
  const [isLoading, setIsLoading] = useState(false);

  const handleCancel = () =>{
    setIsLoading(true);
    apiPatch({ url: `/trades/${id}`, data: {status: "CANCELLED"} })
      .then(res => {
        console.log(res.data)
        setIsLoading(false)
        dispatchMessage({ message: `Trade request has been cancelled` })
        router.refresh()
      })
      .catch(error => {
        setIsLoading(false)
        console.log(error)
        dispatchMessage({ severity: "error", message: error.message })
      })
  }

  return (
    <div>
      <a className={`btn app-primary-btn bg-danger d-flex px-4 py-2 m-0 rounded-2`} data-bs-toggle="modal" data-bs-target="#cancelTrade">
        {isLoading ? <CircularProgress size={20} /> : "Cancel"}
      </a>
    </div>
  )
}

export const DeclineButton = ({id}) =>{
  const router = useRouter();
  const dispatchMessage = useDispatchMessage();
  const [isLoading, setIsLoading] = useState(false);

  const handleDecline = () =>{
    setIsLoading(true);
    apiPatch({ url: `/trades/${id}`, data: {status: "DECLINED"} })
      .then(res => {
        console.log(res.data)
        setIsLoading(false)
        dispatchMessage({ message: `Trade request has been declined` })
        router.refresh()
      })
      .catch(error => {
        setIsLoading(false)
        console.log(error)
        dispatchMessage({ severity: "error", message: error.message })
      })
  }

  return (
    <div>
    <button className={`btn app-primary-btn bg-danger d-flex px-4 py-2 m-0 rounded-2`} type="button" data-bs-toggle="modal" data-bs-target="#declineTrade">
      {isLoading ? <CircularProgress size={20} /> : "Decline"}
    </button>

    <ConfirmationModal title="Decline Trade" message="Are you sure your want to decline this trade?" isLoading={isLoading} onSubmit={handleDecline} id="declineTrade" />
    </div>
  )
}

export const AcceptButton = ({id}) =>{
  const router = useRouter();
  const dispatchMessage = useDispatchMessage();
  const [isLoading, setIsLoading] = useState(false);

  const handleAccept = () =>{
    setIsLoading(true);
    apiPatch({ url: `/trades/${id}`, data: {status: "ACCEPTED"} })
      .then(res => {
        console.log(res.data)
        setIsLoading(false)
        dispatchMessage({ message: `Trade request has been accepted` })
        router.refresh()
      })
      .catch(error => {
        setIsLoading(false)
        console.log(error)
        dispatchMessage({ severity: "error", message: error.message })
      })
  }

  return (
    <div>
      <a className={`btn app-primary-btn bg-success d-flex px-4 py-2 m-0 rounded-2`} data-bs-toggle="modal" data-bs-target="#acceptTrade">
        {isLoading ? <CircularProgress size={20} /> : "Accept"}
      </a>

      <ConfirmationModal title="Accept Trade" message="Are you sure your want to accept this trade?" isLoading={isLoading} onSubmit={handleAccept} id="acceptTrade" />
    </div>
  )
}