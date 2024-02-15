
import { getEscrowById } from '@/lib/prisma/escrows';
import { getUserById } from '@/lib/prisma/users';
import InsideLayout from "@/components/insideLayout";
import AvatarClient from '@/components/avater';
import formatAsCurrency from '@/services/formatAsCurrency';




const styles = {
    container: {
        width: "clamp(350px, 100%, 900px)"
    }
}

export const dynamic = 'force-dynamic';

const EscrowDetails = async ({ params, searchParams }) => {
    const userId = searchParams?.userId;
    const id = params.id;
    const { user: userData } = await getUserById({ id: userId });
    const { escrow } = await getEscrowById({ id });

    const statusStyle = (status) => {
        let className = "";
        if (status.toLowerCase() === "cancelled" || status.toLowerCase() === "declined") {
            className = "text-danger"
        } else if (status.toLowerCase() === "accepted") {
            className = "text-success"
        }
        return className
    }


    return (
        <InsideLayout activeLink={`escrows`} userData={userData} userId={userId}>
            <div className='py-5 px-3 px-lg-5'>
                <header className='d-flex align-items-center mb-5'>
                    <h2 className=''>Escrow Details</h2>
                </header>

                <section className='primary-bg p-3 p-lg-5' style={styles.container}>
                    <div className='row d-flex align-items-center mb-3'>
                        <h6 className='mb-0 fw-bold col-5 col-lg-3 small'>Buyer</h6>
                        <div className='d-flex m-0 p-0 col'>
                            <article className='d-flex flex-column justify-content-center'>
                                {escrow?.trade?.buyer?.id === userId ?
                                    <span>You</span> :
                                    <>
                                        <span className='fw-bolder'>{escrow?.trade?.buyer?.firstName} {escrow?.trade?.buyer?.lastName} </span>
                                        <span className='small'>{escrow?.trade?.buyer?.username || escrow?.trade?.buyer?.email}</span>
                                    </>
                                }
                            </article>
                        </div>
                    </div>

                    <div className='row d-flex align-items-center mb-3'>
                        <h6 className='mb-0 fw-bold col-5 col-lg-3 small'>Seller</h6>
                        <div className='d-flex m-0 p-0 col'>
                            <article className='d-flex flex-column justify-content-center'>
                                {escrow?.trade?.seller?.id === userId ?
                                    <span>You</span> :
                                    <>
                                        <span className='fw-bolder'>{escrow?.trade?.seller?.firstName} {escrow?.trade?.seller?.lastName} </span>
                                        <span className='small'>{escrow?.trade?.seller?.username || escrow?.trade?.seller?.email}</span>
                                    </>
                                }
                            </article>
                        </div>
                    </div>

                    <div className='row d-flex align-items-center mb-3'>
                        <h6 className='mb-0 fw-bold col-5 col-lg-3 small'>Amount </h6>
                        <p className='mb-0 col'> ₦{formatAsCurrency(escrow?.amount)}</p>
                    </div>
                    <div className='row d-flex align-items-center mb-3'>
                        <h6 className='mb-0 fw-bold col-5 col-lg-3 small'>Status</h6>
                        <p className={`mb-0 col ${statusStyle(escrow?.status)}`}>{escrow?.status}</p>
                    </div>


                    <div className='row d-flex align-items-center mb-3'>
                        <h6 className='mb-0 fw-bold col-5 col-lg-3 small'>Date Created</h6>
                        <p className='mb-0 col'>{new Date(escrow?.createdAt).toDateString()}</p>
                    </div>

                    <div className='row d-flex align-items-center mb-3'>
                        <h6 className='mb-0 fw-bold col-5 col-lg-3 small'>Last Updated</h6>
                        <p className='mb-0 col'>{new Date(escrow?.updatedAt).toDateString()}</p>
                    </div>

                    <div className="accordion accordion-flush" id="accordionFlushExample">
                        <div className="accordion-item">
                            <h2 className="accordion-header">
                                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                                    <h6 className='fw-bold'>Trade</h6>
                                </button>
                            </h2>
                            <div id="flush-collapseOne" className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                                <div className='accordion-body'>
                                    <div className='row d-flex align-items-center mb-3'>
                                        <h6 className='mb-0 fw-bold col-5 col-lg-3 small'>Card Name </h6>
                                        <p className='mb-0 col'> {escrow?.trade?.cardName}</p>
                                    </div>
                                    <div className='row d-flex align-items-center mb-3'>
                                        <h6 className='mb-0 fw-bold col-5 col-lg-3 small'>Card Type </h6>
                                        <p className='mb-0 col'> {escrow?.trade?.cardType}</p>
                                    </div>
                                    <div className='row d-flex align-items-center mb-3'>
                                        <h6 className='mb-0 fw-bold col-5 col-lg-3 small'>Value In $USD </h6>
                                        <p className='mb-0 col'> {formatAsCurrency(escrow?.trade?.valueInUSD)}</p>
                                    </div>
                                    <div className='row d-flex align-items-center mb-3'>
                                        <h6 className='mb-0 fw-bold col-5 col-lg-3 small'>Rate </h6>
                                        <p className='mb-0 col'> ₦{formatAsCurrency(escrow?.trade?.rate)}</p>
                                    </div>
                                    <div className='row d-flex align-items-center mb-3'>
                                        <h6 className='mb-0 fw-bold col-5 col-lg-3 small'>Status</h6>
                                        <p className={`mb-0 col ${statusStyle(escrow?.status)}`}>{escrow?.trade?.status}</p>
                                    </div>


                                    <div className='row d-flex align-items-center mb-3'>
                                        <h6 className='mb-0 fw-bold col-5 col-lg-3 small'>Date Created</h6>
                                        <p className='mb-0 col'>{new Date(escrow?.trade?.createdAt).toDateString()}</p>
                                    </div>

                                    <div className='row d-flex align-items-center mb-3'>
                                        <h6 className='mb-0 fw-bold col-5 col-lg-3 small'>Last Updated</h6>
                                        <p className='mb-0 col'>{new Date(escrow?.trade?.updatedAt).toDateString()}</p>
                                    </div>
                                </div>


                            </div>
                        </div>
                    </div>
                </section>

            </div>
        </InsideLayout>

    )
}

export default EscrowDetails;