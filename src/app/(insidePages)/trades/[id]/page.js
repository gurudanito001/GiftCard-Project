
import { getTradeById } from '@/lib/prisma/trades';
import { getUserById } from '@/lib/prisma/users';
import InsideLayout from "@/components/insideLayout";
import AvatarClient from '@/components/avater';
import formatAsCurrency from '@/services/formatAsCurrency';
import Link from 'next/link';
import {CancelButton, DeclineButton, AcceptButton} from "../actionButtons";
import ConfirmationModal from '@/components/confirmationModal';
import AppButton from "@/components/button";
import MessageOffCanvas from "../messageOffCanvas";




const styles = {
    container: {
        width: "clamp(350px, 100%, 900px)"
    }
}
const TradeDetails = async ({params, searchParams}) => {
    const userId = searchParams?.userId;
    const id = params.id;
    const { user: userData } = await getUserById(userId);
    const { trade } = await getTradeById(id);
    console.log(trade)

    const statusStyle = (status) =>{
        let className = "";
        if(status.toLowerCase() === "cancelled" || status.toLowerCase() === "declined"){
            className = "text-danger"
        }else if(status.toLowerCase() === "accepted"){
            className = "text-success"
        }
        return className
    }


    return (
        <InsideLayout activeLink={`trades`} userData={userData} userId={userId}>
            <div className='py-5 px-3 px-lg-5'>
                <header className='d-flex align-items-center mb-5'>
                    <h2 className=''>Trade Details</h2>
                </header>

                <section className='primary-bg p-3 p-lg-5' style={styles.container}>
                    <div className='row d-flex align-items-center mb-3'>
                        <h6 className='mb-0 fw-bold col-5 col-lg-3 small'>Buyer</h6>
                        <div className='d-flex m-0 p-0 col'>
                            <article className='d-flex flex-column justify-content-center'>
                                {trade?.buyer?.id === userId ?
                                    <span>You</span> :
                                    <>
                                        <span className='fw-bolder'>{trade?.buyer?.firstName} {trade?.buyer?.lastName} </span>
                                        <span className='small'>{trade?.buyer?.username || trade?.buyer?.email}</span>
                                    </>
                                }
                            </article>
                        </div>
                    </div>

                    <div className='row d-flex align-items-center mb-3'>
                        <h6 className='mb-0 fw-bold col-5 col-lg-3 small'>Seller</h6>
                        <div className='d-flex m-0 p-0 col'>
                            <article className='d-flex flex-column justify-content-center'>
                                {trade?.seller?.id === userId ?
                                    <span>You</span> :
                                    <>
                                        <span className='fw-bolder'>{trade?.seller?.firstName} {trade?.seller?.lastName} </span>
                                        <span className='small'>{trade?.seller?.username || trade?.seller?.email}</span>
                                    </>
                                }
                            </article>
                        </div>
                    </div>

                    <div className='row d-flex align-items-center mb-3'>
                        <h6 className='mb-0 fw-bold col-5 col-lg-3 small'>Offer Price </h6>
                        <p className='mb-0 col'> ₦{formatAsCurrency(trade?.price)}</p>
                    </div>

                    <div className='row d-flex align-items-center mb-3'>
                        <h6 className='mb-0 fw-bold col-5 col-lg-3 small'>Status</h6>
                        <p className={`mb-0 col ${statusStyle(trade?.status)}`}>{trade?.status}</p>
                    </div>

                    <div className='row d-flex align-items-center mb-3'>
                        <h6 className='mb-0 fw-bold col-5 col-lg-3 small'>Card Name</h6>
                        <p className='mb-0 col text-uppercase'>${formatAsCurrency(trade?.valueInUSD)} {trade?.cardName}</p>
                    </div>

                    <div className='row d-flex align-items-center mb-3'>
                        <h6 className='mb-0 fw-bold col-5 col-lg-3 small'>Escrow</h6>
                        <p className='mb-0 col'>none</p>
                    </div>

                    <div className='row d-flex align-items-center mb-3'>
                        <h6 className='mb-0 fw-bold col-5 col-lg-3 small'>Dispute</h6>
                        <p className='mb-0 col'>none</p>
                    </div>

                    <div className='row d-flex align-items-center mb-3'>
                        <h6 className='mb-0 fw-bold col-5 col-lg-3 small'>Date Created</h6>
                        <p className='mb-0 col'>{new Date(trade?.createdAt).toDateString()}</p>
                    </div>

                    <div className='row d-flex align-items-center mb-3'>
                        <h6 className='mb-0 fw-bold col-5 col-lg-3 small'>Last Updated</h6>
                        <p className='mb-0 col'>{new Date(trade?.createdAt).toDateString()}</p>
                    </div>

                    <div className='row d-flex flex-row align-items-center mb-3'>
                        <h6 className='mb-0 fw-bold col-5 col-lg-3 small'>Actions</h6>
                        <div className='mt-4 d-flex align-items-center'>
                            {
                                trade?.userId !== userId && (trade?.status === "PENDING") &&
                                <>
                                    <ConfirmationModal tradeId={id} action="accept" btnName="Accept Trade" btnColor='success' title="Accept Trade" message="Are you sure you want to accept this trade?" />
                                    <ConfirmationModal tradeId={id} action="decline" btnName="Decline Trade" btnStyles={{ml: 3}} btnColor='error' title="Decline Trade" message="Are you sure you want to decline this trade?" />
                                </>
                            }

                            {
                                trade?.userId === userId && (trade?.status === "PENDING") &&
                                <ConfirmationModal tradeId={id} action="cancel" btnName="Cancel Trade" btnColor='error' title="Cancel Trade" message="Are you sure you want to cancel this trade?" />
                            }

                            {
                                trade?.status === "ACCEPTED" &&
                                <>
                                    <button className="btn app-primary-btn py-2 mt-0" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">Start Messaging</button>

                                    <MessageOffCanvas userId={userId} resourceId={id} receiverId={trade?.buyerId === userId ? trade?.sellerId : trade?.buyerId} receiverName={trade?.buyerId === userId ? trade?.seller.firstName : trade?.buyer.firstName} />
                                </>
                            } 
                        </div>
                    </div>
                </section>
                
            </div>
        </InsideLayout>
        
    )
}

export default TradeDetails;