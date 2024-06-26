
import { getTradeById } from '@/lib/prisma/trades';
import { getUserById } from '@/lib/prisma/users';
import InsideLayout from "@/components/insideLayout";
import formatAsCurrency from '@/services/formatAsCurrency';
import ConfirmationModal from '@/components/confirmationModal';
import MessageOffCanvas from "../messageOffCanvas";
import RefreshTradeOnInterval from './refreshTradeOnInterval';
import CreateDispute from "@/app/(insidePages)/disputes/createDispute"



const styles = {
    container: {
        width: "clamp(350px, 100%, 900px)"
    }
}

export const dynamic='force-dynamic';

const TradeDetails = async ({params, searchParams}) => {
    const userId = searchParams?.userId;
    const id = params.id;
    const { user: userData } = await getUserById({id: userId});
    const { trade } = await getTradeById({id});
    console.log(trade)

    const statusStyle = (status) =>{
        let className = "";
        if(status?.toLowerCase() === "cancelled" || status?.toLowerCase() === "declined"){
            className = "text-danger"
        }else if(status?.toLowerCase() === "accepted"){
            className = "text-success"
        }
        return className
    }


    return (
        <InsideLayout activeLink={`trades`} userData={userData} userId={userId}>
            <div className='py-5 px-3 px-lg-5'>
                <RefreshTradeOnInterval />
                <header className='d-flex align-items-center'>
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
                        <h6 className='mb-0 fw-bold col-5 col-lg-3 small'>Card Name</h6>
                        <p className='mb-0 col text-uppercase'>{trade?.cardName}</p>
                    </div>

                    <div className='row d-flex align-items-center mb-3'>
                        <h6 className='mb-0 fw-bold col-5 col-lg-3 small'>Card Type</h6>
                        <p className='mb-0 col text-uppercase'>{trade?.cardType}</p>
                    </div>

                    <div className='row d-flex align-items-center mb-3'>
                        <h6 className='mb-0 fw-bold col-5 col-lg-3 small'>Value In $USD</h6>
                        <p className='mb-0 col text-uppercase'>{trade?.valueInUSD}</p>
                    </div>

                    <div className='row d-flex align-items-center mb-3'>
                        <h6 className='mb-0 fw-bold col-5 col-lg-3 small'>Rate </h6>
                        <p className='mb-0 col'> ₦{formatAsCurrency(trade?.rate)}</p>
                    </div>

                    <div className='row d-flex align-items-center mb-3'>
                        <h6 className='mb-0 fw-bold col-5 col-lg-3 small'>You will {userId === trade?.buyerId ? "be charged" : "receive"} </h6>
                        <p className='mb-0 col'> ₦{formatAsCurrency(trade?.rate * trade?.valueInUSD)}</p>
                    </div>

                    <div className='row d-flex align-items-center mb-3'>
                        <h6 className='mb-0 fw-bold col-5 col-lg-3 small'>Status</h6>
                        <p className={`mb-0 col ${statusStyle(trade?.status)}`}>{trade?.status}</p>
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
                            {trade?.userId !== userId && (trade?.status === "PENDING") &&
                             <ConfirmationModal tradeId={id} action="accept" btnName="Accept Trade" btnStyles={{mr: 3}} btnColor='success' title="Accept Trade" message="Are you sure you want to accept this trade?" />
                            }

                            {trade?.userId !== userId && (trade?.status === "PENDING") &&
                                <ConfirmationModal tradeId={id} action="decline" btnName="Decline Trade" btnStyles={{mr: 3}} btnColor='error' title="Decline Trade" message="Are you sure you want to decline this trade?" />
                            }

                            {(trade?.sellerId === userId && (trade?.status !== "CANCELLED" && trade?.status !== "SUCCESSFUL")) &&
                                <ConfirmationModal btnStyles={{mr: 3}} tradeId={id} action="cancel" btnName="Cancel Trade" btnColor='warning' title="Cancel Trade" message="Are you sure you want to cancel this trade?" />
                            }

                            {(trade?.buyerId === userId && trade?.status === "ACCEPTED") &&
                                <ConfirmationModal btnStyles={{mr: 3}} tradeId={id} action="complete" btnName="Complete Trade" btnColor='primary' title="Complete Trade" message="Are you sure you have confirmed the card? \n The payment will be remitted to seller after you confirm trade" />
                            }

                            {
                                trade?.status === "ACCEPTED" || trade?.status === "DISPUTED" && 
                                <>
                                    <button className="btn app-primary-btn py-2 ms-4 mt-0" type="button" data-bs-toggle="offcanvas" data-bs-target="#messaging" aria-controls="offcanvasRight">Start Messaging</button>

                                    <MessageOffCanvas trade={trade} userId={userId} resourceId={id} receiverId={trade?.buyerId === userId ? trade?.sellerId : trade?.buyerId} receiverName={trade?.buyerId === userId ? trade?.seller.firstName : trade?.buyer.firstName} />
                                </>
                            } 
                            

                            <div className="offcanvas primary-bg offcanvas-end gap-1" data-bs-scroll="true" data-bs-backdrop="static" id={`dispute-${trade?.id}`}>
                                <CreateDispute userId={userId} tradeId={trade?.id} />
                            </div>
                        </div>
                    </div>
                </section>
                
            </div>
        </InsideLayout>
        
    )
}

export default TradeDetails;