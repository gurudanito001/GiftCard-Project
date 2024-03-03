import React from 'react';
import Image from 'next/image';
import WalletCard from './walletCard';
import InsideLayout from "@/components/insideLayout";
import { getUserById } from '@/lib/prisma/users';
import { getTransactions } from '@/lib/prisma/transactions';
import { getBankAccounts } from '@/lib/prisma/bankAccounts';
import { getOffers} from '@/lib/prisma/offers';
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

export const dynamic='force-dynamic';

export default async function Dashboard({searchParams}) {
    const userId = searchParams?.userId;
    const {user: userData} = await getUserById({id: userId});
    const {transactions} = await getTransactions({userId});
    const {bankAccounts} = await getBankAccounts({userId});
    const {offers} = await getOffers({userId})
    console.log(userId, bankAccounts);
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
                            <h5 className="mb-0 fw-bold fs-6">Your Offers</h5>
                            <Link className="text-decoration-none text-secondary small" href="/transactions">View All</Link>
                        </div>
                        <div className='primary-bg d-flex flex-column gap-1 recent-transaction rounded-4 p-lg-3' style={styles.transactions}>
                            {offers?.map((item, index) => {
                                return <OfferItem key={item.id} cardName={item.cardName} valueInUSD={item.valueInUSD} price={item.price} offerCategory={item.offerCategory} date={item.createdAt} showBorder={index !== offers.length - 1} minRange={item?.minRange} maxRange={item?.maxRange} rate={item?.rate} />
                            })}
                        </div>
                    </div>
                </section>
            </div>
        </InsideLayout>


    )
}

