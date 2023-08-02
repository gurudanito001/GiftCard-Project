"use client"

import {useState} from 'react';
import { usePathname } from 'next/navigation';
import { Avatar } from '@mui/material';
import useDispatchMessage from '@/hooks/useDispatchMessage';
import { apiGet } from '@/services/apiService';
import { useQuery } from '@tanstack/react-query';
import extractIdFromUrl from "@/services/extractIdFromUrl";
import formatAsCurrency from "@/services/formatAsCurrency";
import { useSelector } from 'react-redux';


const styles ={
    container: {
        width: "clamp(350px, 100%, 900px)"
    }
}
const TransactionDetails = () =>{
    const pathname = usePathname();
    const dispatchMessage = useDispatchMessage();
    const {userData} = useSelector((state) => state.userData);
    const id = extractIdFromUrl(pathname, "/transactions/");
    console.log(id)

    const transactionDetailsQuery = useQuery({
        queryKey: ["allTransactions", id],
        queryFn: () => apiGet({ url: `/transactions/${id}` }).then((res) => res.data)
    })
    const getValue = (key) =>{
        const {data} = transactionDetailsQuery
        if(data){
            return data[key]
        }
        return ""
    }

    const senderReceiverData = (data) =>{
        console.log(data)
        if (data) {
            if (data.id === userData.id) {
                return "self"
            } else {
                return `${data.firstName} ${data.lastName}`
            }
        }
      }
    return(
        <div className='py-5 px-3 px-lg-5'>
            <header className='d-flex align-items-center mb-5'>
                <h2 className=''>Transaction Details</h2>
            </header>

            <section className='primary-bg p-3 p-lg-5'  style={styles.container}>
                

                <div className='row d-flex align-items-center mb-3'>
                    <h6 className='mb-0 fw-bold col-4 small'>Sender</h6>
                    <div className='mb-0 ms-3 col col-lg-6 d-flex align-items-center p-0 gap-2'>
                        <Avatar style={{width: "30px", height: "30px"}} /> <span>{senderReceiverData(transactionDetailsQuery?.data?.benefactor)}</span>
                    </div>
                </div>
                <div className='row d-flex align-items-center mb-3'>
                    <h6 className='mb-0 fw-bold col-4 small'>Receiver</h6>
                    <div className='mb-0 ms-3 col col-lg-6 d-flex align-items-center p-0 gap-2'>
                        <Avatar style={{width: "30px", height: "30px"}} /> <span>{senderReceiverData(transactionDetailsQuery?.data?.beneficiary)}</span>
                    </div>
                </div>
                <div className='row d-flex align-items-center mb-3'>
                    <h6 className='mb-0 fw-bold col-4 small'>Amount in ₦ </h6>
                    <p className='mb-0 ms-3 col col-lg-3'>{formatAsCurrency(getValue("amount"))}</p>
                </div>

                <div className='row d-flex align-items-center mb-3'>
                    <h6 className='mb-0 fw-bold col-4 small'>Type</h6>
                    <p className='mb-0 ms-3 col col-lg-3'>{getValue("type")}</p>
                </div>

                <div className='row d-flex align-items-center mb-3'>
                    <h6 className='mb-0 fw-bold col-4 small'>Category</h6>
                    <p className='mb-0 ms-3 col col-lg-3'>{getValue("category")}</p>
                </div>

                <div className='row d-flex align-items-center mb-3'>
                    <h6 className='mb-0 fw-bold col-4 small'>Status</h6>
                    <p className='mb-0 ms-3 col col-lg-3'>{getValue("status")}</p>
                </div>

                <div className='row d-flex align-items-center mb-3'>
                    <h6 className='mb-0 fw-bold col-4 small'>Date</h6>
                    <p className='mb-0 ms-3 col col-lg-3'>{new Date(getValue("createdAt")).toDateString()}</p>
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

export default TransactionDetails;