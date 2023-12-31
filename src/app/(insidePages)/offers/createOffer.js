"use client"
import { useEffect, useState } from "react";
import { CircularProgress } from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useDispatchMessage from '@/hooks/useDispatchMessage';
import { useSelector } from "react-redux";
import { apiPost } from "@/services/apiService";
import { useRouter } from "next/navigation";

const CreateOffer = ({userId}) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const dispatchMessage = useDispatchMessage();
  //const {userData} = useSelector((state) => state.userData);

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
      userId
    }))
  }, [userId])

  const handleChange = (prop) => (event) => {
    setFormData(prevState => ({
      ...prevState,
      [prop]: event.target.value
    }))
  }

  const createOfferMutation = useMutation({
    mutationFn: ()=> apiPost({ url: `/offers`, data: formData })
    .then(res => {
      dispatchMessage({ message: res.message })
      queryClient.invalidateQueries(["allOffers"]);
      router.refresh()
    }).catch(error =>{
      dispatchMessage({severity: "error", message: error.message })
    })
  })

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formData)
    createOfferMutation.mutate()
  }


  return (
    <>
      <div className="offcanvas-header py-5 px-4">
        <h4 className="mb-0">Create Offer</h4>
        <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close">
        </button>
      </div>

      <form className="d-flex flex-column gap-3 px-4">
        <div>
          <label htmlFor="giftCardAmount" className="form-label mb-1">You want to</label>
          <select className="form-select form-control form-control-sm primary-bg fs-6 py-3" value={formData.offerCategory} onChange={handleChange("offerCategory")}  aria-label="Default select example">
            <option value="">Select Option</option>
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
            <option value="amazon">Amazon Giftcard</option>
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
        <button className="btn app-primary-btn d-flex align-items-center justify-content-center" disabled={createOfferMutation.isLoading} type="button" onClick={handleSubmit}>
          {createOfferMutation.isLoading ? <CircularProgress size={20} color="inherit" /> : "Create Offer"}
        </button>
      </form></>
  )
}

export default CreateOffer;