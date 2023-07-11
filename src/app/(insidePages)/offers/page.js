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

const styles = {
    tableRow: {
        cursor: "pointer"
    }
}

const Offers = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const searchParams = useSearchParams();
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
                <h2 className=''>Your Offers</h2>
                <button type="button" className="btn btn-link px-0 secondary-text fw-bold text-decoration-none d-flex align-items-center gap-1 ms-auto" data-bs-toggle="offcanvas" data-bs-target="#offers">
                    <img className="img-fluid" src="/images/plus-circle.svg" alt="" /> Create Offer
                </button>
            </header>


            <section className='table-responsive mt-5 p-lg-3 primary-bg'>
                <table className="table table-hover table-borderless align-middle">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Card Name</th>
                            <th scope="col">Value in $USD</th>
                            <th scope="col">Offer Price in ₦</th>
                            <th scope="col">Num of Trades</th>
                            <th scope="col">Date Created</th>
                            <th scope='col'><i className="fa-solid fa-angle-right ms-auto invisible"></i>  </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr style={styles.tableRow} onClick={()=>router.push("/offers/id")}>
                            <th scope="row" className='py-3'>1</th>
                            <td className='py-3'>Amazon</td>
                            <td className='py-3'>200</td>
                            <td className='py-3'>100 000</td>
                            <td className='py-3'>3</td>
                            <td className='py-3'>{new Date().toDateString()}</td>
                            <td scope='col'><i className="fa-solid fa-angle-right ms-auto"></i>  </td>
                        </tr>
                        <tr>
                            <th scope="row" className='py-3'>2</th>
                            <td className='py-3'>Amazon</td>
                            <td className='py-3'>200</td>
                            <td className='py-3'>100 000</td>
                            <td className='py-3'>3</td>
                            <td className='py-3'>{new Date().toDateString()}</td>
                            <td scope='col'><i className="fa-solid fa-angle-right ms-auto"></i>  </td>
                        </tr>
                        <tr>
                            <th scope="row" className='py-3'>3</th>
                            <td className='py-3'>Amazon</td>
                            <td className='py-3'>200</td>
                            <td className='py-3'>100 000</td>
                            <td className='py-3'>3</td>
                            <td className='py-3'>{new Date().toDateString()}</td>
                            <td scope='col'><i className="fa-solid fa-angle-right ms-auto"></i>  </td>
                        </tr>
                        <tr>
                            <th scope="row" className='py-3'>4</th>
                            <td className='py-3'>Amazon</td>
                            <td className='py-3'>200</td>
                            <td className='py-3'>100 000</td>
                            <td className='py-3'>3</td>
                            <td className='py-3'>{new Date().toDateString()}</td>
                            <td scope='col'><i className="fa-solid fa-angle-right ms-auto"></i>  </td>
                        </tr>
                        <tr>
                            <th scope="row" className='py-3'>5</th>
                            <td className='py-3'>Amazon</td>
                            <td className='py-3'>200</td>
                            <td className='py-3'>100 000</td>
                            <td className='py-3'>3</td>
                            <td className='py-3'>{new Date().toDateString()}</td>
                            <td scope='col'><i className="fa-solid fa-angle-right ms-auto"></i>  </td>
                        </tr>
                    </tbody>
                </table>
            </section>


            <div className="offcanvas primary-bg offcanvas-end gap-1" data-bs-scroll="true"
                id="offers">
                <div className="offcanvas-header py-5 px-4">
                    <h4 className="mb-0">Create Offer</h4>
                    <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close">
                    </button>
                </div>

                <form className="d-flex flex-column gap-3 px-4">

                    <div>
                        <label htmlFor="giftCardAmount" className="form-label mb-1">You want to</label>
                        <select className="form-select form-control form-control-sm primary-bg fs-6 py-3" aria-label="Default select example">
                            <option value="buy">Buy Giftcard</option>
                            <option value="sell">Sell Giftcard</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="giftCardAmount" className="form-label mb-1">Choose Giftcard Type</label>
                        <select className="form-select form-control form-control-sm primary-bg fs-6 py-3" aria-label="Default select example">
                            <option value="">Select Giftcard</option>
                            <option value="visa">Visa Giftcard</option>
                            <option value="vanilla">Vanilla Giftcard</option>
                            <option value="walmart">Walmart Giftcard</option>
                            <option value="target">Target Giftcard</option>
                            <option value="ebay">Ebay Giftcard</option>
                            <option value="amazon">Amazon Giftcard</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="giftCardAmount" className="form-label mb-1">Value in USD$</label>
                        <input type="text" className="form-control form-control-sm primary-bg fs-6 py-3" id="giftCardAmount" />
                    </div>
                    <div>
                        <label htmlFor="giftCardAmount" className="form-label mb-1">Offer Price in ₦</label>
                        <input type="text" className="form-control form-control-sm primary-bg fs-6 py-3" id="giftCardAmount" />
                    </div>
                    <button className="btn app-primary-btn d-flex align-items-center" disabled={isLoading} type="button" onClick={handleSubmit}>
                        {isLoading ? <CircularProgress size={20} color="inherit" /> : "Create Offer"}
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Offers;