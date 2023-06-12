import Image from "next/image";

const HeroSection = () => {

  return (
    <section id="home" className="hero-section" style={{background: "#531eba !important"}}>
      <div className="container d-flex flex-column align-items-center gap-4">
        <div className="hero-content text-white align-items-center text-center d-flex flex-column gap-2">
          <h1 className="mb-0 col-lg-9 heading">Trade Giftcards at best rates in Nigeria.</h1>
          <p className="mb-0 col-lg-7 fs-5">Join the leading peer-to-peer platform to
            buy and sell Giftcard with 10 million
            people just like you.
          </p>
        </div>

        <Image width={100} height={100} alt="Monitor showing charts and a human beside the monitor" className="hero-img img-fluid" src="/images/undraw_data_trends_re_2cdy.svg" />
      </div>
    </section>
  )
}

export default HeroSection;