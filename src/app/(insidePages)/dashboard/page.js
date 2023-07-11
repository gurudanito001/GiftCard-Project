"use client"
import React from 'react';
import { IconButton } from '@mui/material';
import Image from 'next/image';

const styles = {
    card: {
        width: "clamp(350px, 450px, 550px)",
        fontSize: ".8rem"
    },
    transactions: {
        width: "clamp(350px, 450px, 550px)",
    }
}

export default function Dashboard() {
    return (
        <div className='py-5 px-3 px-lg-5'>
            <h2 className=''>Dashboard</h2>
            <section className=''>
                <div className="card gap-2 primary-bg border-0 rounded-4 p-4" style={styles.card}>
                    <div className="d-flex flex-column border-0">
                        <p className="mb-0 small text-secondary">Ledger Balance</p>
                        <p className="mb-0 fs-6 small fw-bold text-secondary">₦23,000,000,000</p>
                    </div>
                    <div className="d-flex flex-column border-0">
                        <p className="mb-0">Available Balance</p>
                        <p className="mb-0 fs-5 fw-bold">₦23,000,000,000</p>
                    </div>
                    <div className="d-flex align-items-center">
                        <a id="deposit" onclick="openDepositMenu()" data-bs-toggle="offcanvas"
                            aria-expanded="false" aria-label="Toggle navigation" className="text-decoration-none text-dark d-flex flex-column align-items-center mx-auto" href="#fundWallet">
                            <IconButton>
                                <i className="fa-solid fa-plus fs-4"></i>
                            </IconButton>
                            <span className="small">Add Funds</span>
                        </a>
                        <a id="withdraw" data-bs-toggle="offcanvas" onclick="openWithdrawalMenu()"
                            aria-expanded="false" aria-label="Toggle navigation" className="text-decoration-none text-dark d-flex flex-column align-items-center mx-auto" href="#fundWallet">
                            <IconButton>
                                <i className="fa-solid fa-paper-plane fs-4"></i>
                            </IconButton>
                            <span className="small">Send</span>
                        </a>
                        <a id="withdraw" data-bs-toggle="offcanvas" onclick="openWithdrawalMenu()"
                            aria-expanded="false" aria-label="Toggle navigation" className="text-decoration-none text-dark d-flex flex-column align-items-center mx-auto" href="#fundWallet">
                            <IconButton>
                                <i className="fa-solid fa-minus"></i>
                            </IconButton>
                            <span className="small">Withdraw</span>
                        </a>
                    </div>
                </div>
            </section>

            <section className='mt-5 row'>
                <div className='col col-lg-6'>
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

                <div className='col col-lg-6'>
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

