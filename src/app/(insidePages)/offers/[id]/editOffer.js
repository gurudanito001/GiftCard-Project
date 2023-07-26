"use client"
import { useEffect, useState } from "react";
import { CircularProgress } from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useDispatchMessage from '@/hooks/useDispatchMessage';
import { useSelector } from "react-redux";
import { apiPatch } from '@/services/apiService';

const EditOffer = ({offerDetails}) => {
  console.log(offerDetails)
  const queryClient = useQueryClient();
  const dispatchMessage = useDispatchMessage();
  const {userData} = useSelector((state) => state.userData);

  const [formData, setFormData] = useState({
    userId: "",
    cardName: "",
    valueInUSD: "",
    price: "",
    offerCategory: ""
  })

  useEffect(() =>{
    setFormData( prevState => ({
      ...prevState,
      userId: userData.id,
      cardName: offerDetails?.cardName || "",
      valueInUSD: offerDetails?.valueInUSD || "",
      price: offerDetails?.price || "",
      offerCategory: offerDetails?.offerCategory || ""
    }))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [offerDetails])

  const handleChange = (prop) => (event) => {
    setFormData(prevState => ({
      ...prevState,
      [prop]: event.target.value
    }))
  }

  const editOfferMutation = useMutation({
    mutationFn: ()=> apiPatch({ url: `/offers/${offerDetails.id}`, data: formData })
    .then(res => {
      dispatchMessage({ message: res.message })
      queryClient.invalidateQueries(["allOffers", offerDetails.id])
    }).catch(error =>{
      dispatchMessage({severity: "error", message: error.message })
    })
  })

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formData)
    editOfferMutation.mutate()
  }


  return (
    <>
      <form className="d-flex flex-column gap-3 px-4">
        <div>
          <label htmlFor="giftCardAmount" className="form-label mb-1">You want to</label>
          <select className="form-select form-control form-control-sm primary-bg fs-6 py-3" value={formData.offerCategory} onChange={handleChange("offerCategory")}  aria-label="Default select example">
            <option value="merchant">Buy Giftcard</option>
            <option value="seller">Sell Giftcard</option>
          </select>
        </div>
        <div>
          <label htmlFor="cardName" className="form-label mb-1">Choose Giftcard Type</label>
          <select className="form-select form-control form-control-sm primary-bg fs-6 py-3" value={formData.cardName} onChange={handleChange("cardName")} aria-label="Default select example">
            <option value="">Select Giftcard</option>
            <option value="visa">Visa Giftcard</option>
            <option value="vanilla">Vanilla Giftcard</option>
            <option value="walmart">Walmart Giftcard</option>
            <option value="target">Target Giftcard</option>
            <option value="ebay">Ebay Giftcard</option>
            <option value="Amazon">Amazon Giftcard</option>
          </select>
        </div>
        <div>
          <label htmlFor="valueInUSD" className="form-label mb-1">Value in USD$</label>
          <input type="text" className="form-control form-control-sm primary-bg fs-6 py-3" value={formData.valueInUSD} onChange={handleChange("valueInUSD")} id="valueInUSD" />
        </div>
        <div>
          <label htmlFor="price" className="form-label mb-1">Offer Price in ₦</label>
          <input type="text" className="form-control form-control-sm primary-bg fs-6 py-3" value={formData.price} onChange={handleChange("price")} id="price" />
        </div>
        <button className="btn app-primary-btn d-flex align-items-center justify-content-center" disabled={editOfferMutation.isLoading} type="button" onClick={handleSubmit}>
          {editOfferMutation.isLoading ? <CircularProgress size={20} color="inherit" /> : "Save"}
        </button>
      </form></>
  )
}

export default EditOffer;