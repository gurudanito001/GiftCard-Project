import Image from "next/image";
import Link from "next/link";

const PublicLayout = ({ children }) => {

  return (
    <>

      <nav className="navbar navbar-expand-lg accent-bg sticky-top d-flex flex-column">
        <div className="border-bottom d-flex w-100">
          <Link className="ms-auto small pe-3 text-white text-decoration-none" href="https://wa.me/2348186736264" target="_blank"><i className="fa-brands fa-whatsapp fs-6"></i> +234 818 673 6264</Link>
        </div>
        <div className="container py-2">
          <Link className="navbar-brand text-decoration-none text-light fw-bold fs-3" href="/">
            Peniga
          </Link>
          <button type="button" className="btn d-block d-lg-none nav-btn" data-bs-toggle="offcanvas"
            data-bs-target="#navmenu" aria-controls="offcanvasExample">
            <span>
              <svg className="menu" width="22" height="22" viewBox="0 0 48 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M24 32H0V26.6667H24V32ZM48 18.6667H0V13.3333H48V18.6667ZM48 5.33333H24V0H48V5.33333Z"
                  fill="var(--primary)" />
              </svg>
            </span>
          </button>
          <ul className="d-none d-lg-flex navbar-nav gap-2 flex-fill justify-content-center">
            <li className="nav-item">
              <a className="nav-link text-light" aria-current="page" href="/#home">Home</a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-light" aria-current="page" href="/#whyChooseUs">Why Choose Us</a>
            </li>
            <div className="dropdown">
              <button className="btn btn-link text-decoration-none text-light dropdown-toggle nav-link" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                Market Place
              </button>
              <ul className="dropdown-menu">
                <li className="small fw-bold"><Link className="dropdown-item" href="/market/merchant">Merchant</Link></li>
                <li className="small fw-bold"><Link className="dropdown-item" href="/market/seller">Seller</Link></li>
              </ul>
            </div>
          </ul>
          <ul className="d-none d-lg-flex navbar-nav gap-2">
            <li>
              <Link type="button" className="btn outline-primary-btn px-4 py-2 fw-bold" href="/auth/login">Log In</Link>
            </li>
            <li>
              <Link className="btn accent-btn sign-up-btn px-4 py-2 fw-bold"
                type="button" href="/auth/register">Register
              </Link>
            </li>
          </ul>
        </div>
      </nav>




      <aside className="offcanvas offcanvas-end accent-bg mb-auto" data-bs-scroll="true" id="navmenu">
        <div className="offcanvas-header pe-5 pt-4 justify-content-end mt-1 px-0">
          <button type="button" className="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div className="offcanvas-body align-items-center px-4 d-flex flex-column gap-4">
          <ul className="navbar-nav gap-2 w-100">
            <li className="nav-item">
              <a className="nav-link text-light" aria-current="page" href="/#home">Home</a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-light" aria-current="page" href="/#whyChooseUs">Why Choose Us</a>
            </li>
            <div className="dropdown">
              <button className="btn btn-link text-decoration-none text-light dropdown-toggle nav-link" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                Market Place
              </button>
              <ul className="dropdown-menu">
                <li className="small fw-bold"><Link className="dropdown-item" href="/market/merchant">Merchant</Link></li>
                <li className="small fw-bold"><Link className="dropdown-item" href="/market/seller">Seller</Link></li>
              </ul>
            </div>
          </ul>

          <ul className="list-unstyled d-flex align-items-center gap-2 w-100">
            <li>
              <Link type="button" className="btn outline-primary-btn px-4 py-2 fw-bold" href="/auth/login">Log In</Link>
            </li>
            <li>
              <Link className="btn accent-btn sign-up-btn px-4 py-2 fw-bold"
                type="button " href="/auth/register">Register
              </Link>
            </li>
          </ul>
        </div>
      </aside>
      <main style={{ height: "100vh" }} className='d-flex flex-column'>
        {children}
        <footer className="accent-bg py-5 mt-auto">
          <div className="container d-flex flex-column flex-sm-row justify-content-center align-items-center gap-3 gap-sm-5">
            <p className="mb-0 text-light small order-1 order-sm-0">
              &copy; 2023 Peniga. All Rights Reserved
            </p>

            <div className="d-flex gap-1 order-0 order-sm-1">
              <a href="https://www.facebook.com"><Image src="/images/brandico_facebook.svg" alt="Facebook Icon" height={24} width={24} /></a>
              <a href="https://www.twitter.com"><Image src="/images/arcticons_twitter.svg" alt="Twitter Icon" height={24} width={24} /></a>
              <a href="https://www.instagram.com"><Image src="/images/akar-icons_instagram-fill.svg" alt="Instagram Icon" height={24} width={24} /></a>
            </div>
          </div>
        </footer>
      </main>
    </>
  )
}

export default PublicLayout;