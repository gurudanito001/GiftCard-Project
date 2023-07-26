"use client"

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import AddBankAccount from './addBankAccount';
import { apiGet } from '@/services/apiService';
import { useState, useEffect, use } from "react";
import useDispatchMessage from "@/hooks/useDispatchMessage";

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

const Card = ({ defaultCard = false, accountNumber, accountName, bankName}) => {
    return (
        <li style={styles.card} className={`card p-4 d-flex flex-column ${defaultCard && "border-2 border-success"}`}>
            <p className='d-flex align-items-center'>
                <span>{accountName}</span>
                {defaultCard && <i className="fa-solid fa-circle-check ms-auto" style={{ color: "#06650c" }}></i>}
            </p>
            <p className='fs-5 my-auto fw-bold' style={{ letterSpacing: "3px" }}>{accountNumber}</p>
            <div className='d-flex align-items-center'>
                {!defaultCard &&
                    <div className="form-check form-check-inline">
                        <input className="form-check-input" type="checkbox" id="inlineCheckbox1" value="option1" />
                        <label className="form-check-label small" htmlFor="inlineCheckbox1">Set As Default</label>
                    </div>}
                <span className='small ms-auto'>{bankName}</span>
            </div>
        </li>
    )
}


const BankAccounts = () => {
    const router = useRouter();
    const [bankAccounts, setBankAccounts] = useState([])
    const [isLoading, setIsLoading] = useState(false);
    const dispatchMessage = useDispatchMessage();

    useEffect(() =>{
        fetchBankAccounts()
    },[])

    const fetchBankAccounts = () => {
        setIsLoading(true)
        apiGet({ url: `/bankAccounts` })
            .then(res => {
                setBankAccounts(res.data)
                dispatchMessage({ message: res.message })
                setIsLoading(false);
            })
            .catch(error => {
                console.log(error)
                setIsLoading(false);
                dispatchMessage({ severity: "error", message: error.message })
            })
    }

    const listBankAccounts = () =>{
        return bankAccounts.map( item =>{
            return <Card
                key={item.id}
                accountName={item.accountName}
                accountNumber={item.accountNumber}
                bankName={item.bankName}
              />
        })
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
                {listBankAccounts()}
            </section>


            <div className="offcanvas primary-bg offcanvas-end gap-1" data-bs-scroll="true"
                id="bankAccounts">
                <AddBankAccount refreshBankAccountList={fetchBankAccounts} />
            </div>
        </div>
    )
}

export default BankAccounts;