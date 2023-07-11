"use client"

import {useState} from 'react';
import { CircularProgress } from '@mui/material';
import Image from 'next/image';


const styles ={
    container: {
        width: "clamp(350px, 100%, 900px)"
    }
}
const OfferDetails = () =>{

    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = (event) => {
        event.preventDefault();
        registerUser()
        console.log(formData)
    }
    return(
        <div className='py-5 px-3 px-lg-5'>
            <header className='d-flex align-items-center mb-5'>
                <h2 className=''>Offer Details</h2>
                <button type="button" className="btn btn-link px-0 secondary-text fw-bold text-decoration-none d-flex align-items-center gap-1 ms-auto" data-bs-toggle="offcanvas" data-bs-target="#editOffer">
                    <Image className='img img-fluid' src="/images/plus-circle.svg" alt='plus-circle-icon' width={20} height={20} />
                    Edit Offer
                </button>
            </header>

            <section className='primary-bg p-3 p-lg-5'  style={styles.container}>
                <div className='row d-flex align-items-center mb-3'>
                    <h6 className='mb-0 fw-bold col col-lg-3 small'>Giftcard Name</h6>
                    <p className='mb-0 ms-3 col col-lg-3'>Amazon</p>
                </div>
                
                <div className='row d-flex align-items-center mb-3'>
                    <h6 className='mb-0 fw-bold col col-lg-3 small'>Value in USD$</h6>
                    <p className='mb-0 ms-3 col col-lg-3'>200</p>
                </div>

                <div className='row d-flex align-items-center mb-3'>
                    <h6 className='mb-0 fw-bold col col-lg-3 small'>Offer Price in ₦ </h6>
                    <p className='mb-0 ms-3 col col-lg-3'>100000</p>
                </div>

                <div className='row d-flex align-items-center mb-3'>
                    <h6 className='mb-0 fw-bold col col-lg-3 small'>Date Created</h6>
                    <p className='mb-0 ms-3 col col-lg-3'>{new Date().toDateString()}</p>
                </div>

                <div className='row d-flex align-items-center mb-3'>
                    <h6 className='mb-0 fw-bold col col-lg-3 small'>Last Updated</h6>
                    <p className='mb-0 ms-3 col col-lg-3'>{new Date().toDateString()}</p>
                </div>

                <div className="accordion accordion-flush" id="accordionFlushExample">
                    <div className="accordion-item">
                        <h2 className="accordion-header">
                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                                <h6 className='fw-bold'>Trades</h6>
                            </button>
                        </h2>
                        <div id="flush-collapseOne" className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                            <div className="accordion-body">Placeholder content for this accordion, which is intended to demonstrate the <code>.accordion-flush</code> className. This is the first items accordion body.</div>
                        </div>
                    </div>
                </div>
            </section>




            <div className="offcanvas primary-bg offcanvas-end gap-1" data-bs-scroll="true"
                id="editOffer">
                <div className="offcanvas-header py-5 px-4">
                    <h4 className="mb-0">Edit Offer</h4>
                    <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close">
                    </button>
                </div>

                <form className="d-flex flex-column gap-3 px-4">
                    <div>
                        <select className="form-select form-control form-control-sm primary-bg fs-6 py-3" aria-label="Default select example">
                            <option value="">Select Giftcard</option>
                            <option value="visa">Visa Giftcard</option>
                            <option value="vanilla">Vanilla Giftcard</option>
                            <option value="walmart">Walmart Giftcard</option>
                            <option value="target">Target Giftcard</option>
                            <option value="ebay">Ebay Giftcard</option>
                            <option value="amazon">Amazon Giftcard</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="giftCardAmount" className="form-label mb-1">Value in USD$</label>
                        <input type="text" className="form-control form-control-sm primary-bg fs-6 py-3" id="giftCardAmount" />
                    </div>
                    <div>
                        <label htmlFor="giftCardAmount" className="form-label mb-1">Offer Price in ₦</label>
                        <input type="text" className="form-control form-control-sm primary-bg fs-6 py-3" id="giftCardAmount" />
                    </div>
                    <button className="btn app-primary-btn d-flex align-items-center justify-content-center" disabled={isLoading} type="button" onClick={handleSubmit}>
                        {isLoading ? <CircularProgress size={20} color="inherit" /> : "Save"}
                    </button>
                </form>
            </div>
        </div>
    )
}

export default OfferDetails;