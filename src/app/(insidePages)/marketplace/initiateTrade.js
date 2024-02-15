"use client"

import { apiPost } from "@/services/apiService"
import { useEffect, useState } from "react"
import useDispatchMessage from "@/hooks/useDispatchMessage";
import { CircularProgress } from "@mui/material";
import AvatarClient from "@/components/avater";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import * as ListofGiftCardsJson from "@/lib/listOfGiftcardProviders.json";
import AppAutoComplete from "@/components/autocomplete";
import formatAsCurrency from "@/services/formatAsCurrency";


const InitiateTrade = ({userId, offer}) =>{
  const dispatchMessage = useDispatchMessage();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    userId: "",
    buyerId: "",
    sellerId: "",
    cardName: "",
    valueInUSD: "",
    rate: "",  
    cardType: "",
    offerId: ""
  })

  useEffect(()=>{
    setFormData(prevState => ({
      ...prevState,
      userId,
      cardName: offer?.cardName,
      valueInUSD: offer?.valueInUSD,
      rate: offer?.rate,
      cardType: offer?.cardType,
      offerId: offer?.id
    }))
    if(offer?.offerCategory === "merchant"){
      setFormData( prevState =>({
        ...prevState,
        buyerId: offer?.user?.id,
        sellerId: userId
      }))
    }else if(offer?.offerCategory === "seller"){
      setFormData( prevState =>({
        ...prevState,
        buyerId: userId,
        sellerId: offer?.user?.id
      }))
    }
  }, [])

  const handleChange = (prop) => (event) => {
    const onlyNumbersRegex = new RegExp("^[0-9]*$");
    const onlyNumberInputList = ["valueInUSD", "minRange", "maxRange", "rate"]
    if((onlyNumberInputList.includes(prop)) ){
      if(!onlyNumbersRegex.exec(event.target.value)){
        return;
      }else{
        if(event.target.value === ""){
          setFormData(prevState => ({
            ...prevState,
            [prop]: event.target.value
          }))
          return;
        }else{
          setFormData(prevState => ({
            ...prevState,
            [prop]: prop === "rate" ? parseFloat(event.target.value) : parseInt(event.target.value)
          }))
          return;
        }
      }
    }
    setFormData(prevState => ({
      ...prevState,
      [prop]: event.target.value
    }))
  }

  const createTradeMutation = useMutation({
    mutationFn: ()=> apiPost({ url: `/trades`, data: formData })
    .then(res => {
      console.log(res.data)
      dispatchMessage({message: `Trade Request Sent to ${offer?.offerCategory}`});
      router.push(`/trades/${res?.data?.id}?userId=${userId}`);
    }).catch(error =>{
      console.log(error)
      dispatchMessage({severity: "error", message: error.message })
    })
  })

  const handleSubmit = (e) =>{
    e.preventDefault();
    //return console.log(formData)
    createTradeMutation.mutate()
  }

  return (
    <>

      <div className="offcanvas-header py-4 px-3">
        <h4 className="mb-0">Initiate Trade</h4>
        <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close" >
        </button>
      </div>

      <section className="px-3 mb-3">

        <div className="d-flex align-items-center mb-3">
          <small className="w-25 small mb-0">Card</small>
          <strong> {offer?.cardName.toUpperCase()}</strong>
        </div>

        <div className="d-flex align-items-center mb-3">
          <small className="w-25 small mb-0">Buyer</small>
          {offer?.offerCategory === "merchant" &&
            <div className='d-flex m-0 p-0'>
              {/* <div className='me-2'><AvatarClient /></div> */}
              <article className='d-flex flex-column'>
                <span className='fw-bolder'>{offer?.user?.firstName} {offer?.user?.lastName} </span>
                <span className='small'>{offer?.user?.username || offer?.user?.email}</span>
              </article>
            </div>
          }

          {offer?.offerCategory === "seller" &&
            <h6 className="mb-0">You</h6>
          }
        </div>


        <div className="d-flex align-items-center mb-3">
          <small className="w-25 small mb-0">Seller:</small>
          {offer?.offerCategory === "seller" &&
            <div className='d-flex m-0 p-0'>
              {/* <div className='me-2'><AvatarClient /></div> */}
              <article className='d-flex flex-column'>
                <span className='fw-bolder'>{offer?.user?.firstName} {offer?.user?.lastName} </span>
                <span className='small'>{offer?.user?.username || offer?.user?.email}</span>
              </article>
            </div>
          }

          {offer?.offerCategory === "merchant" &&
            <h6 className="mb-0">You</h6>
          }
        </div>

        {offer?.valueInUSD && 
        <div className="d-flex align-items-center mb-3">
          <small className="w-25 small mb-0">Card Value</small>
          <strong> ${offer?.valueInUSD}</strong>
        </div>}

        {offer?.cardType &&
        <div className="d-flex align-items-center mb-3">
          <small className="w-25 small mb-0 ">Card Type</small>
          <strong> {offer?.cardType}</strong>
        </div>}

        <hr />
      </section>

      <form className="d-flex flex-column gap-3 px-3">
        
        {!offer?.cardType &&
          <div>
            <label htmlFor="cardType" className="form-label mb-1" >Card Type</label>
            <select className="form-select form-control form-control-sm primary-bg fs-6" value={formData.cardType} onChange={handleChange("cardType")} aria-label="Default select example">
              <option value="">Select Giftcard Type</option>
              <option value="physical">Physical</option>
              <option value="code">Code</option>
            </select>
          </div>}

        {!offer?.valueInUSD &&
          <div>
            <label htmlFor="valueInUSD" className="form-label mb-1">Giftcard Value in $USD</label>
            <input type="text" className="form-control form-control-sm primary-bg fs-6" value={formData?.valueInUSD || ""} onChange={handleChange("valueInUSD")} id="valueInUSD" />
          </div>}

          <div className="d-flex">
            <small className="w-50">Rate</small>
            <span className="fw-bold"> ₦{formatAsCurrency(offer?.rate)}</span>
          </div>

          <div className="d-flex">
            <small className="w-50">You will {offer?.offerCategory === "seller" ? "pay": "get"} </small>
            <span className="fw-bold">{formData?.valueInUSD && `₦${formatAsCurrency(formData?.rate * formData?.valueInUSD)}`}</span>
          </div>

          <button className="btn app-primary-btn d-flex align-items-center justify-content-center py-2" disabled={createTradeMutation.isLoading} type="button" onClick={handleSubmit}>
            {createTradeMutation.isLoading ? <CircularProgress size={20} color="inherit" /> : "Initiate Trade"}
          </button>

      </form>
    </>
  )
}

export default InitiateTrade;