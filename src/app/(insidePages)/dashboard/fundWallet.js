import { CircularProgress } from "@mui/material";
import { useState } from "react";
import { apiPatch } from '@/services/apiService';
import useDispatchMessage from '@/hooks/useDispatchMessage'


const FundWalletForm = ({userData, refreshUserData}) => {
  const dispatchMessage = useDispatchMessage();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    amount: ""
  })

  const handleChange = (prop) => (event) => {
    setFormData(prevState => ({
      ...prevState,
      [prop]: event.target.value
    }))
  }

  const handleSubmit = () =>{
    let prevCurrentBal = parseFloat(userData.wallet.currentBalance);
    let fundAmount = parseFloat(formData.amount);
    let newBalance = prevCurrentBal + fundAmount;
    //return console.log(prevCurrentBal, newBalance)
    let data = {
      userId: userData.id,
      currentBalance: newBalance.toString(),
      amount: formData.amount,
      type: "CREDIT",
      category: "fund wallet"
    }
    setIsLoading(true)
    apiPatch({ url: `/wallet/${userData.wallet.id}`, data })
      .then(res => {
        console.log(res.data)
        refreshUserData()
        setIsLoading(false)
        dispatchMessage({message: res.message})
      })
      .catch(error => {
        setIsLoading(false)
        console.log(error)
        dispatchMessage({severity: "error", message: res.message})
      })
  }

  return (
    <>
      <div className="offcanvas-header py-5 px-4">
        <h4 className="mb-0">Fund Wallet</h4>
        <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close">
        </button>
      </div>
      <div className="px-4 d-flex flex-column gap-2">
        <div>
          <label htmlFor="cardholder" className="form-label mb-1">Wallet Username</label>
          <input type="text" className="form-control form-control-sm primary-bg fs-6 py-3" id="cardholder" readOnly defaultValue={`${userData.firstName} ${userData.lastName}`} />
        </div>
        <div>
          <label htmlFor="amount" className="form-label mb-1">Amount</label>
          <input type="text" className="form-control form-control-sm primary-bg fs-6 py-3" id="amount" value={formData.amount} onChange={handleChange("amount")} />
        </div>
        <div className="d-flex justify-content-center gap-2">
          <button className="btn app-primary-btn d-flex align-items-center" disabled={isLoading} type="button" onClick={handleSubmit}>
            {isLoading ? <CircularProgress size={20} color="inherit" /> : "Fund Wallet"}
          </button>
        </div>
      </div>
    </>
  )
}

export default FundWalletForm