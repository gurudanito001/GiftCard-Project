"use client"

import {useState} from 'react';
import { useRouter } from 'next/navigation';


const styles ={
    container: {
        width: "clamp(350px, 100%, 900px)"
    }
}
const TradeDetails = () =>{
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = (event) => {
        event.preventDefault();
        registerUser()
        console.log(formData)
    }
    return(
        <div className='py-5 px-3 px-lg-5'>
            <header className='d-flex align-items-center mb-5'>
                <h2 className=''>Escrow Details</h2>
            </header>

            <section className='primary-bg p-3 p-lg-5'  style={styles.container}>
                

                <div className='row d-flex align-items-center mb-3'>
                    <h6 className='mb-0 fw-bold col col-lg-3 small'>Amount in ₦ </h6>
                    <p className='mb-0 ms-3 col col-lg-3'>100 000</p>
                </div>

                <div className='row d-flex align-items-center mb-3'>
                    <h6 className='mb-0 fw-bold col col-lg-3 small'>Status</h6>
                    <p className='mb-0 ms-3 col col-lg-3'>PENDING</p>
                </div>

                <div className='row d-flex align-items-center mb-3'>
                    <h6 className='mb-0 fw-bold col col-lg-3 small'>Date</h6>
                    <p className='mb-0 ms-3 col col-lg-3'>{new Date().toDateString()}</p>
                </div>

                <div className="accordion accordion-flush" id="accordionFlushExample">
                    <div className="accordion-item">
                        <h2 className="accordion-header">
                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                                <h6 className='fw-bold'>Trade Details</h6>
                            </button>
                        </h2>
                        <div id="flush-collapseOne" className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                            <div className="accordion-body">Placeholder content for this accordion, which is intended to demonstrate the <code>.accordion-flush</code> className. This is the first items accordion body.</div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default TradeDetails;