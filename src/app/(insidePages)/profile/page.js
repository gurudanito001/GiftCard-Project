// import React from 'react';
import { getUserById } from '@/lib/prisma/users';
import Link from 'next/link';
import InsideLayout from "@/components/insideLayout";
// import AvatarClient from '@/components/avater';

const styles = {
    card: {
        width: "clamp(350px, 100%, 650px)",
    }
}

export const dynamic='force-dynamic';

export default async function Profile({ searchParams }) {
    const userId = searchParams?.userId;
    const { user: userData } = await getUserById({id: userId});
    return (
        <InsideLayout userData={userData} userId={userId} activeLink="profile">
            <div className='py-5 px-3 px-lg-5'>
                <h2 className=' mb-4'>Profile</h2>

                <section className=''>
                    <div className='d-flex align-items-center primary-bg p-3 rounded-3' style={styles.card}>
                        {/* <AvatarClient /> */}
                        <div className="d-flex flex-column small ms-2">
                            <span className="fw-bold"> {userData?.firstName} {userData?.lastName}</span>
                            <span className=""> {userData?.email} </span>
                        </div>
                        <Link className='btn btn-link text-danger ms-auto text-decoration-none fw-bolder' href="/auth/login"> Log Out</Link>
                    </div>

                    <div className='d-flex align-items-center primary-bg p-3 rounded-3 mt-3' style={styles.card}>
                        <div className="d-flex flex-column small ms-2">
                            <span className="fw-bold"> Edit Profile</span>
                        </div>
                        <i className="fa-solid fa-angle-right ms-auto"></i>
                    </div>

                    <div className='d-flex align-items-center primary-bg p-3 rounded-3 mt-3' style={styles.card}>
                        <div className="d-flex flex-column small ms-2">
                            <span className="fw-bold"> Change Password</span>
                        </div>
                        <i className="fa-solid fa-angle-right ms-auto"></i>
                    </div>

                    <div className='d-flex align-items-center primary-bg p-3 rounded-3 mt-3' style={styles.card}>
                        <div className="d-flex flex-column small ms-2">
                            <span className="fw-bold"> Ratings</span>
                        </div>
                        <i className="fa-solid fa-angle-right ms-auto"></i>
                    </div>
                </section>
            </div>
        </InsideLayout>
    )
}

