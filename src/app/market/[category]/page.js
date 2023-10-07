
import * as React from 'react';
import PublicLayout from "@/components/publicLayout";
import { getOffers} from '@/lib/prisma/offers';
import Link from 'next/link';
import authStyles from '../../auth/auth.module.css';
import formatAsCurrency from "@/services/formatAsCurrency";
import moment from 'moment';

const styles = {
  tableRow: {
      cursor: "pointer"
  }
}

const UserIcon = ()=>{
  return(
    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="currentColor" className="bi bi-person-circle" viewBox="0 0 16 16">
      <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
      <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z" />
    </svg>
  )
}

const OfferItem = ({index, user, cardName, valueInUSD, price, offerCategory, createdAt, showBorder=true }) => {
  return (
      <tr style={styles.tableRow} className={`${showBorder && "border-bottom"} gap-3 p-2 primary-text`}>
              <th scope="row" className='py-3 text-start'>{index}</th>
              <td className='text-start'>
                <div className='d-flex m-0 p-0'>
                  <p className='me-2'><UserIcon /></p>
                  <article className='d-flex flex-column'>
                    <span className='fw-bolder'>{user?.firstName} {user?.lastName} </span>
                    <span className='small'>{user?.username || user?.email}</span>
                  </article>
                  
                </div>
              </td>
              <td className="text-start">
                  <p className="m-0 p-0 fw-bold text-capitalize">
                     {offerCategory}
                  </p>
                  <p className='m-0 p-0'>
                      {offerCategory.toLowerCase() === "merchant" ? "Buying" : "Selling"}<strong> ${valueInUSD} {cardName.toUpperCase()}</strong> Giftcard for ₦{formatAsCurrency(price)}
                  </p>
                  <p className="m-0 p-0 ">{moment(createdAt).format("lll")}</p>
              </td>
              <td className="text-start mb-0">₦{formatAsCurrency(price)}</td>
              <td>
              <button className="btn app-primary-btn d-flex align-items-center px-3 rounded-2 m-0 p-0" disabled={false} type="button">
                Sell
              </button>
              </td>
      </tr>
  )
}


const Market = async ({params}) =>{

  const category = params.category;
  const {offers} = await getOffers({userId: null, user: true, offerCategory: category });
  console.log(offers)

  const listOffers = () => {
    return offers.map((offer, index) => <OfferItem
      key={offer.id}
      id={offer.id}
      user={offer.user}
      index={index + 1}
      cardName={offer.cardName}
      valueInUSD={offer.valueInUSD}
      offerCategory={offer.offerCategory}
      price={offer.price}
      createdAt={offer.createdAt}
      showBorder={index !== offers.length - 1}
    />
    )
  }

  return(
    <PublicLayout>
      <section className="container-fluid my-5">
        <div className="row">
          <div className="col col-md-10 offset-md-1 col-lg-8 offset-lg-2">
            <header>
              <h2 className={`${authStyles.pageTitle} text-capitalize mt-0`} style={{ textAlign: "left" }}>{category.toLowerCase().includes("merchant") ? "Merchant" : "Seller"} MarketPlace</h2>
            </header>

            {/* <div className='primary-bg d-flex flex-column gap-1 recent-transaction rounded-4 p-lg-3' style={styles.transactions}>
              {offers?.map((item, index) => {
                return <OfferItem key={item.id} user={item.user} cardName={item.cardName} valueInUSD={item.valueInUSD} price={item.price} offerCategory={item.offerCategory} date={item.createdAt} showBorder={index !== offers.length - 1} />
              })}
            </div> */}
            
            <section className='table-responsive mt-5 p-lg-3 primary-bg'>
              <table className="table table-hover table-borderless justify-content-start">
                <caption className='p-3'>Count: {offers.length}</caption>
                <thead className='border-bottom'>
                  <tr>
                    <th scope="col" className='py-3 text-start'>#</th>
                    <th scope="col" className='py-3 text-start'>User</th>
                    <th scope="col" className='py-3 text-start'>Offer Details</th>
                    <th scope="col" className='py-3 text-start'>Offer Price in ₦</th>
                    <th scope="col" className='py-3 text-start'>Actions</th>
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
        </div>
      </section>
    </PublicLayout>
  )
}

export default Market;