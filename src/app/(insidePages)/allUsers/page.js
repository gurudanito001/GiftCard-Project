


import * as React from 'react';
import { getUsers } from '@/lib/prisma/users';
import { getUserById } from '@/lib/prisma/users';
import InsideLayout from "@/components/insideLayout";
import Link from 'next/link';
import formatAsCurrency from '@/services/formatAsCurrency';

const styles = {
  tableRow: {
    cursor: "pointer"
  }
}



const TableItem = ({id, index, userId, firstName, lastName, avater, currentBal, email, username, date}) => {
  return (
    <tr style={styles.tableRow}>
      <th scope="row" className='py-3 text-start'>{index}</th>
      <th scope="row" className='py-3 text-start'>{firstName}</th>
      <th scope="row" className='py-3 text-start'>{lastName}</th>
      <td className='text-start primary-text py-3'>{email}</td>
      <td className='text-start primary-text py-3'>{username || "--"}</td>
      <td className='py-3 primary-text text-start'>{new Date(date).toDateString()}</td>
      <td className='py-3 text-start'>
        <Link className='text-decoration-none small secondary-text w-100 text-start' href={`/allUsers/${id}?userId=${userId}`}> View 
        <i className="fa-solid fa-angle-right ms-1" style={{fontSize: "11px"}}></i> </Link> 
      </td>
    </tr>
  )
}
export const dynamic='force-dynamic';

export default async function AllUsers({ searchParams }) {
  const userId = searchParams?.userId;
  const { user: userData } = await getUserById({id: userId});
  const {users} = await getUsers();

  return (
    <InsideLayout activeLink={`allUsers`} userData={userData} userId={userId}>
      <div className='py-5 px-3 px-lg-5'>
        <header className='d-flex align-items-center mb-5'>
          <h2 className=''>All Users</h2>
        </header>


        <section className='table-responsive mt-5 p-lg-3 primary-bg'>
          <table className="table table-hover table-borderless align-middle primary-bg">
            <thead className='border-bottom'>
              <tr>
                <th scope="col" className='py-3 text-start primary-text'>#</th>
                <th scope="col" className='py-3 text-start primary-text'>First name</th>
                <th scope="col" className='py-3 text-start primary-text'>Last name</th>
                <th scope="col" className='py-3 text-start primary-text'>Email</th>
                <th scope="col" className='py-3 text-start primary-text'>Username</th>
                <th scope="col" className='py-3 text-start primary-text'>Date Created</th>
                <th scope='col' className='py-3 text-start primary-text'>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users?.map((item, index) => {
                return <TableItem 
                  key={item.id} 
                  id={item.id} 
                  userId={userId}
                  index={index + 1}
                  firstName={item.firstName} 
                  lastName={item.lastName} 
                  avater={item?.avater}
                  email={item?.email}
                  username={item.username} 
                  date={item.createdAt} 
                />
              })}
            </tbody>
          </table>
        </section>
      </div>
    </InsideLayout>
  )
}
