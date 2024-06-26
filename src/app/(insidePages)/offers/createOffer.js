"use client"
import { useEffect, useState } from "react";
import { CircularProgress } from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useDispatchMessage from '@/hooks/useDispatchMessage';
import { useSelector } from "react-redux";
import { apiPost } from "@/services/apiService";
import { useRouter } from "next/navigation";
import * as ListofGiftCardsJson from "@/lib/listOfGiftcardProviders.json";
import AppAutoComplete from "@/components/autocomplete";

const CreateOffer = ({userId}) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const dispatchMessage = useDispatchMessage();
  //const {userData} = useSelector((state) => state.userData);

  const listOfGiftCards = () =>{
    return ListofGiftCardsJson.data.map( (item, index) =>{
      return {
        id: item?.website + index,
        label: item?.name,
      }
    })
  }

  const [formData, setFormData] = useState({
    userId: "",
    cardName: "",
    valueInUSD: "",
    rate: "",
    minRange: "",
    maxRange: "",
    cardType: "",
    offerCategory: ""
  })

  useEffect(() =>{
    setFormData( prevState => ({
      ...prevState,
      userId
    }))
  }, [userId])

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
    if(prop === "offerCategory"){
      setFormData(prevState => ({
        ...prevState,
        cardName: "",
        valueInUSD: null,
        rate: null,
        minRange: null,
        maxRange: null,
        cardType: "",
      }))
    }
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
      console.log(error)
      dispatchMessage({severity: "error", message: error.message })
    })
  })

  const handleSubmit = (event) => {
    event.preventDefault();
    // return console.log(formData)
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
          <select className="form-select form-control form-control-sm primary-bg fs-6" value={formData.offerCategory} onChange={handleChange("offerCategory")}  aria-label="Default select example">
            <option value="">Select Option</option>
            <option value="merchant">Buy Giftcard</option>
            <option value="seller">Sell Giftcard</option>
          </select>
        </div>

        <div>
          <label htmlFor="customerSearch" className="form-label">Select Giftcard (<span className='fst-italic text-warning'>required</span>)</label>
          <AppAutoComplete options={listOfGiftCards()} handleClickOption={(cardName) => {setFormData( prevState =>({
            ...prevState,
            cardName
          }))}} placeholder="Giftcard Type" />
        </div>
        {formData.offerCategory === "seller" &&
          <>
            <div>
              <label htmlFor="cardType" className="form-label mb-1">Card Type</label>
              <select className="form-select form-control form-control-sm primary-bg fs-6" value={formData.cardType} onChange={handleChange("cardType")} aria-label="Default select example">
                <option value="">Select Giftcard</option>
                <option value="physical">Physical</option>
                <option value="code">Code</option>
              </select>
            </div>

            <div>
              <label htmlFor="valueInUSD" className="form-label mb-1">Value in $USD</label>
              <input type="text" className="form-control form-control-sm primary-bg fs-6" value={formData.valueInUSD} onChange={handleChange("valueInUSD")} id="valueInUSD" />
            </div>
          </>
        }

        <div>
          <label htmlFor="rate" className="form-label mb-1">Rate in ₦</label>
          <input type="text" className="form-control form-control-sm primary-bg fs-6" value={formData.rate} onChange={handleChange("rate")} id="rate" />
        </div>

        {formData.offerCategory === "merchant" &&
          <div>
            <label htmlFor="price" className="form-label mb-1">Giftcard Amount Range</label>
            <div className="d-flex">
              <input type="text" className="form-control form-control-sm primary-bg fs-6" placeholder="min range in $" value={formData.minRange} onChange={handleChange("minRange")} id="minRange" />
              <input type="text" className="form-control form-control-sm primary-bg fs-6 ms-2"  placeholder="max range in $" value={formData.maxRange} onChange={handleChange("maxRange")} id="maxRange" />
            </div>
        </div>
        }
        
        <button className="btn app-primary-btn d-flex align-items-center justify-content-center py-2" disabled={createOfferMutation.isLoading} type="button" onClick={handleSubmit}>
          {createOfferMutation.isLoading ? <CircularProgress size={20} color="inherit" /> : "Create Offer"}
        </button>
      </form>
      
    </>
  )
}

export default CreateOffer;