'use client';
import { AppTextInput, AppPasswordInput } from "../../../components/formComponents";
import { useState } from "react";
import { apiPost } from '../../../services/apiService';
import { useSearchParams, useRouter } from "next/navigation";
import { CircularProgress } from "@mui/material";
import { useSelector, useDispatch } from 'react-redux';
import { setMessage } from '@/store/slices/notificationSlice';

const ChangePasswordForm = () => {

  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");

  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  })
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (prop) => (event) => {
    setFormData(prevState => ({
      ...prevState,
      [prop]: event.target.value
    }))
  }

  const changePassword = () => {
    setIsLoading(true)
    apiPost({ url: `/auth/changePassword/${token}`, data: formData })
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
        router.push("/auth/success")
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
    changePassword()
    console.log(formData)
  }

  return (
    <form className="w-100 d-flex flex-column align-items-center mt-5">
      <AppPasswordInput
        value={formData.password}
        onChange={handleChange("password")}
        labelText="Create your new password"
      />

      <AppPasswordInput
        value={formData.confirmPassword}
        onChange={handleChange("confirmPassword")}
        labelText="Re-enter your new password"
      />

      <button className="btn app-primary-btn d-flex align-items-center" disabled={isLoading} type="button" onClick={handleSubmit}>
        {isLoading ? <CircularProgress size={20} color="inherit" /> : "Recover Account"}
      </button>
    </form>
  )
}

export default ChangePasswordForm;