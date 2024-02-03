"use client"

import { apiPost } from "@/services/apiService"
import { useState } from "react"
import useDispatchMessage from "@/hooks/useDispatchMessage";
import InitiateTrade from "./initiateTrade";


const ActionButton = ({userId, offer}) =>{


  /* const initiateTrade = () =>{
    let data = {
      userId,
      //cardName: offer?.cardName,
      //valueInUSD: offer?.valueInUSD,
      //price: offer?.price,
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
    apiPost({ url: `/trades`, data })
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
  } */

  return (
    <>
      <button type="button" className={`btn ${offer?.offerCategory.toLowerCase() === "merchant" ? "highlight-btn" : "app-primary-btn"} d-flex px-4 py-2 m-0 rounded-2`} data-bs-toggle="offcanvas" data-bs-target={`#${offer?.id}`}>
        {offer?.offerCategory.toLowerCase() === "merchant" ? "Sell" : "Buy"}
      </button>

      <div className="offcanvas primary-bg offcanvas-end gap-1" data-bs-scroll="true" data-bs-backdrop="static" id={offer?.id}>
        <InitiateTrade userId={userId} offer={offer} />
      </div>
    </>
    
  )
}

export default ActionButton;