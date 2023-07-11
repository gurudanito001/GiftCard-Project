'use client';
import { AppTextInput } from "../../../components/formComponents";
import { useState } from "react";
import { apiPost } from '../../../services/apiService';
import { CircularProgress } from "@mui/material";
import { useSelector, useDispatch } from 'react-redux';
import { setMessage } from '@/store/slices/notificationSlice';

const ResetPasswordForm = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: "",
  })
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (prop) => (event) => {
    setFormData(prevState => ({
      ...prevState,
      [prop]: event.target.value
    }))
  }

  const resetPassword = () => {
    setIsLoading(true)
    apiPost({ url: `/auth/resetPassword`, data: formData })
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
    resetPassword()
    console.log(formData)
  }

  return (
    <form className="w-100 d-flex flex-column align-items-center mt-5">
      <AppTextInput
        value={formData.email}
        onChange={handleChange("email")}
        labelText="Email Address"
      />
      <button className="btn app-primary-btn d-flex align-items-center" disabled={isLoading} type="button" onClick={handleSubmit}>
        {isLoading ? <CircularProgress size={20} color="inherit" /> : "Proceed"}
      </button>
    </form>
  )
}

export default ResetPasswordForm