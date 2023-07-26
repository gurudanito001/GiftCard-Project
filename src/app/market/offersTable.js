
"use client";

import {useState, useEffect} from 'react';
import { apiGet } from '@/services/apiService';
import useDispatchMessage from '@/hooks/useDispatchMessage';
import { useRouter } from 'next/navigation';
import formatAsCurrency from "@/services/formatAsCurrency";
import { useSelector } from 'react-redux';
import { CircularProgress } from '@mui/material';
import authStyles from '../auth/auth.module.css';

const styles = {
  tableRow: {
      cursor: "pointer"
  }
}
const OfferListItem = ({ id, index, user, cardName, offerCategory, price, valueInUSD, createdAt }) => {
    const router = useRouter();
    return (
        <tr style={styles.tableRow}>
            <th scope="row" className='py-3'>{index}</th>
            <td className='py-3 text-capitalize'>{user}</td>
            <td className='py-3'>{cardName}</td>
            <td className='py-3'>{formatAsCurrency(valueInUSD)}</td>
            <td className='py-3'>{formatAsCurrency(price)}</td>
            <td className='py-3'>{offerCategory}</td>
            <td className='py-3'>{new Date(createdAt).toDateString()}</td>
            <td scope='col'>
              <button className='btn highlight-btn'>{offerCategory === "merchant" ? "Sell" : "Buy"}</button>
            </td>
        </tr>
    )
}
const OffersTable = ({offerCategory}) => {
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
    }, [page])

    const fetchOffers = () => {
      setIsLoading(true)
      apiGet({ url: `/marketPlace?category=${offerCategory}&page=${page}&take=${2}` })
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
        return data.data.map((offer, index) => <OfferListItem
            key={offer.id}
            id={offer.id}
            user={`${offer.user.firstName[0]} ${offer.user.lastName}`}
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
        <div className='px-3 px-lg-5'>
            <header>
              <h2 className={`${authStyles.pageTitle} text-capitalize mt-0`} style={{textAlign: "left"}}>{offerCategory} MarketPlace</h2>
            </header>


            <section className='table-responsive mt-5 p-lg-3 primary-bg'>
                <table className="table table-hover table-borderless align-middle">
                    <caption className='p-3'>{data.data.length} of {data.count}</caption>
                    <thead className='border-bottom'>
                        <tr>
                            <th className='py-3' scope="col">#</th>
                            <th className='py-3' scope="col">User</th>
                            <th className='py-3' scope="col">Card Name</th>
                            <th className='py-3' scope="col">Value in $USD</th>
                            <th className='py-3' scope="col">Offer Price in ₦</th>
                            <th className='py-3' scope="col">Category</th>
                            <th className='py-3' scope="col">Date Created</th>
                            <th className='py-3' scope='col'>Action </th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.data.length > 0 && listOffers()}
                    </tbody>
                </table>
                <button className="btn app-primary-btn d-flex align-items-center px-5 mt-4" disabled={isLoading} type="button" onClick={setNextPage}>
                  {isLoading ? <CircularProgress size={20} color="inherit" /> : "Load More Offers"}
                </button>
            </section>
        </div>
    )
}

export default OffersTable;