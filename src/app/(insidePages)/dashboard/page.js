"use client"
import React from 'react';
import Image from 'next/image';
import { useSelector } from 'react-redux';
import WalletCard from './walletCard';

const styles = {
    transactions: {
        width: "clamp(350px, 100%, 550px)",
    }
}

const TransactionItem = ({}) => {
    return (
        <div className="d-flex flex-row align-items-start gap-3 primary-bg card border-0 px-3 py-3 rounded-3">
            <Image className='img img-fluid wallet-icon' src="/images/wallet_icon.svg" alt='wallet-icon' width={20} height={20} />
            <div className="d-flex gap-3 flex-fill">
                <div className="d-flex flex-column gap-1">
                    <p className="mb-0 span">
                        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ullam non, voluptas reprehenderit deleniti ipsum eaque!
                    </p>
                    <p className="mb-0 text-small">Friday, April 7, 2023 08:23am</p>
                </div>
                <p className="mb-0 text-success">₦5000</p>
            </div>
        </div>
    )
}

export default function Dashboard() {
    const {userData} = useSelector((state) => state.userData);
    return (
        <div className='py-5 px-3 px-lg-5'>
            <h2 className='mb-4'>Dashboard</h2>
            <WalletCard userData={userData} />

            <section className='mt-5 row'>
                <div className='col-12 col-md-6'>
                    <div className="d-flex justify-content-between align-items-center mb-3" style={styles.transactions}>
                        <h5 className="mb-0 fw-bold fs-6">Recent Transactions</h5>
                        <a className="text-decoration-none text-secondary small" href="./transactions.html">View all</a>
                    </div>
                    <div className='primary-bg d-flex flex-column gap-2 recent-transaction rounded-4 p-lg-2' style={styles.transactions}>
                        <div className="d-flex flex-row align-items-start gap-3 primary-bg card border-0 px-3 py-3">
                            <Image className='img img-fluid wallet-icon' src="/images/wallet_icon.svg" alt='wallet-icon' width={20} height={20} />
                            <div className="d-flex gap-3 flex-fill">
                                <div className="d-flex flex-column gap-1">
                                    <p className="mb-0 span">
                                        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ullam non, voluptas reprehenderit deleniti ipsum eaque!
                                    </p>
                                    <p className="mb-0 text-small">Friday, April 7, 2023 08:23am</p>
                                </div>
                                <p className="mb-0 text-success">₦5000</p>
                            </div>
                        </div>

                        <div className="d-flex flex-row align-items-start gap-3 primary-bg card border-0 px-3 py-3 rounded-3">
                            <Image className='img img-fluid wallet-icon' src="/images/wallet_icon.svg" alt='wallet-icon' width={20} height={20} />
                            <div className="d-flex gap-3 flex-fill">
                                <div className="d-flex flex-column gap-1">
                                    <p className="mb-0 span">
                                        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ullam non, voluptas reprehenderit deleniti ipsum eaque!
                                    </p>
                                    <p className="mb-0 text-small">Friday, April 7, 2023 08:23am</p>
                                </div>
                                <p className="mb-0 text-danger">₦5000</p>
                            </div>
                        </div>

                        <div className="d-flex flex-row align-items-start gap-3 primary-bg card border-0 px-3 py-3 rounded-3">
                            <Image className='img img-fluid wallet-icon' src="/images/wallet_icon.svg" alt='wallet-icon' width={20} height={20} />
                            <div className="d-flex gap-3 flex-fill">
                                <div className="d-flex flex-column gap-1">
                                    <p className="mb-0 span">
                                        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ullam non, voluptas reprehenderit deleniti ipsum eaque!
                                    </p>
                                    <p className="mb-0 text-small">Friday, April 7, 2023 08:23am</p>
                                </div>
                                <p className="mb-0 text-success">₦5000</p>
                            </div>
                        </div>

                        <div className="d-flex flex-row align-items-start gap-3 primary-bg card border-0 px-3 py-3 rounded-3">
                            <Image className='img img-fluid wallet-icon' src="/images/wallet_icon.svg" alt='wallet-icon' width={20} height={20} />
                            <div className="d-flex gap-3 flex-fill">
                                <div className="d-flex flex-column gap-1">
                                    <p className="mb-0 span">
                                        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ullam non, voluptas reprehenderit deleniti ipsum eaque!
                                    </p>
                                    <p className="mb-0 text-small">Friday, April 7, 2023 08:23am</p>
                                </div>
                                <p className="mb-0 text-danger">₦5000</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='col-12 col-md-6'>
                    <div className="d-flex justify-content-between align-items-center mb-3" style={styles.transactions}>
                        <h5 className="mb-0 fw-bold fs-6">Latest Offers</h5>
                        <a className="text-decoration-none text-secondary small" href="./transactions.html">View All</a>
                    </div>
                    <div className='primary-bg d-flex flex-column gap-2 recent-transaction rounded-4 p-lg-2' style={styles.transactions}>
                        <div className="d-flex flex-row align-items-start gap-3 primary-bg card border-0 px-3 py-3">
                            <Image className='img img-fluid wallet-icon' src="/images/wallet_icon.svg" alt='wallet-icon' width={20} height={20} />
                            <div className="d-flex gap-3 flex-fill">
                                <div className="d-flex flex-column gap-1">
                                    <p className="mb-0 span">
                                        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ullam non, voluptas reprehenderit deleniti ipsum eaque!
                                    </p>
                                    <p className="mb-0 text-small">Friday, April 7, 2023 08:23am</p>
                                </div>
                                <p className="mb-0 text-success">₦5000</p>
                            </div>
                        </div>

                        <div className="d-flex flex-row align-items-start gap-3 primary-bg card border-0 px-3 py-3 rounded-3">
                            <Image className='img img-fluid wallet-icon' src="/images/wallet_icon.svg" alt='wallet-icon' width={20} height={20} />
                            <div className="d-flex gap-3 flex-fill">
                                <div className="d-flex flex-column gap-1">
                                    <p className="mb-0 span">
                                        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ullam non, voluptas reprehenderit deleniti ipsum eaque!
                                    </p>
                                    <p className="mb-0 text-small">Friday, April 7, 2023 08:23am</p>
                                </div>
                                <p className="mb-0 text-danger">₦5000</p>
                            </div>
                        </div>

                        <div className="d-flex flex-row align-items-start gap-3 primary-bg card border-0 px-3 py-3 rounded-3">
                            <Image className='img img-fluid wallet-icon' src="/images/wallet_icon.svg" alt='wallet-icon' width={20} height={20} />
                            <div className="d-flex gap-3 flex-fill">
                                <div className="d-flex flex-column gap-1">
                                    <p className="mb-0 span">
                                        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ullam non, voluptas reprehenderit deleniti ipsum eaque!
                                    </p>
                                    <p className="mb-0 text-small">Friday, April 7, 2023 08:23am</p>
                                </div>
                                <p className="mb-0 text-success">₦5000</p>
                            </div>
                        </div>

                        <div className="d-flex flex-row align-items-start gap-3 primary-bg card border-0 px-3 py-3 rounded-3">
                            <Image className='img img-fluid wallet-icon' src="/images/wallet_icon.svg" alt='wallet-icon' width={20} height={20} />
                            <div className="d-flex gap-3 flex-fill">
                                <div className="d-flex flex-column gap-1">
                                    <p className="mb-0 span">
                                        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ullam non, voluptas reprehenderit deleniti ipsum eaque!
                                    </p>
                                    <p className="mb-0 text-small">Friday, April 7, 2023 08:23am</p>
                                </div>
                                <p className="mb-0 text-danger">₦5000</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>

    )
}

