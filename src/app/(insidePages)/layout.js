"use client"
import { Avatar } from "@mui/material";
import {usePathname} from 'next/navigation';

const Layout = ({ children }) => {
  const pathname = usePathname();
  return (
    <div className="d-flex sticky-top" style={{height: "100vh"}}>
      <nav className="h-100 sidebar d-none d-md-flex flex-column gap-2 py-3">
        <div className="d-flex px-4 mx-0 px-lg-5">
          <a className="text-decoration-none text-dark fw-bold fs-5" href="/">
            Peniga
          </a>
        </div>
        <div className="d-flex flex-column h-100 overflow-auto">
          <ul className="navbar-nav link-wrapper w-100 h-100 pb-3 overflow-auto">
            <li className="mb-4">
              <a className="d-flex align-items-center gap-2 px-4 ps-lg-5 text-decoration-none py-2" href="/profile">
                <Avatar />
                <div className="d-flex flex-column align-items-center small">
                  <span className="text-dark">Hello Daniel 👋</span>
                </div>

              </a>
            </li>
            <li className="nav-item">
              <a className={`d-flex align-items-center gap-2 px-4 px-lg-5 nav-link link py-3 ${pathname.includes("dashboard") && "active"}`} href="/dashboard">
                <i className="fa fa-arrow-trend-up fs-5"></i>
                <span>Dashboard</span>
              </a>
            </li>
            <li className="nav-item">
              <a className={`d-flex align-items-center gap-2 px-4 px-lg-5 nav-link link py-3 ${pathname.includes("offers") && "active"}`}
                href="/offers">
                <i className="fa fa-arrows-to-circle fs-5"></i>
                <span>Your Offers</span>
              </a>
            </li>
            <li className="nav-item">
              <a className={`d-flex align-items-center gap-2 px-4 px-lg-5 nav-link link py-3 ${pathname.includes("marketplace") && "active"}`}
                href="/marketplace">
                <i className="fa fa-store fs-5"></i>
                <span>Market Place</span>
              </a>
            </li>
            <li className="nav-item">
              <a className={`d-flex align-items-center gap-2 px-4 px-lg-5 nav-link link py-3 ${pathname.includes("trades") && "active"}`}
                href="/trades">
                <i className="fa fa-people-arrows fs-5"></i>
                <span>Trades</span>
              </a>
            </li>
            <li className="nav-item">
              <a className={`d-flex align-items-center gap-2 px-4 px-lg-5 nav-link link py-3 ${pathname.includes("escrows") && "active"}`}
                href="/escrows">
                <i className="fa fa-folder-tree fs-5"></i>
                <span>Escrows</span>
              </a>
            </li>
            <li className="nav-item ">
              <a className={`d-flex align-items-center gap-2 px-4 px-lg-5 nav-link link py-3 ${pathname.includes("transactions") && "active"}`}
                href="/transactions">
                <i className="fa fa-arrow-down-up-across-line fs-5"></i>
                <span>Transactions</span>
              </a>
            </li>
            <li className="nav-item ">
              <a className={`d-flex align-items-center gap-2 px-4 px-lg-5 nav-link link py-3 ${pathname.includes("bankAccounts") && "active"}`}
                href="/bankAccounts">
                <i className="fa fa-building-columns fs-5"></i>
                <span>Bank Accounts</span>
              </a>
            </li>
            <li className="nav-item ">
              <a className={`d-flex align-items-center gap-2 px-4 px-lg-5 nav-link link py-3 ${pathname.includes("chat") && "active"}`} href="./chat.html">
                <i className="fa fa-comment-dots fs-5"></i>
                <span>Chat</span>
              </a>
            </li>
            <li className="nav-item ">
              <a className={`d-flex align-items-center gap-2 px-4 px-lg-5 nav-link link py-3 ${pathname.includes("settings") && "active"}`}
                href="./settings.html">
                <i className="fa fa-gear fs-5"></i>
                <span>Settings</span>
              </a>
            </li>

          </ul>
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="d-flex align-items-center gap-2 px-4 px-lg-5 nav-link py-2" href="./login.html">
                <i className="fa fa-arrow-right-from-bracket fs-5"></i>
                <span>Log out</span>
              </a>
            </li>
          </ul>
        </div>
      </nav>

      {/* Offcanvas menu */}
      <div className="offcanvas primary-bg offcanvas-start" data-bs-backdrop="static" data-bs-scroll="true" id="sidebar"
        aria-labelledby="offcanvasExampleLabel">
        <div className="offcanvas-header py-3 px-4">
          <button type="button" className="btn-close fs-6" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div className="d-flex px-4 mx-0 px-lg-5">
          <a className="text-decoration-none text-dark fw-bold fs-5" href="/">
            Peniga
          </a>
        </div>
        <div className="d-flex flex-column h-100 overflow-auto">
          <ul className="navbar-nav link-wrapper w-100 h-100 pb-3 overflow-auto">
            <li className="nav-item mb-4">
              <a className="d-flex align-items-center gap-2 px-4 ps-lg-5 text-decoration-none py-2" href="/profile">
                <Avatar />
                <div className="d-flex flex-column align-items-center small">
                  <span className="text-dark">Hello Daniel 👋</span>
                </div>
              </a>
            </li>
            <li className="nav-item">
              <a className="d-flex align-items-center gap-2 px-4 px-lg-5 nav-link link active py-3" href="/dashboard">
                <i className="fa fa-arrow-trend-up fs-5"></i>
                <span>Dashboard</span>
              </a>
            </li>
            <li className="nav-item">
              <a className="d-flex align-items-center gap-2 px-4 px-lg-5 nav-link link py-3"
                href="/offers">
                <i className="fa fa-code-pull-request fs-5"></i>
                <span>Offers</span>
              </a>
            </li>
            <li className="nav-item ">
              <a className="d-flex align-items-center gap-2 px-4 px-lg-5 nav-link link py-3"
                href="/transactions">
                <i className="fa fa-share fs-5"></i>
                <span>Transactions</span>
              </a>
            </li>
            <li className="nav-item ">
              <a className="d-flex align-items-center gap-2 px-4 px-lg-5 nav-link link py-3" href="./chat.html">
                <i className="fa fa-comment-dots fs-5"></i>
                <span>Chat</span>
              </a>
            </li>
            <li className="nav-item ">
              <a className="d-flex align-items-center gap-2 px-4 px-lg-5 nav-link link py-3"
                href="./settings.html">
                <i className="fa fa-gear fs-5"></i>
                <span>Settings</span>
              </a>
            </li>

          </ul>
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="d-flex align-items-center gap-2 px-4 px-lg-5 nav-link py-2" href="./login.html">
                <i className="fa fa-arrow-right-from-bracket fs-5"></i>
                <span>Log out</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
      {/* Offcanvas end */}


      {/*  Fund wallet */}
      <div className="offcanvas primary-bg offcanvas-end gap-1" data-bs-backdrop="static" data-bs-scroll="true" id="fundWallet">
        <div id="depositOffcanvas">
          <div className="offcanvas-header py-3 px-4">
            <h6 className="mb-0 fw-bold">Fund Wallet</h6>
            <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close">
            </button>
          </div>
          <div className="px-4 d-flex flex-column gap-2">
            <div>
              <label htmlFor="cardNumber" className="form-label mb-1">Card Number</label>
              <input type="number" className="form-control bg-grey" id="cardNumber" placeholder="0000 0000 0000" />
            </div>
            <div className="d-flex gap-2">
              <div>
                <label htmlFor="validThru" className="form-label mb-1">Valid thru</label>
                <input type="number" className="form-control bg-grey" id="validThru" placeholder="MM / yy" />
              </div>
              <div>
                <label htmlFor="cvc" className="form-label mb-1">CVC</label>
                <input type="number" className="form-control bg-grey" id="cvc" placeholder="123" />
              </div>
            </div>
            <div>
              <label htmlFor="amount" className="form-label mb-1">Amount</label>
              <input type="number" className="form-control bg-grey" id="amount" />
            </div>
            <div>
              <label htmlFor="cardholder" className="form-label mb-1">Cardholder Name</label>
              <input type="text" className="form-control bg-grey" id="cardholder" />
            </div>

            <div className="d-flex gap-2">
              <button className="btn btn-primary">Deposit</button>
              <button className="btn btn-outline-accent" data-bs-dismiss="offcanvas">Cancel</button>
            </div>
          </div>
        </div>

        <div id="withdrawOffcanvas" className="d-none">
          <div className="offcanvas-header py-3 px-4">
            <h6 className="mb-0 fw-bold">Withdraw</h6>
            <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close">
            </button>
          </div>

          <div className="px-4 d-flex flex-column gap-2">
            <div>
              <label htmlFor="amount" className="form-label mb-1">Amount</label>
              <input type="number" className="form-control bg-grey" id="amount" />
            </div>
            <div>
              <select className="form-select bg-grey" aria-label="Default select example">
                <option value="">select account</option>
                <option value="gtbank">GTBank</option>
                <option value="firstBank">First Bank PLC</option>
              </select>
            </div>
            <div className="d-flex gap-2">
              <button type="button" className="btn btn-primary">Withdraw</button>
              <button type="button" className="btn btn-outline-accent" data-bs-dismiss="offcanvas">Cancel</button>
            </div>
          </div>
        </div>
      </div>
      {/*  Fund wallet */}

      <main className="w-100">
        <div className="primary-bg d-flex d-md-none align-items-center justify-content-between border-bottom py-3 px-4 px-md-5">
          <div className=" primary-bg d-flex gap-2 align-items-center d-md-none">
            <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#sidebar"
              aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon">
                <svg className="" width="22" height="22" viewBox="0 0 48 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M24 32H0V26.6667H24V32ZM48 18.6667H0V13.3333H48V18.6667ZM48 5.33333H24V0H48V5.33333Z"
                    fill="#444468F2" />
                </svg>
              </span>
            </button>
            <a className="text-decoration-none text-dark fw-bold fs-5" href="/">
              Peniga
            </a>
          </div>
          <div className="d-flex align-items-center gap-3">
            <div className="d-flex align-items-center gap-1">
              <i className="fa-solid fa-wallet"></i>
            </div>
            <i className="fa fa-ellipsis-vertical"></i>
          </div>
        </div>
        {children}
      </main>

    </div>
  )
}

export default Layout