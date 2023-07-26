"use client";
import React from 'react';
import { Avatar } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { clearUserData } from "@/store/slices/userDataSlice";
import { apiPost } from '@/services/apiService';
import { setUserData } from "@/store/slices/userDataSlice";

const styles = {
    card: {
        width: "clamp(350px, 100%, 650px)",
    }
}

export default function Profile() {
    const { userData } = useSelector((state) => state.userData);
    const dispatch = useDispatch();
    return (
        <div className='py-5 px-3 px-lg-5'>
            <h2 className=' mb-4'>Profile</h2>

            <section className=''>
               <div className='d-flex align-items-center primary-bg p-3 rounded-3' style={styles.card}>
                    <Avatar style={{width: "70px", height: "70px"}} />
                    <div className="d-flex flex-column small ms-2">
                        <span className="text-dark fw-bold"> {userData.firstName} {userData.lastName}</span>
                        <span className="text-dark small"> {userData.email} </span>
                    </div>
                    <button className='btn btn-link text-danger ms-auto text-decoration-none'> <small className='fw-bold'>Sign Out</small></button>
               </div>

               <div className='d-flex align-items-center primary-bg p-3 rounded-3 mt-3' style={styles.card}>
                    <div className="d-flex flex-column small ms-2">
                        <span className="text-dark fw-bold"> Edit Profile</span>
                    </div>
                    <i className="fa-solid fa-angle-right ms-auto"></i>               
                </div>

               <div className='d-flex align-items-center primary-bg p-3 rounded-3 mt-3' style={styles.card}>
                    <div className="d-flex flex-column small ms-2">
                        <span className="text-dark fw-bold"> Change Password</span>
                    </div>
                    <i className="fa-solid fa-angle-right ms-auto"></i>               
                </div>

                <div className='d-flex align-items-center primary-bg p-3 rounded-3 mt-3' style={styles.card}>
                    <div className="d-flex flex-column small ms-2">
                        <span className="text-dark fw-bold"> Ratings</span>
                    </div>
                    <i className="fa-solid fa-angle-right ms-auto"></i>               
                </div>
            </section>
        </div>
    )
}

