import React from 'react';
import Image from 'next/image';
import WalletCard from './walletCard';
import InsideLayout from "@/components/insideLayout";
import { getUserById } from '@/lib/prisma/users';
import { getTransactions } from '@/lib/prisma/transactions';
import { getBankAccounts } from '@/lib/prisma/bankAccounts';
import { getOffers} from '@/lib/prisma/offers';
import { getActiveTrades} from '@/lib/prisma/trades';
import Link from 'next/link';
import moment from 'moment';
import formatAsCurrency from '@/services/formatAsCurrency';

const styles = {
    transactions: {
        width: "clamp(350px, 100%, 550px)",
    }
}

const CreditIcon = () =>{
    return <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#198754" className="bi bi-arrow-down-left-square-fill" viewBox="0 0 16 16">
    <path d="M2 16a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2zm8.096-10.803L6 9.293V6.525a.5.5 0 0 0-1 0V10.5a.5.5 0 0 0 .5.5h3.975a.5.5 0 0 0 0-1H6.707l4.096-4.096a.5.5 0 1 0-.707-.707z" />
</svg>
}

const DebitIcon = () =>{
    return <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#DC3545" className="bi bi-arrow-up-right-square-fill" viewBox="0 0 16 16">
    <path d="M14 0a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12zM5.904 10.803 10 6.707v2.768a.5.5 0 0 0 1 0V5.5a.5.5 0 0 0-.5-.5H6.525a.5.5 0 1 0 0 1h2.768l-4.096 4.096a.5.5 0 0 0 .707.707z"/>
  </svg>
}

const TransactionItem = ({category, amount, date, type, showBorder=true, beneficiaryId, userId }) => {
    return (
        <div className={`d-flex align-items-center primary-bg ${showBorder && "border-bottom"} gap-3 p-2`}>
            <div>
                {beneficiaryId === userId && type !== "DEBIT" ? <CreditIcon /> : <DebitIcon /> }
            </div>
            
            <div className="d-flex align-items-center w-100">
                <div className="d-flex flex-column">
                    <p className="m-0 p-0 fw-bold text-capitalize">
                       {category}
                    </p>
                    <small className="mb-0">{moment(date).format("lll")}</small>
                </div>
                <p className="mb-0 ms-auto">₦{formatAsCurrency(amount)}</p>
            </div>
        </div>
    )
}

const OfferItem = ({cardName, valueInUSD, price, offerCategory, date, showBorder=true, minRange, maxRange, rate }) => {
    return (
        <div className={`d-flex align-items-center primary-bg ${showBorder && "border-bottom"} gap-3 p-2`}>
            <div className="d-flex align-items-center w-100">
                <div className="d-flex flex-column">
                    <p className="m-0 p-0 fw-bold text-capitalize">
                       {offerCategory}
                    </p>
                    <p className='m-0 p-0'>
                        {offerCategory.toLowerCase() === "merchant" ? `Buying between $${minRange} and $${maxRange}` : `Selling $${valueInUSD}`}  <strong>{cardName.toUpperCase()}</strong> Giftcard at the rate of ₦{formatAsCurrency(rate)}
                    </p>
                    <small className="mb-0">{moment(date).format("lll")}</small>
                </div>
                {/* <p className="mb-0 ms-auto">₦{formatAsCurrency(price)}</p> */}
            </div>
        </div>
    )
}

