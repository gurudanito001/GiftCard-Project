"use client"

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { CircularProgress } from '@mui/material';
import Image from 'next/image';

const styles = {
    container: {
        width: "clamp(100%, 100%, 900px)"
    },
    card: {
        minWidth: "300px",
        height: "170px",
        margin: "0px 25px, 25px 0px"
    }
}

const Card = (props) => {
    return (
        <li style={styles.card} className={`card p-4 d-flex flex-column ${props.default && "border-2 border-success"}`}>
            <p className='d-flex align-items-center'>
                <span>Daniel Nwokocha</span>
                {props.default && <i className="fa-solid fa-circle-check ms-auto" style={{ color: "#06650c" }}></i>}
            </p>
            <p className='fs-5 my-auto fw-bold' style={{ letterSpacing: "3px" }}>1019876549</p>
            <div className='d-flex align-items-center'>
                {!props.default &&
                    <div className="form-check form-check-inline">
                        <input className="form-check-input" type="checkbox" id="inlineCheckbox1" value="option1" />
                        <label className="form-check-label small" htmlFor="inlineCheckbox1">Set As Default</label>
                    </div>}
                <span className='small ms-auto'>Zenith Bank</span>
            </div>
        </li>
    )
}


const BankAccounts = () => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = (event) => {
        event.preventDefault();
        registerUser()
        console.log(formData)
    }
    return (
        <div className='py-5 px-3 px-lg-5'>
            <header className='d-flex align-items-center mb-5'>
                <h2 className='m-0'>Bank Accounts</h2>
                <button type="button" className="btn btn-link px-0 secondary-text fw-bold text-decoration-none d-flex align-items-center gap-1 ms-auto" data-bs-toggle="offcanvas" data-bs-target="#bankAccounts">
                    <Image className='img img-fluid' src="/images/plus-circle.svg" alt='plus-circle' width={20} height={20} />
                    Add Bank Account
                </button>
            </header>
            <section className='primary-bg p-3 p-lg-5 d-flex flex-wrap gap-3' style={styles.container}>
                <Card default={true} />
                <Card />
                <Card />
                <Card />
            </section>


            <div className="offcanvas primary-bg offcanvas-end gap-1" data-bs-scroll="true"
                id="bankAccounts">
                <div className="offcanvas-header py-5 px-4">
                    <h4 className="mb-0">Add Bank Account</h4>
                    <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close">
                    </button>
                </div>

                <form className="d-flex flex-column gap-3 px-4">
                    <div>
                        <label htmlFor="giftCardAmount" className="form-label mb-1">Bank Name</label>
                        <select className="form-select form-control form-control-sm primary-bg fs-6 py-3" aria-label="Default select example">
                            <option value="">Select Bank</option>
                            <option value="zenith">Zenith Bank</option>
                            <option value="uba">UBA Bank</option>
                            <option value="access">Access Bank</option>
                            <option value="polaris">Polaris Bank</option>
                            <option value="ecobank">EcoBank</option>
                            <option value="jaiz">Jaiz Bank</option>
                            <option value="parallex">Parallex MicroFinance Bank</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="accountNumber" className="form-label mb-1">Account Number</label>
                        <input type='text' className='form-control form-control-sm primary-bg fs-6 py-3' id='accountNumber' />
                    </div>
                    <div>
                        <label htmlFor="accountName" className="form-label mb-1">Account Name</label>
                        <input type='text' className='form-control form-control-sm primary-bg fs-6 py-3' id='accountNumber' />
                    </div>
                    <button className="btn app-primary-btn d-flex align-items-center justify-content-center px-5" disabled={isLoading} type="button" onClick={handleSubmit}>
                        {isLoading ? <CircularProgress size={20} color="inherit" /> : "Add Account"}
                    </button>
                </form>
            </div>
        </div>
    )
}

export default BankAccounts;