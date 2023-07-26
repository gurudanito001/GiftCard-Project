import Image from "next/image";

const PublicLayout = ({ children }) => {

  return (
    <>
      <nav className="navbar navbar-expand-lg accent-bg sticky-top">
        <div className="container">
          <a className="navbar-brand text-decoration-none primary-text fw-bold fs-3" href="/">
            Peniga
          </a>
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
              <a className="nav-link nav-link-lg primary-text" aria-current="page" href="/#home">Home</a>
            </li>
            <li className="nav-item">
              <a className="nav-link nav-link-lg primary-text" aria-current="page" href="/#ourServices">Our Services</a>
            </li>
            <li className="nav-item">
              <a className="nav-link nav-link-lg primary-text" aria-current="page" href="/#whyChooseUs">Why Choose Us</a>
            </li>
            <li className="nav-item">
              <a className="nav-link nav-link-lg primary-text" aria-current="page" href="/marketplace">Market Place</a>
            </li>
          </ul>
          <ul className="d-none d-lg-flex navbar-nav gap-2">
            <li>
              <a type="button" className="btn login-btn outline-primary-btn" href="/auth/login">Log In</a>
            </li>
            <li>
              <a className="btn accent-btn sign-up-btn"
                type="button " href="/auth/register">Register
              </a>
            </li>
          </ul>
        </div>
      </nav>
      <aside className="offcanvas offcanvas-end accent-bg mb-auto" data-bs-scroll="true" id="navmenu">
        <div className="offcanvas-header pe-5 pt-4 justify-content-end mt-1 px-0">
          <button type="button" className="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div className="offcanvas-body align-items-center px-4 d-flex flex-column gap-4">
          <ul className="navbar-nav gap-3">
            <li className="nav-item">
              <a className="nav-link py-0 primary-text" aria-current="page" href="./index.html#home">Home</a>
            </li>
            <li className="nav-item">
              <a className="py-0 nav-link primary-text" aria-current="page" href="./index.html#ourServices">Our Services</a>
            </li>
            <li className="nav-item">
              <a className="py-0 nav-link primary-text" aria-current="page" href="./index.html#whyChooseUs">Why Choose Us</a>
            </li>


            <ul className="navbar-nav gap-2">
              <li>
                <a type="button" className="btn outline-primary-btn" href="./login.html">Log In</a>
              </li>
              <li>
                <a className="btn accent-btn"
                  type="button " href="./signUp.html">Register
                </a>
              </li>
            </ul>
          </ul>
        </div>
      </aside>
      <main style={{ height: "100vh" }} className='d-flex flex-column'>
        {children}
        <footer className="accent-bg py-5 mt-auto">
          <div className="container d-flex flex-column flex-sm-row justify-content-center align-items-center gap-3 gap-sm-5">
            <p className="mb-0 primary-text small order-1 order-sm-0">
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