const TradeItem = ({userId, tradeId, buyer, seller, status, date, valueInUSD, cardName, rate, showBorder }) => {
    const textColors = {
        "PENDING": "text-warning",
        "ACCEPTED": "text-success",
        "DISPUTED": "text-danger"
    }
    return (
        <div className={`d-flex align-items-center primary-bg ${showBorder && "border-bottom"} gap-3 p-2`}>
            <div>
                {status === "PENDING" && <div className="spinner-grow spinner-grow-sm text-warning" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div> }
                {status === "ACCEPTED" && <div className="spinner-grow spinner-grow-sm text-success" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div> }
                {status === "DISPUTED" && <div className="spinner-grow spinner-grow-sm text-danger" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div> }
            </div>
            
            <div className="d-flex align-items-center w-100">
                <div className="d-flex flex-column">
                    <p className="m-0 p-0 text-capitalize d-flex align-items-center">
                       <span className='fw-bold me-2'>{buyer?.id === userId ? "You" : `${buyer?.firstName} ${buyer?.lastName}`}</span>
                       <i className="fa-regular fa-handshake"></i>
                       <span className='fw-bold ms-2'>{seller?.id === userId ? "You" : `${seller?.firstName} ${seller?.lastName}`}</span> 
                    </p>
                    <p className="m-0 p-0">
                        {buyer?.id === userId ? "Buying" : "Selling"} ${valueInUSD} {cardName} @ ₦{formatAsCurrency(rate)} per $
                    </p>
                    <div>
                        <small className={`mb-0 text-uppercase fw-bold ${textColors[status]}`}>{status}</small>
                        <small className="mb-0 ms-3">{moment(date).format("lll")}</small>
                    </div>
                </div>
                <Link href={`/trades/${tradeId}?userId=${userId}`} className="d-flex align-items-center mb-0 ms-auto btn btn-link text-decoration-none">View &gt;</Link>
            </div>
        </div>
    )
    /* return (
        <div className={`d-flex flex-column primary-bg ${showBorder && "border-bottom"}  p-2`}>
            <div className='d-flex align-items-center'>
                <small className='mb-0 small fw-bold'>Buyer</small> <span className='ms-3'>{buyer?.firstName} {buyer?.lastName}</span></div>
            <div className='d-flex'><small className='mb-0'>Seller</small> <span className='ms-3'>{seller?.firstName} {seller?.lastName}</span></div>
            <div>
                <div className="spinner-grow text-success" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
                {status}
                <span>{moment(date).format("lll")}</span>
            </div>
        </div>
    ) */
}

export const dynamic='force-dynamic';

export default async function Dashboard({searchParams}) {
    const userId = searchParams?.userId;
    const {user: userData} = await getUserById({id: userId});
    const {transactions} = await getTransactions({userId});
    const {bankAccounts} = await getBankAccounts({userId});
    const {offers} = await getOffers({userId})
    const {trades} = await getActiveTrades({userId});
    console.log(userId, bankAccounts, trades, "<= activeTrades");
    return (
        <InsideLayout activeLink="dashboard" userData={userData} userId={userId}>
            <div className='py-5 px-3 px-lg-5'>
                <h2 className='mb-4'>Dashboard</h2>
                <WalletCard userData={userData} bankAccounts={bankAccounts}/>

                <section className='mt-5 row'>
                    <div className='col-12 col-md-6 mb-3'>
                        <div className="d-flex justify-content-between align-items-center mb-3" style={styles.transactions}>
                            <h5 className="mb-0 fw-bold fs-6">Recent Transactions</h5>
                            <Link className="text-decoration-none text-secondary small" href="/transactions">View all</Link>
                        </div>
                        <div className='primary-bg d-flex flex-column gap-1 recent-transaction rounded-4 p-lg-3' style={styles.transactions}>
                            {transactions?.map( (item, index) =>{
                                return <TransactionItem key={item.id} category={item.category} amount={item.amount} date={item.createdAt} type={item.type} showBorder={index !== transactions.length - 1} beneficiaryId={item?.beneficiaryId} userId={userId} />
                            })}
                        </div>
                    </div>

                    <div className='col-12 col-md-6 mb-3'>
                        <div className="d-flex justify-content-between align-items-center mb-3" style={styles.transactions}>
                            <h5 className="mb-0 fw-bold fs-6">Active Trades</h5>
                            <Link className="text-decoration-none text-secondary small" href="/trades">View All</Link>
                        </div>
                        <div className='primary-bg d-flex flex-column gap-1 recent-transaction rounded-4 p-lg-3' style={styles.transactions}>
                            {trades?.map((item, index) => {
                                return <TradeItem userId={userId} tradeId={item?.id} key={item.id} buyer={item.buyer} seller={item.seller} status={item.status} date={item.createdAt} valueInUSD={item?.valueInUSD} cardName={item?.cardName} rate={item?.rate} showBorder={index !== offers.length - 1}  />
                            })}
                        </div>
                    </div>
                </section>
            </div>
        </InsideLayout>


    )
}

