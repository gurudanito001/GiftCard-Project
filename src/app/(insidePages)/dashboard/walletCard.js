
// import { IconButton } from '@mui/material';
import formatAsCurrency from '@/services/formatAsCurrency';
import FundWalletForm from './fundWallet';
import Withdraw from './withdraw';


const styles = {
  card: {
    width: "clamp(350px, 350px, 550px)",
    fontSize: ".8rem"
  }
}

const WalletCard = ({ userData, bankAccounts }) => {

  const getAvailableBalance = () =>{
    let escrows = ""
  }
  return (
    <section className=''>
      <div className="card gap-2 primary-bg border-0 rounded-4 p-4" style={styles.card}>
        <div className="d-flex flex-column border-0">
          <p className="mb-0 small text-secondary">Ledger Balance</p>
          <small className="mb-0 fs-6 small fw-bold text-secondary">₦{formatAsCurrency(userData?.wallet?.currentBalance)}</small>
        </div>
        <div className="d-flex flex-column border-0">
          <p className="mb-0 primary-text">Available Balance</p>
          <p className="mb-0 fs-5 fw-bold primary-text">₦{formatAsCurrency(userData?.wallet?.availableBalance)}</p>
        </div>
        <div className="d-flex align-items-center">
          <a href="#fundWalletForm" data-bs-toggle="offcanvas"
            aria-expanded="false" aria-label="Toggle navigation" className="text-decoration-none primary-text d-flex flex-column align-items-center mx-auto">
              <i className="fa-solid fa-download fs-4 primary-text"></i>
            <span className="small fw-bold">Add Funds</span>
          </a>
          <a href="#offCanvasForms" data-bs-toggle="offcanvas"
            aria-expanded="false" aria-label="Toggle navigation" className="text-decoration-none primary-text d-flex flex-column align-items-center mx-auto">
              <i className="fa-solid fa-paper-plane fs-4 primary-text"></i>
            <span className="small fw-bold">Send</span>
          </a>
          <a href="#withdrawForm" data-bs-toggle="offcanvas"
            aria-expanded="false" aria-label="Toggle navigation" className="text-decoration-none primary-text d-flex flex-column align-items-center mx-auto" >
              <i className="fa-solid fa-money-bill-transfer fs-4 primary-text"></i>
            <span className="small fw-bold">Withdraw</span>
          </a>
        </div>
      </div>



      {/*  Fund wallet */}
      <div className="offcanvas primary-bg offcanvas-end gap-1" data-bs-scroll="true" id="fundWalletForm" tabIndex="-1">
        <FundWalletForm userData={userData} />
      </div>
      {/*  Fund wallet */}

      {/*  Withdraw */}
      <div className="offcanvas primary-bg offcanvas-end gap-1" data-bs-scroll="true" id="withdrawForm" tabIndex="-1">
        <Withdraw userData={userData} bankAccounts={bankAccounts} />
      </div>
      {/*  Withdraw */}
    </section>
  )
}

export default WalletCard