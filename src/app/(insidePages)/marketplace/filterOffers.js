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


const FilterOffers = ({ userId, offerCategory }) => {
  const dispatchMessage = useDispatchMessage();
  const router = useRouter();

  const [formData, setFormData] = useState({
    cardName: "",
    valueInUSD: null,
    rate: null,
    cardType: "",
    minRange: null,
    maxRange: null,
  })

  const listOfGiftCards = () =>{
    return ListofGiftCardsJson.data.map( (item, index) =>{
      return {
        id: item?.website + index,
        label: item?.name,
      }
    })
  }

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

  const generateParams = () =>{
    let keys = Object.keys(formData);
    let paramString = "";

    keys.forEach( item =>{
      if(formData[item]){
        paramString += `&${item}=${formData[item]}`
      }
    })
    return paramString;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    let paramString = generateParams();
    console.log(paramString)
    router.push(`/marketplace/${offerCategory}?userId=e2a4d343-fe14-4cf6-b4c6-e744c18a0ade${paramString}`)
    router.refresh();
  }

  return (
    <>

      <div className="offcanvas-header py-5 px-4">
        <h4 className="mb-0">Filter Offers</h4>
        <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close" >
        </button>
      </div>

      <form className="d-flex flex-column gap-3 px-4">

        <div>
          <label htmlFor="customerSearch" className="form-label">Select Giftcard (<span className='fst-italic text-warning'>required</span>)</label>
          <AppAutoComplete options={listOfGiftCards()} handleClickOption={(cardName) => {
            setFormData(prevState => ({
              ...prevState,
              cardName
            }))
          }} placeholder="Select Giftcard" />
        </div>

        {offerCategory === "seller" &&
          <>
            <div>
              <label htmlFor="cardType" className="form-label mb-1">Giftcard Type (your preference)</label>
              <select className="form-select form-control form-control-sm primary-bg fs-6" value={formData.cardType} onChange={handleChange("cardType")} aria-label="Default select example">
                <option value="">Select Giftcard Type</option>
                <option value="physical">Physical</option>
                <option value="code">Code</option>
              </select>
            </div>
          </>
        }

        {offerCategory === "merchant" &&
        <div>
          <label htmlFor="valueInUSD" className="form-label mb-1">Your Giftcard Value in $</label>
          <input type="text" className="form-control form-control-sm primary-bg fs-6" value={formData.valueInUSD || ""} onChange={handleChange("valueInUSD")} id="valueInUSD" />
        </div>}

        <div>
          <label htmlFor="rate" className="form-label mb-1">Rate in ₦</label>
          <input type="text" className="form-control form-control-sm primary-bg fs-6" value={formData.rate || ""} onChange={handleChange("rate")} id="rate" />
        </div>

        {offerCategory === "seller" &&
          <div>
            <label htmlFor="price" className="form-label mb-1">Giftcard Amount Range</label>
            <div className="d-flex">
              <input type="text" className="form-control form-control-sm primary-bg fs-6" placeholder="min range in $" value={formData.minRange || ""} onChange={handleChange("minRange")} id="minRange" />
              <input type="text" className="form-control form-control-sm primary-bg fs-6 ms-2" placeholder="max range in $" value={formData.maxRange || ""} onChange={handleChange("maxRange")} id="maxRange" />
            </div>
          </div>
        }

        <button className="btn app-primary-btn d-flex align-items-center justify-content-center py-2" /* disabled={createTradeMutation.isLoading} */ type="button" onClick={handleSubmit}>
          {/* createTradeMutation.isLoading ? <CircularProgress size={20} color="inherit" /> : */ "Filter Offers"}
        </button>

      </form>
    </>
  )
}

export default FilterOffers;