"use client"

import { apiPost } from "@/services/apiService"
import { useState } from "react"
import useDispatchMessage from "@/hooks/useDispatchMessage";
import { CircularProgress } from "@mui/material";

const ActionButton = ({userId, offer}) =>{
  const dispatchMessage = useDispatchMessage();
  const [isLoading, setIsLoading] = useState(false);

  const initiateTrade = () =>{
    let data = {
      userId,
      cardName: offer?.cardName,
      valueInUSD: offer?.valueInUSD,
      price: offer?.price,
      offerId: offer?.id
    }
    if(offer.offerCategory === "merchant"){
      data.buyerId = offer.user.id
      data.sellerId = userId
    }else if(offer.offerCategory === "seller"){
      data.buyerId = userId;
      data.sellerId = offer.user.id
    }

    setIsLoading(true);
    apiPost({ url: `/trades/`, data })
      .then(res => {
        console.log(res.data)
        setIsLoading(false)
        dispatchMessage({message: `Trade Request Sent to ${offer?.offerCategory}`})
      })
      .catch(error => {
        setIsLoading(false)
        console.log(error)
        dispatchMessage({severity: "error", message: error.message})
      })
  }

  return (
    <button className={`btn ${offer.offerCategory.toLowerCase() === "merchant" ? "highlight-btn" : "app-primary-btn"} d-flex px-4 py-2 m-0 rounded-2`} onClick={initiateTrade} disabled={isLoading} type="button">
      {isLoading ? <CircularProgress size={20} /> :
      offer.offerCategory.toLowerCase() === "merchant" ? "Sell" : "Buy"
      }
      
    </button>
  )
}

export default ActionButton;