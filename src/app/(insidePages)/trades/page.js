
import * as React from 'react';
import { Avatar } from '@mui/material';
import { getAllTrades } from '@/lib/prisma/trades';
import { getUserById } from '@/lib/prisma/users';
import InsideLayout from "@/components/insideLayout";
import AvatarClient from '@/components/avater';
import formatAsCurrency from '@/services/formatAsCurrency';
import Link from 'next/link';

const styles = {
  tableRow: {
    cursor: "pointer"
  }
}



const TradeItem = ({id, buyer, seller, userId, cardName, valueInUSD, price, status, date}) => {
  return (
    <tr style={styles.tableRow}>
      <th scope="row" className='py-3 text-start'>1</th>
      <td className='text-start primary-text py-3'>
        <div className='d-flex m-0 p-0'>
          <article className='d-flex flex-column justify-content-center'>
            {buyer.id === userId ?
              <span>You</span> :
              <>
                <span className='fw-bolder'>{buyer?.firstName} {buyer?.lastName} </span>
                <span className='small'>{buyer?.username || buyer?.email}</span>
              </>
            }
          </article>
        </div>
      </td>
      <td className='text-start primary-text py-3'>
        <div className='d-flex m-0 p-0'>
          <article className='d-flex flex-column justify-content-center'>
            {seller.id === userId ?
              <span>You</span> :
              <>
                <span className='fw-bolder'>{seller?.firstName} {seller?.lastName} </span>
                <span className='small'>{seller?.username || seller?.email}</span>
              </>
            }
          </article>
        </div>
      </td>
      <td className='py-3 text-start primary-text'>{`$${valueInUSD} ${cardName.toUpperCase()}`}</td>
      <td className='py-3 primary-text text-start'>₦{formatAsCurrency(price)}</td>
      <td className='py-3 text-uppercase primary-text text-start'>{status}</td>
      <td className='py-3 primary-text text-start'>{new Date(date).toDateString()}</td>
      <td className='py-3 text-start'><Link className='text-decoration-none small secondary-text w-100 text-start' href={`/trades/${id}?userId=${userId}`}> View 
      <i className="fa-solid fa-angle-right ms-1" style={{fontSize: "11px"}}></i> </Link> </td>
    </tr>
  )
}
export const dynamic='force-dynamic';

export default async function Trades({ searchParams }) {
  const userId = searchParams?.userId;
  const { user: userData } = await getUserById({id: userId});
  const { trades } = await getAllTrades({userId})

  return (
    <InsideLayout activeLink={`trades`} userData={userData} userId={userId}>
      <div className='py-5 px-3 px-lg-5'>
        <header className='d-flex align-items-center mb-5'>
          <h2 className=''>Your Trades</h2>
        </header>


        <section className='table-responsive mt-5 p-lg-3 primary-bg'>
          <table className="table table-hover table-borderless align-middle primary-bg">
            <thead className='border-bottom'>
              <tr>
                <th scope="col" className='py-3 text-start primary-text'>#</th>
                <th scope="col" className='py-3 text-start primary-text'>Buyer</th>
                <th scope="col" className='py-3 text-start primary-text'>Seller</th>
                <th scope="col" className='py-3 text-start primary-text'>Card Name</th>
                <th scope="col" className='py-3 text-start primary-text'>Offer Price</th>
                <th scope="col" className='py-3 text-start primary-text'>Status</th>
                <th scope="col" className='py-3 text-start primary-text'>Date Created</th>
                <th scope='col' className='py-3 text-start primary-text'>Actions</th>
              </tr>
            </thead>
            <tbody>
              {trades?.map((item, index) => {
                return <TradeItem key={item.id} id={item.id} buyer={item.buyer} seller={item.seller} userId={userId} cardName={item.cardName} valueInUSD={item.valueInUSD} price={item.price} status={item.status} date={item.createdAt} />
              })}
            </tbody>
          </table>
        </section>
      </div>
    </InsideLayout>
    
  )
}
