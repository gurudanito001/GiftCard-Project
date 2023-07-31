import Image from "next/image";


const WhyChooseUs = () => {

  return (
    <section id="whyChooseUs" className="d-flex flex-column align-items-center container-fluid gap-4 section">
      <h2 className="lead fs-1 mb-4">Why Choose Us</h2>

      <div className="container">
        <div className="row mb-5">
          <section className="col-12 col-lg-5 offset-lg-1 py-lg-5">
            <Image width={100} height={100} alt="Monitor showing charts and a human beside the monitor" className="hero-img img img-fluid" src="/images/seemless-transactions.svg" />
          </section>

          <section className="col-12 col-lg-5 pe-lg-5 d-flex flex-column py-5">
            <div className="d-flex my-auto">
              <article>
                <h5 className="mb-4 fw-bold">Seemless Transactions</h5>
                <ul className="list-unstyled text-secondary">
                  <li className="mb-2">In-app wallet where you can receive payments for your GiftCards</li>
                  <li className="mb-2">Fund and withdraw from wallet at any time</li>
                  <li className="mb-2">Save your bank Accounts for easy withdrawals</li>

                </ul>

                <div className="mt-5 d-flex">
                  <a type="button" className="btn primary-btn px-5 py-3 fw-bold text-white" href="#">Get Started</a>
                </div>
              </article>
            </div>
          </section>
        </div>


        <div className="row mb-5">
          <section className="col-12 col-lg-5 offset-lg-1 pe-lg-5 d-flex flex-column py-5 order-2 order-lg-1">
            <div className="d-flex my-auto">
              <article>
                <h5 className="mb-4 fw-bold">Scam Prevention</h5>
                <ul className="list-unstyled text-secondary">
                  <li className="mb-2">Trades are allowed only when buyer has value of Giftcard in wallet.</li>
                  <li className="mb-2">Value of GiftCard is withheld from buyer&apos;s wallet until transaction has been completed</li>
                  <li className="mb-2">Fraudulent Accounts are de-activated</li>
                  <li className="mb-2">Screen records are encouraged for scam prevention</li>
                </ul>

                <div className="mt-5 d-flex">
                  <a type="button" className="btn primary-btn px-5 py-3 fw-bold text-white" href="#">Get Started</a>
                </div>
              </article>
            </div>
          </section>

          <section className="col-12 col-lg-5 order-1 order-lg-2 py-lg-5">
            <Image width={100} height={100} alt="Monitor showing charts and a human beside the monitor" className="hero-img img img-fluid" src="/images/scam-protection.svg" />
          </section>
        </div>


        <div className="row mb-5">
          <section className="col-12 col-lg-5 offset-lg-1 py-lg-5">
            <Image width={100} height={100} alt="Monitor showing charts and a human beside the monitor" className="hero-img img img-fluid" src="/images/dispute-settlement.svg" />
          </section>

          <section className="col-12 col-lg-5 pe-lg-5 d-flex flex-column py-5">
            <div className="d-flex my-auto">
              <article>
                <h5 className="mb-4 fw-bold">Dispute Settlement</h5>
                <ul className="list-unstyled text-secondary">
                  <li className="mb-2">In the event of a dispute, a team will be setup to look into the dispute and resolve it within 24hrs</li>
                  <li className="mb-2">Funds will be paid in favor of person who won the dispute</li>
                </ul>

                <div className="mt-5 d-flex">
                  <a type="button" className="btn primary-btn px-5 py-3 fw-bold text-white" href="#">Get Started</a>
                </div>
              </article>
            </div>
          </section>
        </div>
      </div>
    </section>


  )
}

export default WhyChooseUs;



