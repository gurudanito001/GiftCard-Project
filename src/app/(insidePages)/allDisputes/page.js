


import * as React from 'react';
import { getAllDisputes } from '@/lib/prisma/dispute';
import { getUserById } from '@/lib/prisma/users';
import InsideLayout from "@/components/insideLayout";
import Link from 'next/link';
import formatAsCurrency from '@/services/formatAsCurrency';

const styles = {
  tableRow: {
    cursor: "pointer"
  }
}



const TableItem = ({id, index, userId, plaintiff, defendant, reason, mediaProofType, date}) => {
  return (
    <tr style={styles.tableRow}>
      <th scope="row" className='py-3 text-start'>{index}</th>
      <th scope="row" className='py-3 text-start'>{plaintiff}</th>
      <th scope="row" className='py-3 text-start'>{defendant}</th>
      <td className='text-start primary-text py-3'>{mediaProofType}</td>
      <th scope="row" className='py-3 text-start'>{reason}</th>
      
      <td className='text-start primary-text py-3'>{new Date(date).toDateString()}</td>
      <td className='py-3 text-start'>
        <Link className='text-decoration-none small secondary-text w-100 text-start' href={`/allDisputes/${id}?userId=${userId}`}> View 
        <i className="fa-solid fa-angle-right ms-1" style={{fontSize: "11px"}}></i> </Link> 
      </td>
    </tr>
  )
}
export const dynamic='force-dynamic';

export default async function AllDisputes({ searchParams }) {
  const userId = searchParams?.userId;
  const { user: userData } = await getUserById({id: userId});
  const {disputes} = await getAllDisputes();

  const deriveCaseParties = (data) =>{
    let parties = {plaintiff: "", defendant: ""};
    if(data?.trade?.buyerId === data?.userId){
      parties = {
        ...parties,
        plaintiff: `${data?.trade?.buyer?.firstName} ${data?.trade?.buyer?.lastName}`,
        defendant: `${data?.trade?.seller?.firstName} ${data?.trade?.seller?.lastName}`,
      }
    }else{
      parties = {
        ...parties,
        plaintiff: `${data?.trade?.seller?.firstName} ${data?.trade?.seller?.lastName}`,
        defendant: `${data?.trade?.buyer?.firstName} ${data?.trade?.buyer?.lastName}`,
      }
    }
    return parties
  }

  return (
    <InsideLayout activeLink={`allDisputes`} userData={userData} userId={userId}>
      <div className='py-5 px-3 px-lg-5'>
        <header className='d-flex align-items-center mb-5'>
          <h2 className=''>All Disputes</h2>
        </header>


        <section className='table-responsive mt-5 p-lg-3 primary-bg'>
          <table className="table table-hover table-borderless align-middle primary-bg">
            <thead className='border-bottom'>
              <tr>
                <th scope="col" className='py-3 text-start primary-text'>#</th>
                <th scope="col" className='py-3 text-start primary-text'>Plaintiff</th>
                <th scope="col" className='py-3 text-start primary-text'>Defendant</th>
                <td scope="col" className='py-3 text-start primary-text'>Media Proof Type</td>
                <td scope="col" className='py-3 text-start primary-text'>Reason</td>
                <td scope="col" className='py-3 text-start primary-text'>Date Created</td>
                <td scope='col' className='py-3 text-start primary-text'>Actions</td>
              </tr>
            </thead>
            <tbody>
              {disputes?.map((item, index) => {
                return <TableItem 
                  key={item.id} 
                  id={item.id} 
                  userId={userId}
                  index={index + 1}
                  plaintiff={`${deriveCaseParties(item).plaintiff}`}
                  defendant={`${deriveCaseParties(item).defendant}`}
                  mediaProofType={item?.mediaProofType}
                  reason={item?.reason}
                  date={item?.createdAt}
                />
              })}
            </tbody>
          </table>
        </section>
      </div>
    </InsideLayout>
  )
}
