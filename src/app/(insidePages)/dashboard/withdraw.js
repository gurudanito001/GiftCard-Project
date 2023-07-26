import { CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import { apiPatch, apiGet } from '@/services/apiService';
import useDispatchMessage from '@/hooks/useDispatchMessage'


const Withdraw = ({userData, refreshUserData}) => {
  const dispatchMessage = useDispatchMessage();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    amount: ""
  })
  const [banksAccounts, setBankAccounts] = useState([])

  const fetchBankAccounts = () => {
    setIsLoading(true)
    apiGet({ url: `/bankAccounts` })
    .then(res => {
      console.log(res.data)
      setBankAccounts(res.data)
      dispatchMessage({ message: res.message })
      setIsLoading(false);
    })
    .catch(error => {
      console.log(error)
      setIsLoading(false);
      dispatchMessage({ severity: "error", message: "Could not fetch Bank Accounts" })
    })
  }

  useEffect(()=>{
    
    fetchBankAccounts()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  

  const handleChange = (prop) => (event) => {
    setFormData(prevState => ({
      ...prevState,
      [prop]: event.target.value
    }))
  }

  const handleSubmit = () =>{
    let prevCurrentBal = parseFloat(userData.wallet.currentBalance);
    let fundAmount = parseFloat(formData.amount);
    let newBalance = prevCurrentBal - fundAmount;
    //return console.log(newBalance)
    setIsLoading(true)
    apiPatch({ url: `/wallet/${userData.wallet.id}`, data: {currentBalance: newBalance.toString()} })
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

  const listBankOptions = () =>{
    return banksAccounts.map( item => {
      return <option className="small" key={item.accountNumber} value={`${item.accountNumber}`}>{`${item.accountNumber} - ${item.bankName} - ${item.accountName}`}</option>
    })
  }

  return (
    <>
      <div className="offcanvas-header py-5 px-4">
        <h4 className="mb-0">Withdraw</h4>
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
        <div>
          <label htmlFor="bankAccount" className="form-label mb-1">Bank Account</label>
          <select className="form-select form-select-sm primary-bg fs-6 py-3" aria-label="Default select example">
            <option className="small" value=""> Select Bank Account</option>
            {listBankOptions()}
          </select>
        </div>
        
        <div className="d-flex justify-content-center gap-2">
          <button className="btn app-primary-btn d-flex align-items-center" disabled={isLoading} type="button" onClick={handleSubmit}>
            {isLoading ? <CircularProgress size={20} color="inherit" /> : "Withdraw"}
          </button>
        </div>
      </div>
    </>
  )
}

export default Withdraw