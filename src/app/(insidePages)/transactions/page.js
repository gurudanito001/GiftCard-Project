"use client";

import * as React from 'react';
import { apiGet } from '@/services/apiService';
import Image from 'next/image';
import { useQuery } from '@tanstack/react-query';
import useDispatchMessage from '@/hooks/useDispatchMessage';
import { useRouter } from 'next/navigation';
import formatAsCurrency from "@/services/formatAsCurrency";
import { useSelector } from 'react-redux';
import { Avatar } from '@mui/material';
import {CircularProgress} from '@mui/material';
import { useState, useEffect } from 'react';


const styles = {
    tableRow: {
        cursor: "pointer"
    }
}
const TransactionListItem = ({ id, index, benefactor, beneficiary,  amount, type, category, status, createdAt }) => {
  const router = useRouter();
  const {userData} = useSelector((state) => state.userData);

  const senderReceiverData = (data) =>{
    console.log(data, userData)
    if(data.id === userData.id){
      return "self"
    }else{
      return `${data.firstName} ${data.lastName}`
    }
  }
  return (
    <tr style={styles.tableRow} onClick={() => router.push(`/transactions/${id}`)}>
      <th scope="row" className='py-3'>{index}</th>
      <td className='py-3'>
        <div className='d-flex align-items-center justify-content-center gap-2'>
          <Avatar style={{width: "30px", height: "30px"}} /> <span>{senderReceiverData(beneficiary)}</span>
        </div>
      </td>
      <td className='py-3'>
        <div className='d-flex align-items-center justify-content-center gap-2'>
          <Avatar style={{width: "30px", height: "30px"}} /> <span>{senderReceiverData(benefactor)}</span>
        </div>
      </td>
      <td className='py-3'>{formatAsCurrency(amount)}</td>
      <td className='py-3'>{type}</td>
      <td className='py-3'>{category}</td>
      <td className='py-3'>{status}</td>
      <td className='py-3'>{new Date(createdAt).toDateString()}</td>
      <td scope='col'><i className="fa-solid fa-angle-right ms-auto"></i>  </td>
    </tr>
  )
}


const Transactions = ({ }) => {
    
    const dispatchMessage = useDispatchMessage();

    const [data, setData] = useState({
      page: 0,
      take: 2,
      count: "",
      data: []
    })
    const [isLoading, setIsLoading] = useState(false)
    const [page, setPage] = useState(1)
    

    const {userData} = useSelector((state) => state.userData);

    useEffect(()=>{
      fetchTransactions()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userData, page])

    const fetchTransactions = () => {
      if(userData.id){
        setIsLoading(true)
        apiGet({ url: `/transactions?userId=${userData.id}&page=${page}&take=${2}` })
          .then((res) => {
            console.log(res)
            dispatchMessage({ message: res.message })
            setTransactionsState(res)
            setIsLoading(false)
          })
          .catch(error => {
            console.log(error.message)
            dispatchMessage({ severity: "error", message: error.message })
            setIsLoading(false)
          })
      }
    }

    const setTransactionsState = (res) =>{
      if(res.page === data.page + 1 && res.data.length !== 0){
        setData(prevState => ({
          page: res.page,
          take: res.take,
          count: res.transactionsCount,
          data: [...prevState.data, ...res.data]
        }))
      }
    }
    const setNextPage = () =>{
      console.log(data, page)
      setPage( prevState => prevState + 1)
    }

    const listTransactions = () => {
        return data.data.map((transaction, index) => <TransactionListItem
            key={transaction.id}
            id={transaction.id}
            index={index + 1}
            benefactor={transaction.benefactor}
            beneficiary={transaction.beneficiary}
            amount={transaction.amount}
            type={transaction.type}
            category={transaction.category}
            status={transaction.status}
            createdAt={transaction.createdAt}
        />
        )
    }
    return (
        <div className='py-5 px-3 px-lg-5'>
            <header className='d-flex align-items-center mb-5'>
                <h2 className=''>Your Transactions</h2>
            </header>


            <section className='table-responsive mt-5 p-lg-3 primary-bg'>
                <table className="table table-hover table-borderless align-middle">
                  <caption className='p-3'>{data.data.length} of {data.count}</caption>
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Receiver</th>
                      <th scope="col">Sender</th>
                      <th scope="col">Amount in ₦</th>
                      <th scope="col">Type</th>
                      <th scope="col">Category</th>
                      <th scope="col">Status</th>
                      <th scope="col">Created At</th>
                      <th scope='col'><i className="fa-solid fa-angle-right ms-auto invisible"></i>  </th>
                    </tr>
                  </thead>
                  <tbody>
                        {data.data.length > 0 && listTransactions()}
                    </tbody>
                </table>
                <button className="btn app-primary-btn d-flex align-items-center px-5" disabled={isLoading} type="button" onClick={setNextPage}>
                  {isLoading ? <CircularProgress size={20} color="inherit" /> : "Load More Transactions"}
                </button>
            </section>

        </div>
    )
}

export default Transactions;