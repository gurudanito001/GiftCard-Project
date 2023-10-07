/* import { usePathname } from 'next/navigation';
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { clearUserData } from "@/store/slices/userDataSlice";
import { apiPost } from '@/services/apiService';
import { setUserData } from "@/store/slices/userDataSlice"; */

const Layout = ({ children }) => {
  /* const { userData } = useSelector((state) => state.userData);
  console.log(userData)
  const dispatch = useDispatch();
  const pathname = usePathname();
  const router = useRouter();


  useEffect(() => {
    if (!userData.token) {
      let localStorageToken = localStorage.getItem("token");
      console.log(localStorageToken)
      if (!localStorageToken) {
        router.push("/auth/login")
      } else {
        refreshUserData(localStorageToken)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userData])

  const refreshUserData = (token) => {
    apiPost({ url: `/auth/refreshUserData/${token}` })
      .then(res => {
        console.log(res.data)
        localStorage.setItem("token", res.data.token);
        dispatch(setUserData(res.data));
      })
      .catch(error => {
        console.log(error)
        logout()
      })
  }

  const logout = () => {
    console.log("logout")
    localStorage.removeItem("token");
    dispatch(clearUserData());
  } */
  return (
    <>
    {children}
    </>
  )
}

export default Layout