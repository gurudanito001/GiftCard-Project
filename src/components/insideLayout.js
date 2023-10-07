import Image from "next/image";
import Link from "next/link";
// import AvatarClient from "./avater";

const InsideLayout = ({ children, userData, activeLink, userId }) => {
  console.log(userData, userId)
  return (
    <div className="d-flex sticky-top" style={{ height: "100vh" }}>
      <nav className="h-100 sidebar d-none d-lg-flex flex-column gap-2 py-3">
        <div className="d-flex px-4 mx-0 px-lg-5">
          <Link className="text-decoration-none text-dark fw-bold fs-5" href="/">
            Peniga
          </Link>
        </div>
        <div className="d-flex flex-column h-100 overflow-auto">
          <ul className="navbar-nav link-wrapper w-100 h-100 pb-3 overflow-auto">
            <li className="mb-4">
              <Link className="d-flex align-items-center gap-2 px-4 ps-lg-5 text-decoration-none py-2" href={`/profile?userId=${userId}`}>
                {/* <AvatarClient /> */}
                <div className="d-flex flex-column align-items-center small">
                  <span className="primary-text">Hello {userData?.firstName} 👋</span>
                </div>
              </Link>
            </li>
            <li className="nav-item">
              <Link className={`d-flex align-items-center gap-2 px-4 px-lg-5 nav-link link py-3 ${activeLink === "dashboard" && "active"}`} href={`/dashboard?userId=${userId}`}>
                <i className="fa fa-arrow-trend-up fs-5"></i>
                <span>Dashboard</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link className={`d-flex align-items-center gap-2 px-4 px-lg-5 nav-link link py-3 ${activeLink === "offers" && "active"}`}
                href={`/offers?userId=${userId}`}>
                <i className="fa fa-arrows-to-circle fs-5"></i>
                <span>Your Offers</span>
              </Link>
            </li>
            <li className="accordion nav-item" id="accordionExample">
              <div className="accordion-item border border-0">
                <a className={`d-flex align-items-center gap-2 ps-4 ps-lg-5 nav-link link py-3 accordion-button primary-bg rounded-0 dark-text ${activeLink.includes("marketplace") && "active"}`} type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne"
                  >
                  <i className="fa fa-store fs-5"></i>
                  <span>Market Place</span>
                </a>
                <div id="collapseOne" className="accordion-collapse collapse show accordion-body p-0  ps-5" data-bs-parent="#accordionExample">
                  <Link className={`d-flex align-items-center gap-2 ps-4 ps-lg-5 my-3 dark-text text-decoration-none ${activeLink === "marketplace/merchant" && "secondary-text border-3 border-start border-secondary"}`}
                    style={{ fontSize: ".85rem" }} href={`/marketplace/merchant?userId=${userId}`}>
                    <span>Merchant</span>
                  </Link>
                  <Link className={`d-flex align-items-center gap-2 ps-4 ps-lg-5 my-3 dark-text text-decoration-none ${activeLink === "marketplace/seller" && "secondary-text border-3 border-start border-secondary"}`}
                    style={{ fontSize: ".85rem" }} href={`/marketplace/seller?userId=${userId}`}>
                    <span >Seller</span>
                  </Link>
                </div>
              </div>
            </li>
            <li className="nav-item">
              <Link className={`d-flex align-items-center gap-2 ps-4 ps-lg-5 nav-link link py-3 ${activeLink === "trades" && "active"}`}
                href={`/trades?userId=${userId}`}>
                <i className="fa fa-people-arrows fs-5"></i>
                <span>Trades</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link className={`d-flex align-items-center gap-2 px-4 px-lg-5 nav-link link py-3 ${activeLink === "escrows" && "active"}`}
                href={`/escrows?userId=${userId}`}>
                <i className="fa fa-folder-tree fs-5"></i>
                <span>Escrows</span>
              </Link>
            </li>
            <li className="nav-item ">
              <Link className={`d-flex align-items-center gap-2 px-4 px-lg-5 nav-link link py-3 ${activeLink === "transactions"&& "active"}`}
                href={`/transactions?userId=${userId}`}>
                <i className="fa fa-arrow-down-up-across-line fs-5"></i>
                <span>Transactions</span>
              </Link>
            </li>
            <li className="nav-item ">
              <Link className={`d-flex align-items-center gap-2 px-4 px-lg-5 nav-link link py-3 ${activeLink === "bankAccounts" && "active"}`}
                href={`/bankAccounts?userId=${userId}`}>
                <i className="fa fa-building-columns fs-5"></i>
                <span>Bank Accounts</span>
              </Link>
            </li>
          </ul>
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="d-flex align-items-center gap-2 px-4 px-lg-5 nav-link link py-2" href="/auth/login">
                <i className="fa fa-arrow-right-from-bracket fs-5"></i>
                <span>Log out</span>
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      <main className="w-100 d-flex flex-column">
        <div className="primary-bg d-flex d-lg-none align-items-center justify-content-between border-bottom py-3 px-4 px-md-5 w-100">
          <div className="primary-bg d-flex gap-2 align-items-center d-lg-none">
            <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#sidebar"
              aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon">
                <svg className="" width="22" height="22" viewBox="0 0 48 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M24 32H0V26.6667H24V32ZM48 18.6667H0V13.3333H48V18.6667ZM48 5.33333H24V0H48V5.33333Z"
                    fill="#444468F2" />
                </svg>
              </span>
            </button>
            <Link className="text-decoration-none text-dark fw-bold fs-5" href="/">
              Peniga
            </Link>
          </div>
          <div className="d-flex align-items-center gap-3 border">
            <div className="d-flex align-items-center gap-1">
              <i className="fa-solid fa-wallet"></i>
            </div>
            <i className="fa fa-ellipsis-vertical"></i>
          </div>
        </div>
        <div className='w-100'>
          {children}
        </div>
        
      </main>






      {/* Offcanvas menu */}
      <div className="offcanvas primary-bg offcanvas-start" data-bs-backdrop="static" data-bs-scroll="true" id="sidebar"
        aria-labelledby="offcanvasExampleLabel">
        <div className="offcanvas-header py-3 px-4">
          <button type="button" className="btn-close fs-6" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div className="d-flex px-4 mx-0 px-lg-5">
          <Link className="text-decoration-none text-dark fw-bold fs-5" href="/">
            Peniga
          </Link>
        </div>
        <div className="d-flex flex-column h-100 overflow-auto">
          <ul className="navbar-nav link-wrapper w-100 h-100 pb-3 overflow-auto">
            <li className="mb-4">
              <Link className="d-flex align-items-center gap-2 px-4 ps-lg-5 text-decoration-none py-2" href={`/profile?userId=${userId}`}>
                <i className="fa fa-circle-user fs-1" style={{ opacity: .3 }}></i>
                <div className="d-flex flex-column align-items-center small">
                  <span className="text-dark">Hello {userData?.firstName} 👋</span>
                </div>
              </Link>
            </li>
            <li className="nav-item">
              <Link className={`d-flex align-items-center gap-2 px-4 px-lg-5 nav-link link py-3 ${activeLink === "dashboard" && "active"}`} href={`/dashboard?userId=${userId}`}>
                <i className="fa fa-arrow-trend-up fs-5"></i>
                <span>Dashboard</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link className={`d-flex align-items-center gap-2 px-4 px-lg-5 nav-link link py-3 ${activeLink === "offers" && "active"}`}
                href={`/offers?userId=${userId}`}>
                <i className="fa fa-arrows-to-circle fs-5"></i>
                <span>Your Offers</span>
              </Link>
            </li>
            <li className="accordion nav-item" id="accordionExample">
              <div className="accordion-item border border-0">
                <a className={`d-flex align-items-center gap-2 ps-4 ps-lg-5 nav-link link py-3 accordion-button primary-bg rounded-0 dark-text ${activeLink.includes("marketplace") && "active"}`} type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne"
                  >
                  <i className="fa fa-store fs-5"></i>
                  <span>Market Place</span>
                </a>
                <div id="collapseOne" className="accordion-collapse collapse show accordion-body p-0  ps-5" data-bs-parent="#accordionExample">
                  <Link className={`d-flex align-items-center gap-2 ps-4 ps-lg-5 my-2 dark-text text-decoration-none ${activeLink === "marketplace/merchant" && "secondary-text border-3 border-start border-secondary"}`}
                    style={{ fontSize: ".85rem" }} href={`/marketplace/merchant?userId=${userId}`}>
                    <span>Merchant</span>
                  </Link>
                  <Link className={`d-flex align-items-center gap-2 ps-4 ps-lg-5 my-2 dark-text text-decoration-none ${activeLink === "marketplace/seller" && "secondary-text border-3 border-start border-secondary"}`}
                    style={{ fontSize: ".85rem" }} href={`/marketplace/seller?userId=${userId}`}>
                    <span >Seller</span>
                  </Link>
                </div>
              </div>
            </li>
            <li className="nav-item">
              <Link className={`d-flex align-items-center gap-2 ps-4 ps-lg-5 nav-link link py-3 ${activeLink === "trades" && "active"}`}
                href={`/trades?userId=${userId}`}>
                <i className="fa fa-people-arrows fs-5"></i>
                <span>Trades</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link className={`d-flex align-items-center gap-2 px-4 px-lg-5 nav-link link py-3 ${activeLink === "escrows" && "active"}`}
                href={`/escrows?userId=${userId}`}>
                <i className="fa fa-folder-tree fs-5"></i>
                <span>Escrows</span>
              </Link>
            </li>
            <li className="nav-item ">
              <Link className={`d-flex align-items-center gap-2 px-4 px-lg-5 nav-link link py-3 ${activeLink === "transactions"&& "active"}`}
                href={`/transactions?userId=${userId}`}>
                <i className="fa fa-arrow-down-up-across-line fs-5"></i>
                <span>Transactions</span>
              </Link>
            </li>
            <li className="nav-item ">
              <Link className={`d-flex align-items-center gap-2 px-4 px-lg-5 nav-link link py-3 ${activeLink === "bankAccounts" && "active"}`}
                href={`/bankAccounts?userId=${userId}`}>
                <i className="fa fa-building-columns fs-5"></i>
                <span>Bank Accounts</span>
              </Link>
            </li>
          </ul>
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="d-flex align-items-center gap-2 px-4 px-lg-5 nav-link link py-2" href="/auth/login">
                <i className="fa fa-arrow-right-from-bracket fs-5"></i>
                <span>Log out</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
      {/* Offcanvas end */}


    </div>
  )
}

export default InsideLayout;