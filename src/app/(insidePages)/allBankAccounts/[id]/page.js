
import Image from 'next/image';
import formatAsCurrency from "@/services/formatAsCurrency";
import { getUserById } from '@/lib/prisma/users';
import InsideLayout from "@/components/insideLayout";

const styles = {
  container: {
    width: "clamp(350px, 100%, 900px)"
  }
}

export const dynamic = 'force-dynamic';

const Userdetails = async ({ params, searchParams }) => {
  const userId = searchParams?.userId;
  const {user: userDetails} = await getUserById({id: params.id});
  const { user: userData } = await getUserById({ id: userId });


  return (
    <InsideLayout activeLink="users" userData={userData} userId={userId}>
      <div className='py-5 px-3 px-lg-5'>
        <header className='d-flex align-items-center mb-5'>
          <h2 className=''>User Details</h2>
        </header>

        <section className='primary-bg p-3 p-lg-5' style={styles.container}>
          <div className='row d-flex align-items-center mb-3'>
            <h6 className='mb-0 fw-bold col col-lg-3 small'>First Name</h6>
            <p className='mb-0 ms-3 col col-lg-3 text-uppercase fw-bold'>{userDetails?.firstName}</p>
          </div>

          <div className='row d-flex align-items-center mb-3'>
            <h6 className='mb-0 fw-bold col col-lg-3 small'>Last Name</h6>
            <p className='mb-0 ms-3 col col-lg-3 text-uppercase fw-bold'>{userDetails?.lastName}</p>
          </div>

          <div className='row d-flex align-items-center mb-3'>
            <h6 className='mb-0 fw-bold col col-lg-3 small'>Email</h6>
            <p className='mb-0 ms-3 col col-lg-3 text-uppercase fw-bold'>{userDetails?.email}</p>
          </div>

          <div className='row d-flex align-items-center mb-3'>
            <h6 className='mb-0 fw-bold col col-lg-3 small'>Username</h6>
            <p className='mb-0 ms-3 col col-lg-3 text-uppercase fw-bold'>{userDetails?.username}</p>
          </div>

          <div className='row d-flex align-items-center mb-3'>
            <h6 className='mb-0 fw-bold col col-lg-3 small'>Current Balance</h6>
            <p className='mb-0 ms-3 col col-lg-3 text-uppercase fw-bold'> ₦{formatAsCurrency(userDetails?.wallet?.currentBalance)}</p>
          </div>

          <div className='row d-flex align-items-center mb-3'>
            <h6 className='mb-0 fw-bold col col-lg-3 small'>Available Balance</h6>
            <p className='mb-0 ms-3 col col-lg-3 text-uppercase fw-bold'> ₦{formatAsCurrency(userDetails?.wallet?.availableBalance)}</p>
          </div>

          <div className='row d-flex align-items-center mb-3'>
            <h6 className='mb-0 fw-bold col col-lg-3 small'>Date Created</h6>
            <p className='mb-0 ms-3 col col-lg-3'>{new Date(userDetails?.createdAt).toDateString()}</p>
          </div>

          <div className='row d-flex align-items-center mb-3'>
            <h6 className='mb-0 fw-bold col col-lg-3 small'>Last Updated</h6>
            <p className='mb-0 ms-3 col col-lg-3'>{new Date(userDetails?.updatedAt).toDateString()}</p>
          </div>
        </section>
      </div>
    </InsideLayout>
  )
}

export default Userdetails;