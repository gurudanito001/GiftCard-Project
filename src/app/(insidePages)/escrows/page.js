"use client";

import * as React from 'react';
import { AppTextInput, AppPasswordInput } from "../../../components/formComponents";
import { useState } from "react";
import { apiPost } from '../../../services/apiService';
import { CircularProgress } from "@mui/material";
import { useSearchParams } from "next/navigation";
import { useSelector, useDispatch } from 'react-redux';
import { setMessage } from '@/store/slices/notificationSlice';
import { useRouter } from 'next/navigation';
import {Avatar} from '@mui/material';

const styles = {
    tableRow: {
        cursor: "pointer"
    }
}

export default function Escrows () {
    const router = useRouter();
    const dispatch = useDispatch();
    const searchParams = useSearchParams();
    console.log(searchParams.get("token"));
    const [formData, setFormData] = useState({
      name: "",
      email: "",
      password: "",
      role: "user"
    })
    const [isLoading, setIsLoading] = useState(false)
  
    const handleChange = (prop) => (event) => {
      setFormData(prevState => ({
        ...prevState,
        [prop]: event.target.value
      }))
    }
  
    const registerUser = () => {
      setIsLoading(true)
      apiPost({ url: `/api/auth/register`, data: formData })
        .then(res => {
          console.log(res)
          setIsLoading(false)
          dispatch(
            setMessage({
              severity: "success",
              message: res.message,
              key: Date.now(),
            })
          );
        })
        .catch(error => {
          console.log(error)
          setIsLoading(false)
          dispatch(
            setMessage({
              severity: "error",
              message: error.message,
              key: Date.now(),
            })
          );
        })
    }
  
    const handleSubmit = (event) => {
      event.preventDefault();
      registerUser()
      console.log(formData)
    }
  
    return (
        <div className='py-5 px-3 px-lg-5'>
            <header className='d-flex align-items-center mb-5'>
                <h2 className=''>Your Escrows</h2>
            </header>


            <section className='table-responsive mt-5 p-lg-3 primary-bg'>
                <table className="table table-hover table-borderless align-middle primary-bg">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Amount in ₦</th>
                            <th scope="col">Status</th>
                            <th scope="col">Date</th>
                            <th scope='col'><i className="fa-solid fa-angle-right ms-auto invisible"></i>  </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr style={styles.tableRow} onClick={() => router.push("/escrows/id")}>
                            <th scope="row" className='py-3'>1</th>
                            <td className='py-3'>100 000</td>
                            <td className='py-3'>PENDING</td>
                            <td className='py-3'>{new Date().toDateString()}</td>
                            <td scope='col'><i className="fa-solid fa-angle-right ms-auto"></i>  </td>
                        </tr>
                        <tr style={styles.tableRow} onClick={()=>router.push("/escrows/id")}>
                            <th scope="row" className='py-3'>2</th>
                            <td className='py-3'>100 000</td>
                            <td className='py-3'>PENDING</td>
                            <td className='py-3'>{new Date().toDateString()}</td>
                            <td scope='col'><i className="fa-solid fa-angle-right ms-auto"></i>  </td>
                        </tr>
                        <tr style={styles.tableRow} onClick={()=>router.push("/escrows/id")}>
                            <th scope="row" className='py-3'>3</th>
                            <td className='py-3'>100 000</td>
                            <td className='py-3'>PENDING</td>
                            <td className='py-3'>{new Date().toDateString()}</td>
                            <td scope='col'><i className="fa-solid fa-angle-right ms-auto"></i>  </td>
                        </tr>
                        <tr style={styles.tableRow} onClick={()=>router.push("/escrows/id")}>
                            <th scope="row" className='py-3'>4</th>
                            <td className='py-3'>100 000</td>
                            <td className='py-3'>PENDING</td>
                            <td className='py-3'>{new Date().toDateString()}</td>
                            <td scope='col'><i className="fa-solid fa-angle-right ms-auto"></i>  </td>
                        </tr>
                        <tr style={styles.tableRow} onClick={()=>router.push("/escrows/id")}>
                            <th scope="row" className='py-3'>5</th>
                            <td className='py-3'>100 000</td>
                            <td className='py-3'>PENDING</td>
                            <td className='py-3'>{new Date().toDateString()}</td>
                            <td scope='col'><i className="fa-solid fa-angle-right ms-auto"></i>  </td>
                        </tr>
                    </tbody>
                </table>
            </section>
        </div>
    )
}
