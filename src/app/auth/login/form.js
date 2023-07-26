
'use client';
import { AppTextInput, AppPasswordInput } from "../../../components/formComponents";
import { useEffect, useState } from "react";
import { apiPost } from '../../../services/apiService';
import { CircularProgress } from "@mui/material";
import { useSelector, useDispatch } from 'react-redux';
import { setMessage } from '@/store/slices/notificationSlice';
import { useRouter } from "next/navigation";
import { setUserData } from "../../../store/slices/userDataSlice";

const LoginForm = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const {userData} = useSelector((state) => state.userData);

  useEffect(()=>{
    let token = localStorage.getItem("token")
    console.log(token)
    if(userData.token){
      router.push("/dashboard")

    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[userData])
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

  const loginUser = () => {
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
        localStorage.setItem("token", res.data.token);
        dispatch(setUserData(res.data));
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
    loginUser()
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