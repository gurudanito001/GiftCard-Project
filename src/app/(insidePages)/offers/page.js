
//import {useState, useEffect} from 'react';
//import { apiGet } from '@/services/apiService';
import Image from 'next/image';
//import { useMutation } from '@tanstack/react-query';
//import useDispatchMessage from '@/hooks/useDispatchMessage';
//import { useRouter } from 'next/navigation';
import formatAsCurrency from "@/services/formatAsCurrency";
import CreateOffer from "./createOffer"
//import { useSelector } from 'react-redux';
// import { CircularProgress } from '@mui/material';
import InsideLayout from "@/components/insideLayout";
import { getUserById } from '@/lib/prisma/users';
import { getOffers} from '@/lib/prisma/offers';
import Link from 'next/link';

const styles = {
  tableRow: {
      cursor: "pointer"
  }
}
const OfferListItem = ({userId, id, index, cardName, offerCategory, price, valueInUSD, createdAt }) => {
    /* const router = useRouter(); */
    return (
        <tr style={styles.tableRow}/*  onClick={() => router.push(`/offers/${id}`)} */>
          <th scope="row" className='py-3 primary-text text-start'>{index}</th>
          <td className='py-3 fw-bold text-uppercase text-start primary-text'>{cardName}</td>
          <td className='py-3 primary-text text-start'>{formatAsCurrency(valueInUSD)}</td>
          <td className='py-3 primary-text text-start'>{formatAsCurrency(price)}</td>
          <td className='py-3 text-uppercase primary-text text-start'>{offerCategory}</td>
          <td className='py-3 primary-text text-start'>{new Date(createdAt).toDateString()}</td>
          <td className='py-3 text-start'><Link className='text-decoration-none small secondary-text w-100 text-start' href={`/offers/${id}?userId=${userId}`}> View 
          <i className="fa-solid fa-angle-right ms-1" style={{fontSize: "11px"}}></i> </Link> </td>
        </tr>
        
    )
}

export const dynamic='force-dynamic';


const Offers = async ({searchParams}) => {
    const userId = searchParams?.userId;
    const {user: userData} = await getUserById({id: userId});
    const {offers} = await getOffers({userId})
    console.log("offers:", offers)
    
    const listOffers = () => {
        return offers.map((offer, index) => <OfferListItem
            key={offer.id}
            id={offer.id}
            userId={userId}
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
      <InsideLayout userData={userData} activeLink="offers" userId={userId}>
        <div className='py-5 px-3 px-lg-5'>
          <header className='d-flex align-items-center mb-5'>
            <h2 className=''>Your Offers</h2>
            <button type="button" className="btn btn-link px-0 secondary-text fw-bold text-decoration-none d-flex align-items-center gap-1 ms-auto" data-bs-toggle="offcanvas" data-bs-target="#offers">
              <Image className='img img-fluid' src="/images/plus-circle.svg" alt='plus-circle-icon' width={20} height={20} />
              Create Offer
            </button>
          </header>

          <section className='table-responsive mt-5 p-lg-3 primary-bg'>
            <table className="table table-hover table-borderless">
              {/* <caption className='p-3'>{data.data.length} of {data.count}</caption> */}
              <thead className='border-bottom'>
                <tr>
                  <th scope="col" className='py-3 primary-text text-start'>#</th>
                  <th scope="col" className='py-3 primary-text text-start'>Card Name</th>
                  <th scope="col" className='py-3 primary-text text-start'>Value in $USD</th>
                  <th scope="col" className='py-3 primary-text text-start'>Offer Price in ₦</th>
                  <th scope="col" className='py-3 primary-text text-start'>Category</th>
                  <th scope="col" className='py-3 primary-text text-start'>Date Created</th>
                  <th scope='col' className='py-3 primary-text text-start'>Actions</th>
                </tr>
              </thead>
              <tbody>
                {offers?.length > 0 && listOffers()}
              </tbody>
            </table>
            <button className="btn app-primary-btn d-flex align-items-center px-5" disabled={false} type="button">
              {/* {isLoading ? <CircularProgress size={20} color="inherit" /> : "Load More Offers"} */}
            </button>
          </section>


          <div className="offcanvas primary-bg offcanvas-end gap-1" data-bs-scroll="true" id="offers">
            <CreateOffer userId={userId} />
          </div>
        </div>
      </InsideLayout>
        
    )
}

export default Offers;