'use client';
import styles from '../auth.module.css';
import { AppTextInput, AppPasswordInput } from "../../../components/formComponents";
import { useState } from "react";
import { apiPost } from '../../../services/apiService';
import { CircularProgress } from "@mui/material";
import { useSelector, useDispatch } from 'react-redux';
import { setMessage } from '@/store/slices/notificationSlice';



const Login = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
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
    apiPost({ url: `/api/auth/login`, data: formData })
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
    <div className='vh-100'>
      <div className="d-flex primary-bg h-100 justify-content-center justify-content-lg-start">
        <section className="d-flex flex-column gap-3 align-items-center align-items-lg-start 
            col-11 col-sm-8 col-md-5 py-5 px-4 px-lg-5">
          <div className={styles.wrapper}>
            <div className="navbar-brand">
              <a className="text-decoration-none dark-text fw-bold fs-3" href="/">
                Gift<span className="secondary-text">Card</span>
              </a>
            </div>
            <h2 className={styles.pageTitle}>Login to Your Account!</h2>
            <p className={styles.pageDescription}>In a laoreet purus. Integer turpis quam, laoreet id orci nec, ultrices lacinia nunc.</p>

            <form className="w-100 d-flex flex-column align-items-center mt-5">
              <AppTextInput
                value={formData.email}
                onChange={handleChange("email")}
                labelText="Email Address"
              />
              <AppPasswordInput 
                value={formData.password}
                onChange={handleChange("password")}
              />
              <a href="/auth/resetPassword" className="highlight-text me-auto fs-6">Forgot Password?</a>
              <button className="btn app-primary-btn d-flex align-items-center" disabled={isLoading} type="button" onClick={handleSubmit}>
                {isLoading ? <CircularProgress size={20} color="inherit" /> : "Login"}
              </button>
              <p className="text-center mt-4">Don&apos;t have an Account? <a href="/auth/register" className='highlight-text'>Create Account</a></p>

            </form>
          </div>
        </section>
        <section className="d-none accent-light-bg d-lg-flex justify-content-center col-lg-7">
          <div className="login-img">
          </div>
        </section>
      </div>
    </div>
  )
}

export default Login;