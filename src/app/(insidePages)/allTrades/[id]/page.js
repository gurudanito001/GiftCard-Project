
import { getTradeById } from '@/lib/prisma/trades';
import { getUserById } from '@/lib/prisma/users';
import InsideLayout from "@/components/insideLayout";
import formatAsCurrency from '@/services/formatAsCurrency';



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
        <InsideLayout activeLink={`allTrades`} userData={userData} userId={userId}>
            <div className='py-5 px-3 px-lg-5'>
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
                </section>
                
            </div>
        </InsideLayout>
        
    )
}

export default TradeDetails;