import Image from "next/image";

const HeroSection = () => {

  return (
    <>
      <section id="home" className="hero-section" style={{ background: "#531eba !important" }}>
        <div className="container">
          <div className="d-flex flex-column flex-lg-row text-white text-start gap-2">
            <section className="col-12 col-lg pe-lg-5 d-flex flex-column py-5">
              <h1 className="mb-0 heading mb-4 mt-auto">Trade Giftcards at best rates in Nigeria.</h1>
              <p className="fs-6 fs-lg-4">Join the leading peer-to-peer platform to
                buy and sell Giftcard from merchants and sellers
              </p>
              <div className="mt-5 mb-auto d-flex">
                <a type="button" className="btn outline-primary-btn px-5 py-3 fw-bold" href="#">Get Started</a>
                <a type="button" className="btn btn-success px-5 py-3 fw-bold ms-3" href="https://wa.me/2348186736264" target="_blank"><i className="fa-brands fa-whatsapp fs-6"></i> Chat</a>
              </div>
              
            </section>
            <section className="col-12 col-lg py-lg-5">
              <Image width={100} height={100} alt="Monitor showing charts and a human beside the monitor" className="hero-img img img-fluid" src="/images/undraw_data_trends_re_2cdy.svg" />
            </section>
          </div>
        </div>

      </section>
      <div className="d-none d-lg-block py-5 accent-bg">
        <svg style={{ width: "100%", height: "100px", position: "relative", top: "100px" }} width="500" height="80" viewBox="0 0 500 80" preserveAspectRatio="none">
          <path d="M0,0 L0,40 Q250,80 500,40 L500,0 Z" fill="#531eba" />
        </svg>
      </div>

    </>

  )
}

export default HeroSection;