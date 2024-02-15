
import * as React from 'react';
import { getOffersForMarket } from '@/lib/prisma/offers';
import authStyles from '../../../auth/auth.module.css';
import formatAsCurrency from "@/services/formatAsCurrency";
import moment from 'moment';
import InsideLayout from "@/components/insideLayout";
import { getUserById } from '@/lib/prisma/users';
import AvatarClient from "@/components/avater";
import ActionButton from '../actionButton';
import FilterOffers from '../filterOffers';



const UserIcon = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="currentColor" className="bi bi-person-circle" viewBox="0 0 16 16">
      <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
      <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z" />
    </svg>
  )
}

const OfferItem = ({ index, user, cardName, cardType, rate, minRange, maxRange, valueInUSD, offerCategory, createdAt, showBorder = true, offer, userId }) => {
  return (
    <tr className={`${showBorder && "border-bottom"}`}>
      <th scope="row" className='text-start primary-text py-3'>{index}</th>
      <td className='text-start primary-text py-3'>
        <div className='d-flex m-0 p-0'>
          <div className='me-2'><AvatarClient /></div>
          <article className='d-flex flex-column'>
            <span className='fw-bolder'>{user?.firstName} {user?.lastName} </span>
            <span className='small'>{user?.username || user?.email}</span>
          </article>

        </div>
      </td>
      <td className="text-start primary-text py-3">
        <p className='m-0 p-0'>
          Offer to {offerCategory.toLowerCase() === "merchant" ? "buy" : "sell"}<strong> {cardName.toUpperCase()}</strong> Giftcard at the rate of ₦{formatAsCurrency(rate)} <br />
          {offerCategory === "merchant" ?
            <><span>Min: ${minRange}</span> &nbsp; <span>Max: ${maxRange}</span> </>:
            <>
              <span>Giftcard Value:</span> &nbsp; <strong>{valueInUSD}</strong>  
              <span className='ms-4'>Giftcard Type:</span> &nbsp; <strong className='text-capitalize'>{cardType}</strong> 
            </>
          }
        </p>
        <p className="m-0 p-0 "><strong>Posted:</strong> {moment(createdAt).format("lll")}</p>
      </td>
      <td className="text-start mb-0 primary-text py-3">₦{formatAsCurrency(rate)}</td>
      <td className="text-start mb-0 primary-text py-3">
        <ActionButton userId={userId} offer={offer} />
      </td>
    </tr>
  )
}

export const dynamic='force-dynamic';


const Market = async ({ params, searchParams }) => {
  const userId = searchParams?.userId;
  const {cardName, valueInUSD, rate, cardType, minRange, maxRange} = searchParams;
  const { user: userData } = await getUserById({ id: userId });
  const category = params.category;
  const getfilterData = () =>{

  }
  const { offers } = await getOffersForMarket({ userId: userId, user: true, offerCategory: category, filterData: {cardName, valueInUSD: parseInt(valueInUSD), rate: parseFloat(rate), cardType, minRange: parseInt(minRange), maxRange: parseInt(maxRange)} });
  console.log(offers)

  const listOffers = () => {
    return offers?.map((offer, index) => <OfferItem
      key={offer.id}
      id={offer.id}
      user={offer.user}
      index={index + 1}
      cardName={offer.cardName}
      cardType={offer.cardType}
      rate={offer.rate}
      offerCategory={offer.offerCategory}
      minRange={offer.minRange}
      maxRange={offer.maxRange}
      valueInUSD={offer?.valueInUSD}
      createdAt={offer.createdAt}
      showBorder={index !== offers.length - 1}
      offer={offer}
      userId={userId}
    />
    )
  }

  return (
    <InsideLayout activeLink={`marketplace/${category}`} userData={userData} userId={userId}>
      <div className='py-5 px-3 px-lg-5'>
        <header>
          <h2 className='mb-4'>{category.toLowerCase().includes("merchant") ? "Merchant" : "Seller"} MarketPlace</h2>
        </header>

        <div className='d-flex mb-2'>
          <button className='ms-auto btn btn-link border border-primary' data-bs-toggle="offcanvas" data-bs-target="#filterOffers"><i className="fa-solid fa-arrow-down-wide-short"></i></button>
        </div>
        <section className='table-responsive p-lg-3 primary-bg'>
          <table className="table table-hover table-borderless justify-content-start">
            <caption className='p-3'>Count: {offers?.length}</caption>
            <thead className='border-bottom'>
              <tr>
                <th scope="col" className='py-3 text-start primary-text'>#</th>
                <th scope="col" className='py-3 text-start text-capitalize primary-text'>{category}</th>
                <th scope="col" className='py-3 text-start primary-text'>Offer Details</th>
                <th scope="col" className='py-3 text-start primary-text'>Rate in ₦</th>
                <th scope="col" className='py-3 text-start primary-text'>Actions</th>
              </tr>
            </thead>
            <tbody>
              {listOffers()}
            </tbody>
          </table>
          <button className="btn app-primary-btn d-flex align-items-center px-5" disabled={false} type="button">
            {/* {isLoading ? <CircularProgress size={20} color="inherit" /> : "Load More Offers"} */}
          </button>
        </section>
      </div>

      <div className="offcanvas primary-bg offcanvas-end gap-1" data-bs-scroll="true" data-bs-backdrop="static" id="filterOffers">
        <FilterOffers userId={userId} offerCategory={category}  />
      </div>
    </InsideLayout>
  )
}

export default Market;