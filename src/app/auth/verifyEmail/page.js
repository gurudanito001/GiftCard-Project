'use client';
import RootLayout from "../../layout";
import styles from '../auth.module.css';
import Image from "next/image";
import { AppTextInput, AppPasswordInput } from "../../../components/formComponents";
import { apiPost } from "@/services/apiService";
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { setMessage } from '@/store/slices/notificationSlice';

const VerifyEmail = () => {
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [isLoading, setIsLoading] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false)

  useEffect(() => {
    if (token) {
      verifyEmail();
    }
  }, [])

  const verifyEmail = () => {
    setIsLoading(true)
    apiPost({ url: `/api/auth/confirmEmail/${token}` })
      .then(res => {
        console.log(res)
        setIsLoading(false)
        setEmailVerified(true)
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

  return (
    <main style={{ height: "100vh" }} className='d-flex flex-column'>
      <div className="container-fluid">
        <div className="row">
          <div className="col col-lg-6 offset-lg-3 d-flex pb-5">

            {!emailVerified && isLoading &&
              <section className="mx-auto" style={{ marginTop: "200px" }}>
                <h1 className="text-center">Verifying Email ...</h1>
              </section>
            }

            {emailVerified &&
              <section className={styles.wrapper}>
                <Image className="visible" src="/images/success-secondary.svg" alt="Success Icon" width={90} height={90} style={{ marginTop: "120px" }} />
                <h2 className={styles.pageTitle} style={{ marginTop: "30px" }}>Email Verified!</h2>
                <p className={styles.pageDescription}>In a laoreet purus. Integer turpis quam, laoreet id orci nec, ultrices lacinia nunc.</p>

                <a className="btn app-primary-btn d-flex align-items-center" href="/auth/login" type="button">
                  Login
                </a>
              </section>
            }
          </div>
        </div>
      </div>
    </main>
  )
}

export default VerifyEmail;