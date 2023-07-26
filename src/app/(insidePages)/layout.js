"use client"
import { usePathname } from 'next/navigation';
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { clearUserData } from "@/store/slices/userDataSlice";
import { apiPost } from '@/services/apiService';
import { setUserData } from "@/store/slices/userDataSlice";

const Layout = ({ children }) => {
  const { userData } = useSelector((state) => state.userData);
  console.log(userData)
  const dispatch = useDispatch();
  const pathname = usePathname();
  const router = useRouter();


  useEffect(() => {
    if (!userData.token) {
      let localStorageToken = localStorage.getItem("token");
      console.log(localStorageToken)
      if (!localStorageToken) {
        router.push("/auth/login")
      } else {
        refreshUserData(localStorageToken)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userData])

  const refreshUserData = (token) => {
    apiPost({ url: `/auth/refreshUserData/${token}` })
      .then(res => {
        console.log(res.data)
        localStorage.setItem("token", res.data.token);
        dispatch(setUserData(res.data));
      })
      .catch(error => {
        console.log(error)
        logout()
      })
  }

  const logout = () => {
    console.log("logout")
    localStorage.removeItem("token");
    dispatch(clearUserData());
  }
  return (
    <div className="d-flex sticky-top" style={{ height: "100vh" }}>
      <nav className="h-100 sidebar d-none d-lg-flex flex-column gap-2 py-3">
        <div className="d-flex px-4 mx-0 px-lg-5">
          <a className="text-decoration-none text-dark fw-bold fs-5" href="/">
            Peniga
          </a>
        </div>
        <div className="d-flex flex-column h-100 overflow-auto">
          <ul className="navbar-nav link-wrapper w-100 h-100 pb-3 overflow-auto">
            <li className="mb-4">
              <a className="d-flex align-items-center gap-2 px-4 ps-lg-5 text-decoration-none py-2" href="/profile">
                <i className="fa fa-circle-user fs-1" style={{ opacity: .3 }}></i>
                <div className="d-flex flex-column align-items-center small">
                  <span className="text-dark">Hello {userData.firstName} 👋</span>
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
            <li className="accordion nav-item" id="accordionExample">
              <div className="accordion-item border border-0">
                <a className={`d-flex align-items-center gap-2 ps-4 ps-lg-5 nav-link link py-3 accordion-button primary-bg rounded-0 dark-text ${pathname.includes("marketplace") && "active"}`} type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne"
                  href="/marketplace">
                  <i className="fa fa-store fs-5"></i>
                  <span>Market Place</span>
                </a>
                <div id="collapseOne" className="accordion-collapse collapse show accordion-body p-0  ps-5" data-bs-parent="#accordionExample">
                  <a className={`d-flex align-items-center gap-2 ps-4 ps-lg-5 py-2 dark-text text-decoration-none ${pathname.includes("marketplace/merchant") && "secondary-text border-3 border-start border-secondary"}`}
                    style={{ fontSize: ".85rem" }} href="/marketplace/merchant">
                    <span>Merchant</span>
                  </a>
                  <a className={`d-flex align-items-center gap-2 ps-4 ps-lg-5 py-2 dark-text text-decoration-none ${pathname.includes("marketplace/seller") && "secondary-text border-3 border-start border-secondary"}`}
                    style={{ fontSize: ".85rem" }} href="/marketplace/seller">
                    <span >Seller</span>
                  </a>
                </div>
              </div>
            </li>
            <li className="nav-item">
              <a className={`d-flex align-items-center gap-2 ps-4 ps-lg-5 nav-link link py-3 ${pathname.includes("trades") && "active"}`}
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
              <a className="d-flex align-items-center gap-2 px-4 px-lg-5 nav-link link py-2" onClick={logout}>
                <i className="fa fa-arrow-right-from-bracket fs-5"></i>
                <span>Log out</span>
              </a>
            </li>
          </ul>
        </div>
      </nav>

      <main className="w-100 border border-danger d-flex flex-column">
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
            <a className="text-decoration-none text-dark fw-bold fs-5" href="/">
              Peniga
            </a>
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
          <a className="text-decoration-none text-dark fw-bold fs-5" href="/">
            Peniga
          </a>
        </div>
        <div className="d-flex flex-column h-100 overflow-auto">
          <ul className="navbar-nav link-wrapper w-100 h-100 pb-3 overflow-auto">
            <li className="mb-4">
              <a className="d-flex align-items-center gap-2 px-4 ps-lg-5 text-decoration-none py-2" href="/profile">
                <i className="fa fa-circle-user fs-1" style={{ opacity: .3 }}></i>
                <div className="d-flex flex-column align-items-center small">
                  <span className="text-dark">Hello {userData.firstName} 👋</span>
                </div>
              </a>
            </li>
            <li className="nav-item">
              <a className={`d-flex align-items-center gap-2 px-4 px-lg-5 nav-link link py-3 dark-text ${pathname.includes("dashboard") && "active"}`} href="/dashboard">
                <i className="fa fa-arrow-trend-up fs-5"></i>
                <span>Dashboard</span>
              </a>
            </li>
            <li className="nav-item">
              <a className={`d-flex align-items-center gap-2 px-4 px-lg-5 nav-link link py-3 dark-text ${pathname.includes("offers") && "active"}`}
                href="/offers">
                <i className="fa fa-arrows-to-circle fs-5"></i>
                <span>Your Offers</span>
              </a>
            </li>
            <li className="accordion nav-item" id="accordionExample">
              <div className="accordion-item border border-0">
                <a className={`d-flex align-items-center gap-2 ps-4 ps-lg-5 nav-link link py-3 accordion-button primary-bg rounded-0 dark-text ${pathname.includes("marketplace") && "active"}`} type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne"
                  href="/marketplace">
                  <i className="fa fa-store fs-5"></i>
                  <span>Market Place</span>
                </a>
                <div id="collapseOne" className="accordion-collapse collapse show accordion-body p-0  ps-5" data-bs-parent="#accordionExample">
                  <a className={`d-flex align-items-center gap-2 ps-4 ps-lg-5 py-2 dark-text text-decoration-none ${pathname.includes("marketplace/merchant") && "secondary-text border-3 border-start border-secondary"}`}
                    style={{ fontSize: ".85rem" }} href="/marketplace/merchant">
                    <span>Merchant</span>
                  </a>
                  <a className={`d-flex align-items-center gap-2 ps-4 ps-lg-5 py-2 dark-text text-decoration-none ${pathname.includes("marketplace/seller") && "secondary-text border-3 border-start border-secondary"}`}
                    style={{ fontSize: ".85rem" }} href="/marketplace/seller">
                    <span >Seller</span>
                  </a>
                </div>
              </div>
            </li>
            <li className="nav-item">
              <a className={`d-flex align-items-center gap-2 ps-4 ps-lg-5 nav-link link py-3 dark-text ${pathname.includes("trades") && "active"}`}
                href="/trades">
                <i className="fa fa-people-arrows fs-5"></i>
                <span>Trades</span>
              </a>
            </li>
            <li className="nav-item">
              <a className={`d-flex align-items-center gap-2 px-4 px-lg-5 nav-link link py-3 dark-text ${pathname.includes("escrows") && "active"}`}
                href="/escrows">
                <i className="fa fa-folder-tree fs-5"></i>
                <span>Escrows</span>
              </a>
            </li>
            <li className="nav-item ">
              <a className={`d-flex align-items-center gap-2 px-4 px-lg-5 nav-link link py-3 dark-text ${pathname.includes("transactions") && "active"}`}
                href="/transactions">
                <i className="fa fa-arrow-down-up-across-line fs-5"></i>
                <span>Transactions</span>
              </a>
            </li>
            <li className="nav-item ">
              <a className={`d-flex align-items-center gap-2 px-4 px-lg-5 nav-link link py-3 dark-text ${pathname.includes("bankAccounts") && "active"}`}
                href="/bankAccounts">
                <i className="fa fa-building-columns fs-5"></i>
                <span>Bank Accounts</span>
              </a>
            </li>
            <li className="nav-item ">
              <a className={`d-flex align-items-center gap-2 px-4 px-lg-5 nav-link link py-3 dark-text ${pathname.includes("chat") && "active"}`} href="./chat.html">
                <i className="fa fa-comment-dots fs-5"></i>
                <span>Chat</span>
              </a>
            </li>
            <li className="nav-item ">
              <a className={`d-flex align-items-center gap-2 px-4 px-lg-5 nav-link link py-3 dark-text ${pathname.includes("settings") && "active"}`}
                href="./settings.html">
                <i className="fa fa-gear fs-5"></i>
                <span>Settings</span>
              </a>
            </li>

          </ul>
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="d-flex align-items-center gap-2 px-4 px-lg-5 nav-link link py-3 dark-text" onClick={logout}>
                <i className="fa fa-arrow-right-from-bracket fs-5"></i>
                <span>Log out</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
      {/* Offcanvas end */}


    </div>
  )
}

export default Layout