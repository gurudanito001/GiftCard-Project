
import Image from 'next/image';
import formatAsCurrency from "@/services/formatAsCurrency";
import { getUserById } from '@/lib/prisma/users';
import { getDisputeById } from '@/lib/prisma/dispute';
import InsideLayout from "@/components/insideLayout";

const styles = {
  container: {
    width: "clamp(350px, 100%, 900px)"
  }
}

export const dynamic = 'force-dynamic';

const DisputeDetails = async ({ params, searchParams }) => {
  const userId = searchParams?.userId;
  const {dispute} = await getDisputeById({id: params.id});
  const { user: userData } = await getUserById({ id: userId });

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
    <InsideLayout activeLink="allDisputes" userData={userData} userId={userId}>
      <div className='py-5 px-3 px-lg-5'>
        <header className='d-flex align-items-center mb-5'>
          <h2 className=''>Dispute Details</h2>
        </header>

        <section className='primary-bg p-3 p-lg-5' style={styles.container}>
          <div className='row d-flex align-items-center mb-3'>
            <h6 className='mb-0 fw-bold col col-lg-3 small'>Plaintiff</h6>
            <p className='mb-0 ms-3 col col-lg-3 text-uppercase fw-bold'>{`${deriveCaseParties(dispute).plaintiff}`}</p>
          </div>

          <div className='row d-flex align-items-center mb-3'>
            <h6 className='mb-0 fw-bold col col-lg-3 small'>Defendant</h6>
            <p className='mb-0 ms-3 col col-lg-3 text-uppercase fw-bold'>{`${deriveCaseParties(dispute).defendant}`}</p>
          </div>

          <div className='row d-flex align-items-center mb-3'>
            <h6 className='mb-0 fw-bold col col-lg-3 small'>Media Proof Type</h6>
            <p className='mb-0 ms-3 col col-lg-3 text-uppercase fw-bold'>{dispute?.mediaProofType}</p>
          </div>

          <div className='row d-flex align-items-center mb-3'>
            <h6 className='mb-0 fw-bold col col-lg-3 small'>Reason</h6>
            <p className='mb-0 ms-3 col col-lg-3 text-uppercase fw-bold'>{dispute?.reason}</p>
          </div>




          <div className='mt-4 mb-3'>
            <h5 className='mb-0'>Trade Details</h5>
            <hr />
          </div>
          <div className='row d-flex align-items-center mb-3'>
            <h6 className='mb-0 fw-bold col col-lg-3 small'>Buyer</h6>
            <p className='mb-0 ms-3 col col-lg-3 text-uppercase fw-bold'> {dispute?.trade?.buyer?.firstName} {dispute?.trade?.buyer?.lastName}</p>
          </div>
          <div className='row d-flex align-items-center mb-3'>
            <h6 className='mb-0 fw-bold col col-lg-3 small'>Seller</h6>
            <p className='mb-0 ms-3 col col-lg-3 text-uppercase fw-bold'> {dispute?.trade?.seller?.firstName} {dispute?.trade?.seller?.lastName}</p>
          </div>
          <div className='row d-flex align-items-center mb-3'>
            <h6 className='mb-0 fw-bold col col-lg-3 small'>Card Name</h6>
            <p className='mb-0 ms-3 col col-lg-3 text-uppercase fw-bold'> {dispute?.trade?.cardName} </p>
          </div>

          <div className='row d-flex align-items-center mb-3'>
            <h6 className='mb-0 fw-bold col col-lg-3 small'>Value In USD</h6>
            <p className='mb-0 ms-3 col col-lg-3 text-uppercase fw-bold'> ${formatAsCurrency(dispute?.trade?.valueInUSD)}</p>
          </div>

          <div className='row d-flex align-items-center mb-3'>
            <h6 className='mb-0 fw-bold col col-lg-3 small'>Rate</h6>
            <p className='mb-0 ms-3 col col-lg-3 text-uppercase fw-bold'> N{formatAsCurrency(dispute?.trade?.rate)}</p>
          </div>

          <div className='row d-flex align-items-center mb-3'>
            <h6 className='mb-0 fw-bold col col-lg-3 small'>Card Type</h6>
            <p className='mb-0 ms-3 col col-lg-3 text-uppercase fw-bold'> {dispute?.trade?.cardType} </p>
          </div>

          <div className='row d-flex align-items-center mb-3'>
            <h6 className='mb-0 fw-bold col col-lg-3 small'>Date Created</h6>
            <p className='mb-0 ms-3 col col-lg-3'>{new Date(dispute?.createdAt).toDateString()}</p>
          </div>

          <div className='row d-flex align-items-center mb-3'>
            <h6 className='mb-0 fw-bold col col-lg-3 small'>Last Updated</h6>
            <p className='mb-0 ms-3 col col-lg-3'>{new Date(dispute?.updatedAt).toDateString()}</p>
          </div>
        </section>
      </div>
    </InsideLayout>
  )
}

export default DisputeDetails;