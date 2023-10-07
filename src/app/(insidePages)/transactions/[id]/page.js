import formatAsCurrency from "@/services/formatAsCurrency";
import { getTransactionById } from '@/lib/prisma/transactions';
import { getUserById } from '@/lib/prisma/users';
import InsideLayout from "@/components/insideLayout";


const styles ={
    container: {
        width: "clamp(350px, 100%, 900px)"
    }
}
const TransactionDetails = async ({params, searchParams}) =>{
    const userId = searchParams?.userId;
    const {user: userData} = await getUserById(userId);
    const {transaction} = await getTransactionById(params.id);
    

    const senderReceiverData = (data) =>{
        console.log(data)
        if (data) {
            if (data.id === userId) {
                return "self"
            } else {
                return `${data.firstName} ${data.lastName}`
            }
        }
      }
    return(
        <InsideLayout activeLink="transactions" userData={userData} userId={userId}>
            <div className='py-5 px-3 px-lg-5'>
                <header className='d-flex align-items-center mb-5'>
                    <h2 className=''>Transaction Details</h2>
                </header>

                <section className='primary-bg p-3 p-lg-5' style={styles.container}>
                    <div className='row d-flex align-items-center mb-3'>
                        <h6 className='mb-0 fw-bold col-4 small'>Sender</h6>
                        <div className='mb-0 ms-3 col col-lg-6 d-flex align-items-center p-0 gap-2'>
                            <span>{senderReceiverData(transaction?.benefactor)}</span>
                        </div>
                    </div>
                    <div className='row d-flex align-items-center mb-3'>
                        <h6 className='mb-0 fw-bold col-4 small'>Receiver</h6>
                        <div className='mb-0 ms-3 col col-lg-6 d-flex align-items-center p-0 gap-2'>
                            <span>{senderReceiverData(transaction?.beneficiary)}</span>
                        </div>
                    </div>
                    <div className='row d-flex align-items-center mb-3'>
                        <h6 className='mb-0 fw-bold col-4 small'>Amount in ₦ </h6>
                        <p className='mb-0 ms-3 col col-lg-3'>{formatAsCurrency(transaction?.amount)}</p>
                    </div>

                    <div className='row d-flex align-items-center mb-3'>
                        <h6 className='mb-0 fw-bold col-4 small'>Type</h6>
                        <p className='mb-0 ms-3 col col-lg-3'>{transaction?.type}</p>
                    </div>

                    <div className='row d-flex align-items-center mb-3'>
                        <h6 className='mb-0 fw-bold col-4 small'>Category</h6>
                        <p className='mb-0 ms-3 col col-lg-3'>{transaction?.category}</p>
                    </div>

                    <div className='row d-flex align-items-center mb-3'>
                        <h6 className='mb-0 fw-bold col-4 small'>Status</h6>
                        <p className='mb-0 ms-3 col col-lg-3'>{transaction?.status}</p>
                    </div>

                    <div className='row d-flex align-items-center mb-3'>
                        <h6 className='mb-0 fw-bold col-4 small'>Date</h6>
                        <p className='mb-0 ms-3 col col-lg-3'>{new Date(transaction?.createdAt).toDateString()}</p>
                    </div>

                    <div className="accordion accordion-flush" id="accordionFlushExample">
                        <div className="accordion-item">
                            <h2 className="accordion-header">
                                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                                    <h6 className='fw-bold'>Trade Details</h6>
                                </button>
                            </h2>
                            <div id="flush-collapseOne" className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                                <div className="accordion-body">Placeholder content for this accordion, which is intended to demonstrate the <code>.accordion-flush</code> className. This is the first items accordion body.</div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </InsideLayout>
        
    )
}

export default TransactionDetails;