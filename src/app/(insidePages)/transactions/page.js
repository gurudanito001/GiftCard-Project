import * as React from 'react';
import formatAsCurrency from "@/services/formatAsCurrency";
import { getUserById } from '@/lib/prisma/users';
import { getTransactions } from '@/lib/prisma/transactions';
import InsideLayout from "@/components/insideLayout";
import Link from 'next/link';


const styles = {
    tableRow: {
        cursor: "pointer"
    }
}

const CreditIcon = () =>{
  return <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#198754" className="bi bi-arrow-down-left-square-fill ms-1" viewBox="0 0 16 16">
  <path d="M2 16a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2zm8.096-10.803L6 9.293V6.525a.5.5 0 0 0-1 0V10.5a.5.5 0 0 0 .5.5h3.975a.5.5 0 0 0 0-1H6.707l4.096-4.096a.5.5 0 1 0-.707-.707z" />
</svg>
}

const DebitIcon = () =>{
  return <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#DC3545" className="bi bi-arrow-up-right-square-fill ms-1" viewBox="0 0 16 16">
  <path d="M14 0a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12zM5.904 10.803 10 6.707v2.768a.5.5 0 0 0 1 0V5.5a.5.5 0 0 0-.5-.5H6.525a.5.5 0 1 0 0 1h2.768l-4.096 4.096a.5.5 0 0 0 .707.707z"/>
</svg>
}

const TransactionListItem = ({ id, userId, index, benefactor, beneficiary,  amount, type, category, status, createdAt }) => {

  const senderReceiverData = (data) =>{
    if(data?.id === userId){
      return "self"
    }else{
      return `${data.firstName} ${data.lastName}`
    }
  }
  return (
    <tr style={styles.tableRow}>
      <th scope="row" className='py-3 text-start primary-text'>
        {index}
        
      </th>
      <td className='py-3 text-start primary-text text-capitalize'>
          <span>{senderReceiverData(beneficiary)}</span>
      </td>
      <td className='py-3 text-start primary-text text-capitalize'>
          <span>{senderReceiverData(benefactor)}</span>
      </td>
      <td className='py-3 text-start primary-text'>{formatAsCurrency(amount)}</td>
      <td className='py-3 text-start primary-text'>{type} {type === "CREDIT" ? <CreditIcon /> : <DebitIcon /> }</td>
      <td className='py-3 text-start primary-text text-capitalize'>{category}</td>
      <td className='py-3 text-start primary-text'>{status}</td>
      <td className='py-3 text-start primary-text'>{new Date(createdAt).toDateString()}</td>
      <td className='py-3 text-start primary-text'><Link className='text-decoration-none small secondary-text w-100' href={`/transactions/${id}?userId=${userId}`}> View
        <i className="fa-solid fa-angle-right ms-1" style={{ fontSize: "11px" }}></i> </Link> </td>
    </tr>
  )
}

const Transactions = async ({ searchParams }) => {
  const userId = searchParams?.userId;
  const {user: userData} = await getUserById({id: userId});
  const {transactions} = await getTransactions({userId});
    
   
    const listTransactions = () => {
        return transactions.map((transaction, index) => <TransactionListItem
            key={transaction.id}
            id={transaction.id}
            userId={userId}
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
      <InsideLayout activeLink="transactions" userData={userData} userId={userId}>
        <div className='py-5 px-3 px-lg-5'>
          <header className='d-flex align-items-center mb-5'>
            <h2 className=''>Your Transactions</h2>
          </header>


          <section className='table-responsive mt-5 p-lg-3 primary-bg'>
            <table className="table table-hover table-borderless align-middle">
              {/* <caption className='p-3'>{data.data.length} of {data.count}</caption> */}
              <thead className='border-bottom'>
                <tr>
                  <th scope="col" className='py-3 text-start primary-text'>#</th>
                  <th scope="col" className='py-3 text-start primary-text'>Receiver</th>
                  <th scope="col" className='py-3 text-start primary-text'>Sender</th>
                  <th scope="col" className='py-3 text-start primary-text'>Amount in ₦</th>
                  <th scope="col" className='py-3 text-start primary-text'>Type</th>
                  <th scope="col" className='py-3 text-start primary-text'>Category</th>
                  <th scope="col" className='py-3 text-start primary-text'>Status</th>
                  <th scope="col" className='py-3 text-start primary-text'>Date</th>
                  <th scope='col' className='py-3 text-start primary-text'>Actions</th>
                </tr>
              </thead>
              <tbody>
                {listTransactions()}
              </tbody>
            </table>
            <button className="btn app-primary-btn d-flex align-items-center px-5" type="button">
              {/* {isLoading ? <CircularProgress size={20} color="inherit" /> : "Load More Transactions"} */}
            </button>
          </section>

        </div>
      </InsideLayout>
    )
}

export default Transactions;