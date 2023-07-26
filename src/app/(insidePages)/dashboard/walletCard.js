"use client"

import { IconButton, CircularProgress } from '@mui/material';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { setUserData } from '@/store/slices/userDataSlice';
import { apiPost, apiPatch } from '@/services/apiService';
import formatAsCurrency from '@/services/formatAsCurrency';
import FundWalletForm from './fundWallet';
import Withdraw from './withdraw';

const styles = {
  card: {
    width: "clamp(350px, 350px, 550px)",
    fontSize: ".8rem"
  }
}

const WalletCard = ({ userData }) => {
  const dispatch = useDispatch();
  const [currentForm, setCurrentForm] = useState("")

  const refreshUserData = () => {
    console.log("gfdhgdfhgfhgfhfhfghgf")
    const token = localStorage.getItem("token")
    apiPost({ url: `/auth/refreshUserData/${token}` })
      .then(res => {
        console.log(res.data)
        localStorage.setItem("token", res.data.token);
        dispatch(setUserData(res.data));
        return res.data
      })
      .catch(error => {
        console.log(error)
        logout()
      })
  }

  return (
    <section className=''>
      <div className="card gap-2 primary-bg border-0 rounded-4 p-4" style={styles.card}>
        <div className="d-flex flex-column border-0">
          <p className="mb-0 small text-secondary">Ledger Balance</p>
          <p className="mb-0 fs-6 small fw-bold text-secondary">₦{formatAsCurrency(userData.wallet.currentBalance)}</p>
        </div>
        <div className="d-flex flex-column border-0">
          <p className="mb-0">Available Balance</p>
          <p className="mb-0 fs-5 fw-bold">₦{formatAsCurrency(userData.wallet.currentBalance)}</p>
        </div>
        <div className="d-flex align-items-center">
          <a href="#offCanvasForms" data-bs-toggle="offcanvas" onClick={()=>setCurrentForm("fundWallet")}
            aria-expanded="false" aria-label="Toggle navigation" className="text-decoration-none text-dark d-flex flex-column align-items-center mx-auto">
            <IconButton>
              <i className="fa-solid fa-plus fs-4"></i>
            </IconButton>
            <span className="small">Fund Wallet</span>
          </a>
          <a href="#offCanvasForms" data-bs-toggle="offcanvas"  onClick={()=>setCurrentForm("sendFunds")}
            aria-expanded="false" aria-label="Toggle navigation" className="text-decoration-none text-dark d-flex flex-column align-items-center mx-auto">
            <IconButton>
              <i className="fa-solid fa-paper-plane fs-4"></i>
            </IconButton>
            <span className="small">Send</span>
          </a>
          <a href="#offCanvasForms" data-bs-toggle="offcanvas" onClick={()=>setCurrentForm("withdraw")}
            aria-expanded="false" aria-label="Toggle navigation" className="text-decoration-none text-dark d-flex flex-column align-items-center mx-auto" >
            <IconButton>
              <i className="fa-solid fa-minus"></i>
            </IconButton>
            <span className="small">Withdraw</span>
          </a>
        </div>
      </div>





      {/*  Fund wallet */}
      <div className="offcanvas primary-bg offcanvas-end gap-1" data-bs-scroll="true" id="offCanvasForms" tabIndex="-1">
        {currentForm === "fundWallet" && <FundWalletForm userData={userData} refreshUserData={refreshUserData} />}
        {currentForm === "withdraw" && <Withdraw userData={userData} refreshUserData={refreshUserData} />}
        
      </div>
      {/*  Fund wallet */}


      {/* <div className="offcanvas primary-bg offcanvas-end gap-1" data-bs-scroll="true" id="withdraw" tabIndex="-1">
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
            <input type="text" className="form-control form-control-sm primary-bg fs-6 py-3" id="amount" value={fundWalletForm.currentBalance} onChange={handleChangeFundWallet("currentBalance")} />
          </div>
          <div className="d-flex justify-content-center gap-2">
            <button className="btn app-primary-btn d-flex align-items-center" disabled={isLoadingFundWallet} type="button" onClick={handleSubmitFundWallet}>
              {isLoadingFundWallet ? <CircularProgress size={20} color="inherit" /> : "Fund Wallet"}
            </button>
          </div>
        </div>
      </div> */}

        {/* <div id="sendFunds">
          <div className="offcanvas-header py-5 px-4">
            <h4 className="mb-0">Send Funds </h4>
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
              <input type="text" className="form-control form-control-sm primary-bg fs-6 py-3" id="amount" value={fundWalletForm.currentBalance} onChange={handleChangeFundWallet("currentBalance")} />
            </div>
            <div className="d-flex justify-content-center gap-2">
              <button className="btn app-primary-btn d-flex align-items-center" disabled={isLoadingFundWallet} type="button" onClick={handleSubmitFundWallet}>
                {isLoadingFundWallet ? <CircularProgress size={20} color="inherit" /> : "Fund Wallet"}
              </button>
            </div>
          </div>
        </div> */}
      


    </section>
  )
}

export default WalletCard