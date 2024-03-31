


import * as React from 'react';
import { getAllBankAccounts } from '@/lib/prisma/bankAccounts';
import { getUserById } from '@/lib/prisma/users';
import InsideLayout from "@/components/insideLayout";
import Link from 'next/link';
import formatAsCurrency from '@/services/formatAsCurrency';

const styles = {
  tableRow: {
    cursor: "pointer"
  }
}



const TableItem = ({id, index, userId, user, bankName, accountName, accountNumber}) => {
  return (
    <tr style={styles.tableRow}>
      <th scope="row" className='py-3 text-start'>{index}</th>
      <th scope="row" className='py-3 text-start'>{user}</th>
      <th scope="row" className='py-3 text-start'>{bankName}</th>
      <td className='text-start primary-text py-3'>{accountName}</td>
      <td className='text-start primary-text py-3'>{accountNumber}</td>
      {/* <td className='py-3 text-start'>
        <Link className='text-decoration-none small secondary-text w-100 text-start' href={`/allBankAccounts/${id}?userId=${userId}`}> View 
        <i className="fa-solid fa-angle-right ms-1" style={{fontSize: "11px"}}></i> </Link> 
      </td> */}
    </tr>
  )
}
export const dynamic='force-dynamic';

export default async function AllBankAccounts({ searchParams }) {
  const userId = searchParams?.userId;
  const { user: userData } = await getUserById({id: userId});
  const {bankAccounts} = await getAllBankAccounts();

  return (
    <InsideLayout activeLink={`allBankAccounts`} userData={userData} userId={userId}>
      <div className='py-5 px-3 px-lg-5'>
        <header className='d-flex align-items-center mb-5'>
          <h2 className=''>All Bank Accounts</h2>
        </header>


        <section className='table-responsive mt-5 p-lg-3 primary-bg'>
          <table className="table table-hover table-borderless align-middle primary-bg">
            <thead className='border-bottom'>
              <tr>
                <th scope="col" className='py-3 text-start primary-text'>#</th>
                <th scope="col" className='py-3 text-start primary-text'>User</th>
                <th scope="col" className='py-3 text-start primary-text'>Bank Name</th>
                <th scope="col" className='py-3 text-start primary-text'>Account Name</th>
                <th scope="col" className='py-3 text-start primary-text'>Account Number</th>
                {/* <th scope='col' className='py-3 text-start primary-text'>Actions</th> */}
              </tr>
            </thead>
            <tbody>
              {bankAccounts?.map((item, index) => {
                return <TableItem 
                  key={item.id} 
                  id={item.id} 
                  userId={userId}
                  index={index + 1}
                  user={`${item?.user?.firstName} ${item?.user?.lastName}`}
                  bankName={item?.bankName}
                  accountName={item?.accountName}
                  accountNumber={item?.accountNumber}
                />
              })}
            </tbody>
          </table>
        </section>
      </div>
    </InsideLayout>
  )
}
