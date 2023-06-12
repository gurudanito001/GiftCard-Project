

const Testimonials = () => {

  return (
    <section className="testimonial-bg">
      <div className="d-flex flex-column align-items-center gap-4 section container">
        <h2 className="mb-0 text-center text-sm-start fw-bold">What Our Customers Says</h2>
        <div className="d-flex justify-content-center gap-2">
          <div className="col-10 col-sm-5 col-lg-4 card px-3 gap-1 py-3">
              <h5 className="mb-0 fw-bold secondary-text">MaineBitcoin</h5>
              <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card
                content.
              </p>
          </div>

          <div className="col-sm-5 col-lg-4 d-none d-sm-block card px-3 gap-1 py-3">
            <h5 className="mb-0 fw-bold secondary-text">MaineBitcoin</h5>
            <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card
              content.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Testimonials