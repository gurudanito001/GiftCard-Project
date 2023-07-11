
'use client';
import { AppTextInput, AppPasswordInput } from "../../../components/formComponents";
import { useState } from "react";
import { apiPost } from '../../../services/apiService';
import { CircularProgress } from "@mui/material";
import { useSelector, useDispatch } from 'react-redux';
import { setMessage } from '@/store/slices/notificationSlice';
import { useRouter } from "next/navigation";

const LoginForm = () => {
  const router = useRouter();
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
    apiPost({ url: `/auth/login`, data: formData })
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
        router.push("/dashboard")
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
  )
}

export default LoginForm