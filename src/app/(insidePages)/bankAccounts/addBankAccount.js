import { CircularProgress } from "@mui/material";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { apiPost } from "@/services/apiService";
import useDispatchMessage from "@/hooks/useDispatchMessage";

const AddBankAccount = ({refreshBankAccountList}) => {
  const dispatchMessage = useDispatchMessage();
  const {userData} = useSelector( state => state.userData )
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    userId: "",
    bankName: "",
    accountName: "",
    accountNumber: ""
  })
  useEffect(()=>{
    setFormData( prevState => ({
      ...prevState, 
      userId: userData.id
    }))
  }, [userData.id])


  const handleChange = (prop) => (event) =>{
    setFormData( prevState => ({
      ...prevState, 
      [prop]: event.target.value
    }))
  }

  const handleSubmit = (e) =>{
    e.preventDefault()
    //return console.log(formData)
    setIsLoading(true);
    apiPost({ url: `/bankAccounts`, data: formData })
      .then(res => {
        dispatchMessage({message: res.message})
        refreshBankAccountList()
        setIsLoading(false);
      })
      .catch(error => {
        console.log(error)
        setIsLoading(false);
        dispatchMessage({severity: "error", message: error.message})
      })
  }
  return (
    <>
      <div className="offcanvas-header py-5 px-4">
        <h4 className="mb-0">Add Bank Account</h4>
        <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close">
        </button>
      </div>

      <form className="d-flex flex-column gap-3 px-4">
        <div>
          <label htmlFor="bankName" className="form-label mb-1">Bank Name</label>
          <select id="bankName" className="form-select form-control form-control-sm primary-bg fs-6 py-3" aria-label="Default select example" value={formData.bankName} onChange={handleChange("bankName")}>
            <option value="">Select Bank</option>
            <option value="zenith">Zenith Bank</option>
            <option value="uba">UBA Bank</option>
            <option value="access">Access Bank</option>
            <option value="polaris">Polaris Bank</option>
            <option value="ecobank">EcoBank</option>
            <option value="jaiz">Jaiz Bank</option>
            <option value="parallex">Parallex MicroFinance Bank</option>
          </select>
        </div>
        <div>
          <label htmlFor="accountNumber" className="form-label mb-1">Account Number</label>
          <input type='text' className='form-control form-control-sm primary-bg fs-6 py-3' id='accountNumber' value={formData.accountNumber} onChange={handleChange("accountNumber")} />
        </div>
        <div>
          <label htmlFor="accountName" className="form-label mb-1">Account Name</label>
          <input type='text' className='form-control form-control-sm primary-bg fs-6 py-3' id='accountName' value={formData.accountName} onChange={handleChange("accountName")} />
        </div>
        <button className="btn app-primary-btn d-flex align-items-center justify-content-center px-5" disabled={isLoading} type="button" onClick={handleSubmit}>
          {isLoading ? <CircularProgress size={20} color="inherit" /> : "Add Account"}
        </button>
      </form>
    </>
  )
}

export default AddBankAccount;