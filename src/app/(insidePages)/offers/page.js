"use client";

import {useState, useEffect} from 'react';
import { apiGet } from '@/services/apiService';
import Image from 'next/image';
import { useMutation } from '@tanstack/react-query';
import useDispatchMessage from '@/hooks/useDispatchMessage';
import { useRouter } from 'next/navigation';
import formatAsCurrency from "@/services/formatAsCurrency";
import CreateOffer from "./createOffer"
import { useSelector } from 'react-redux';
import { CircularProgress } from '@mui/material';

const styles = {
  tableRow: {
      cursor: "pointer"
  }
}
const OfferListItem = ({ id, index, cardName, offerCategory, price, valueInUSD, createdAt }) => {
    const router = useRouter();
    return (
        <tr style={styles.tableRow} onClick={() => router.push(`/offers/${id}`)}>
            <th scope="row" className='py-3'>{index}</th>
            <td className='py-3'>{cardName}</td>
            <td className='py-3'>{formatAsCurrency(valueInUSD)}</td>
            <td className='py-3'>{formatAsCurrency(price)}</td>
            <td className='py-3'>{offerCategory}</td>
            <td className='py-3'>{new Date(createdAt).toDateString()}</td>
            <td scope='col'><i className="fa-solid fa-angle-right ms-auto"></i>  </td>
        </tr>
    )
}
const Offers = ({}) => {
    const [data, setData] = useState({
      page: 0,
      take: 2,
      count: "",
      data: []
    })
    const [isLoading, setIsLoading] = useState(false)
    const [page, setPage] = useState(1)
    

    const dispatchMessage = useDispatchMessage();
    const {userData} = useSelector((state) => state.userData);

    useEffect(()=>{
        fetchOffers()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userData, page])

    const fetchOffers = () => {
      if(userData.id){
        setIsLoading(true)
        apiGet({ url: `/offers?userId=${userData.id}&page=${page}&take=${2}` })
          .then((res) => {
            console.log(res)
            dispatchMessage({ message: res.message })
            setOffersState(res)
            setIsLoading(false)
          })
          .catch(error => {
            console.log(error.message)
            dispatchMessage({ severity: "error", message: error.message })
            setIsLoading(false)
          })
      }
    }

    const setOffersState = (res) =>{
      if(res.page === data.page + 1 && res.data.length !== 0){
        setData(prevState => ({
          page: res.page,
          take: res.take,
          count: res.offersCount,
          data: [...prevState.data, ...res.data]
        }))
      }
    }
    const setNextPage = () =>{
      console.log(data, page)
      setPage( prevState => prevState + 1)
    }

    const listOffers = () => {
        console.log(userData.id)
        return data.data.map((offer, index) => <OfferListItem
            key={offer.id}
            id={offer.id}
            index={index + 1}
            cardName={offer.cardName}
            valueInUSD={offer.valueInUSD}
            offerCategory={offer.offerCategory}
            price={offer.price}
            createdAt={offer.createdAt}
        />
        )
    }
    return (
        <div className='py-5 px-3 px-lg-5'>
            <header className='d-flex align-items-center mb-5'>
                <h2 className=''>Your Offers</h2>
                <button type="button" className="btn btn-link px-0 secondary-text fw-bold text-decoration-none d-flex align-items-center gap-1 ms-auto" data-bs-toggle="offcanvas" data-bs-target="#offers">
                    <Image className='img img-fluid' src="/images/plus-circle.svg" alt='plus-circle-icon' width={20} height={20} />
                    Create Offer
                </button>
            </header>


            <section className='table-responsive mt-5 p-lg-3 primary-bg'>
                <table className="table table-hover table-borderless align-middle">
                    <caption className='p-3'>{data.data.length} of {data.count}</caption>
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Card Name</th>
                            <th scope="col">Value in $USD</th>
                            <th scope="col">Offer Price in ₦</th>
                            <th scope="col">Category</th>
                            <th scope="col">Date Created</th>
                            <th scope='col'><i className="fa-solid fa-angle-right ms-auto invisible"></i>  </th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.data.length > 0 && listOffers()}
                    </tbody>
                </table>
                <button className="btn app-primary-btn d-flex align-items-center px-5" disabled={isLoading} type="button" onClick={setNextPage}>
                  {isLoading ? <CircularProgress size={20} color="inherit" /> : "Load More Offers"}
                </button>
            </section>


            <div className="offcanvas primary-bg offcanvas-end gap-1" data-bs-scroll="true"
                id="offers">
                <CreateOffer />
            </div>
        </div>
    )
}

export default Offers;