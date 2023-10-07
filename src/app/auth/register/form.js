'use client';
import Image from "next/image";
import { AppTextInput, AppPasswordInput } from "../../../components/formComponents";
import { useState } from "react";
import { apiPost } from '../../../services/apiService';
import { CircularProgress } from "@mui/material";
import { useSearchParams } from "next/navigation";
import { useSelector, useDispatch } from 'react-redux';
import { setMessage } from '@/store/slices/notificationSlice';

const RegisterForm = () => {

  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
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
    apiPost({ url: `/auth/register`, data: formData })
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
    <form className="w-100 d-flex flex-column align-items-center mt-5">
      <AppTextInput
        value={formData.firstName}
        onChange={handleChange("firstName")}
        labelText="First Name"
      />
      <AppTextInput
        value={formData.lastName}
        onChange={handleChange("lastName")}
        labelText="Last Name"
      />
      <AppTextInput
        value={formData.email}
        onChange={handleChange("email")}
        labelText="Email Address"
      />
      <AppPasswordInput
        value={formData.password}
        onChange={handleChange("password")}
        labelText="Create Your Password"
      />

      <button className="btn app-primary-btn d-flex align-items-center justify-content-center py-3 w-100 fs-6" disabled={isLoading} type="button" onClick={handleSubmit}>
        {isLoading ? <CircularProgress size={20} color="inherit" /> : "Create Account"}
      </button>
      <p className="text-center mt-4">Already have an Account? <a href="/auth/login" className="highlight-text">Login</a></p>

    </form>
  )
}

export default RegisterForm;