{/* <div className="d-flex flex-column gap-4 align-items-center justify-content-center px-3">
        <section className="d-flex flex-column flex-md-row align-items-center justify-content-center gap-4">
          <div className="d-flex col-sm-7 col-md-5 col-lg-4 flex-column align-items-center">
            <svg width="48" height="48" fill="none" viewBox="0 0 48 48"><path fill="#531eba" fillRule="evenodd" d="M27 19h2v2h2v-2h2v2.126a4.002 4.002 0 012.063 6.447A4 4 0 0133 35v2h-2v-2h-2v2h-2v-2h-2v-2h2V23h-2v-2h2v-2zm2 14h4a2 2 0 100-4h-4v4zm0-6h3a2 2 0 100-4h-3v4z" clipRule="evenodd"></path><path fill="#531eba" fillRule="evenodd" d="M30 44c8.837 0 16-7.163 16-16s-7.163-16-16-16-16 7.163-16 16 7.163 16 16 16zm0 2c9.941 0 18-8.059 18-18s-8.059-18-18-18-18 8.059-18 18 8.059 18 18 18z" clipRule="evenodd"></path><path fill="#531eba" d="M4 8a2 2 0 012-2h20a2 2 0 012 2v18a2 2 0 01-2 2H6a2 2 0 01-2-2V8z" opacity="0.15"></path><path fill="var(--icons-bg-fill, #ffffff)" d="M1 5a2 2 0 012-2h20a2 2 0 012 2v18a2 2 0 01-2 2H3a2 2 0 01-2-2V5z"></path><path fill="#00A5EF" d="M25 6H6a2 2 0 00-2 2v17h21V6z" opacity="0.2"></path><path fill="var(--icons-primary, #0097db)" fillRule="evenodd" d="M0 5a3 3 0 013-3h20a3 3 0 013 3v18a3 3 0 01-3 3H3a3 3 0 01-3-3V5zm3-1a1 1 0 00-1 1v18a1 1 0 001 1h20a1 1 0 001-1V5a1 1 0 00-1-1H3z" clipRule="evenodd"></path><path fill="var(--icons-primary, #0097db)" d="M8 15a1 1 0 110-2h10a1 1 0 110 2H8z"></path><path fill="var(--icons-primary, #0097db)" fillRule="evenodd" d="M12.293 19.707a1 1 0 010-1.414L16.586 14l-4.293-4.293a1 1 0 011.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z" clipRule="evenodd"></path></svg>
            <div className="d-flex text-center flex-column gap-1">
              <h5 className="mb-0 fw-bold">Instant Alert</h5>
              <p className="mb-0">Complete your transaction in minutes with GiftCard.</p>
            </div>
          </div>
          <div className="d-flex col-sm-7 col-md-5 col-lg-4 flex-column align-items-center">
            <svg width="48" height="48" fill="none" viewBox="0 0 48 48"><path fill="#531eba" fillRule="evenodd" d="M27 19h2v2h2v-2h2v2.126a4.002 4.002 0 012.063 6.447A4 4 0 0133 35v2h-2v-2h-2v2h-2v-2h-2v-2h2V23h-2v-2h2v-2zm2 14h4a2 2 0 100-4h-4v4zm0-6h3a2 2 0 100-4h-3v4z" clipRule="evenodd"></path><path fill="#531eba" fillRule="evenodd" d="M30 44c8.837 0 16-7.163 16-16s-7.163-16-16-16-16 7.163-16 16 7.163 16 16 16zm0 2c9.941 0 18-8.059 18-18s-8.059-18-18-18-18 8.059-18 18 8.059 18 18 18z" clipRule="evenodd"></path><path fill="#531eba" d="M4 8a2 2 0 012-2h20a2 2 0 012 2v18a2 2 0 01-2 2H6a2 2 0 01-2-2V8z" opacity="0.15"></path><path fill="var(--icons-bg-fill, #ffffff)" d="M1 5a2 2 0 012-2h20a2 2 0 012 2v18a2 2 0 01-2 2H3a2 2 0 01-2-2V5z"></path><path fill="#00A5EF" d="M25 6H6a2 2 0 00-2 2v17h21V6z" opacity="0.2"></path><path fill="var(--icons-primary, #0097db)" fillRule="evenodd" d="M0 5a3 3 0 013-3h20a3 3 0 013 3v18a3 3 0 01-3 3H3a3 3 0 01-3-3V5zm3-1a1 1 0 00-1 1v18a1 1 0 001 1h20a1 1 0 001-1V5a1 1 0 00-1-1H3z" clipRule="evenodd"></path><path fill="var(--icons-primary, #0097db)" d="M8 15a1 1 0 110-2h10a1 1 0 110 2H8z"></path><path fill="var(--icons-primary, #0097db)" fillRule="evenodd" d="M12.293 19.707a1 1 0 010-1.414L16.586 14l-4.293-4.293a1 1 0 011.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z" clipRule="evenodd"></path></svg>
            <div className="d-flex text-center flex-column gap-1">
              <h5 className="mb-0 fw-bold">Best Rate</h5>
              <p className="mb-0">Exchange your gift cards at high rates and buy gift cards at low prices.</p>
            </div>
          </div>
        </section>
        <section className="d-flex flex-column flex-md-row align-items-center justify-content-center gap-4">
          <div className="d-flex col-sm-7 col-md-5 col-lg-4 flex-column align-items-center">
            <svg width="48" height="48" fill="none" viewBox="0 0 48 48"><path fill="#531eba" fillRule="evenodd" d="M27 19h2v2h2v-2h2v2.126a4.002 4.002 0 012.063 6.447A4 4 0 0133 35v2h-2v-2h-2v2h-2v-2h-2v-2h2V23h-2v-2h2v-2zm2 14h4a2 2 0 100-4h-4v4zm0-6h3a2 2 0 100-4h-3v4z" clipRule="evenodd"></path><path fill="#531eba" fillRule="evenodd" d="M30 44c8.837 0 16-7.163 16-16s-7.163-16-16-16-16 7.163-16 16 7.163 16 16 16zm0 2c9.941 0 18-8.059 18-18s-8.059-18-18-18-18 8.059-18 18 8.059 18 18 18z" clipRule="evenodd"></path><path fill="#531eba" d="M4 8a2 2 0 012-2h20a2 2 0 012 2v18a2 2 0 01-2 2H6a2 2 0 01-2-2V8z" opacity="0.15"></path><path fill="var(--icons-bg-fill, #ffffff)" d="M1 5a2 2 0 012-2h20a2 2 0 012 2v18a2 2 0 01-2 2H3a2 2 0 01-2-2V5z"></path><path fill="#00A5EF" d="M25 6H6a2 2 0 00-2 2v17h21V6z" opacity="0.2"></path><path fill="var(--icons-primary, #0097db)" fillRule="evenodd" d="M0 5a3 3 0 013-3h20a3 3 0 013 3v18a3 3 0 01-3 3H3a3 3 0 01-3-3V5zm3-1a1 1 0 00-1 1v18a1 1 0 001 1h20a1 1 0 001-1V5a1 1 0 00-1-1H3z" clipRule="evenodd"></path><path fill="var(--icons-primary, #0097db)" d="M8 15a1 1 0 110-2h10a1 1 0 110 2H8z"></path><path fill="var(--icons-primary, #0097db)" fillRule="evenodd" d="M12.293 19.707a1 1 0 010-1.414L16.586 14l-4.293-4.293a1 1 0 011.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z" clipRule="evenodd"></path></svg>
            <div className="d-flex text-center flex-column gap-1">
              <h5 className="mb-0 fw-bold">24/7 Support</h5>
              <p className="mb-0">We ensure you that we are here
                to help you at any time and every time.
              </p>
            </div>
          </div>
          <div className="d-flex col-sm-7 col-md-5 col-lg-4 flex-column align-items-center">
            <svg width="48" height="48" fill="none" viewBox="0 0 48 48"><path fill="#531eba" fillRule="evenodd" d="M27 19h2v2h2v-2h2v2.126a4.002 4.002 0 012.063 6.447A4 4 0 0133 35v2h-2v-2h-2v2h-2v-2h-2v-2h2V23h-2v-2h2v-2zm2 14h4a2 2 0 100-4h-4v4zm0-6h3a2 2 0 100-4h-3v4z" clipRule="evenodd"></path><path fill="#531eba" fillRule="evenodd" d="M30 44c8.837 0 16-7.163 16-16s-7.163-16-16-16-16 7.163-16 16 7.163 16 16 16zm0 2c9.941 0 18-8.059 18-18s-8.059-18-18-18-18 8.059-18 18 8.059 18 18 18z" clipRule="evenodd"></path><path fill="var(--icons-secondary, #454c59)" d="M4 8a2 2 0 012-2h20a2 2 0 012 2v18a2 2 0 01-2 2H6a2 2 0 01-2-2V8z" opacity="0.15"></path><path fill="var(--icons-bg-fill, #ffffff)" d="M1 5a2 2 0 012-2h20a2 2 0 012 2v18a2 2 0 01-2 2H3a2 2 0 01-2-2V5z"></path><path fill="#00A5EF" d="M25 6H6a2 2 0 00-2 2v17h21V6z" opacity="0.2"></path><path fill="var(--icons-primary, #0097db)" fillRule="evenodd" d="M0 5a3 3 0 013-3h20a3 3 0 013 3v18a3 3 0 01-3 3H3a3 3 0 01-3-3V5zm3-1a1 1 0 00-1 1v18a1 1 0 001 1h20a1 1 0 001-1V5a1 1 0 00-1-1H3z" clipRule="evenodd"></path><path fill="var(--icons-primary, #0097db)" d="M8 15a1 1 0 110-2h10a1 1 0 110 2H8z"></path><path fill="var(--icons-primary, #0097db)" fillRule="evenodd" d="M12.293 19.707a1 1 0 010-1.414L16.586 14l-4.293-4.293a1 1 0 011.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z" clipRule="evenodd"></path></svg>
            <div className="d-flex text-center flex-column gap-1">
              <h5 className="mb-0 fw-bold">Secure Transactions</h5>
              <p className="mb-0">We provide a secure trading experience.</p>
            </div>
          </div>
        </section>
      </div> */}