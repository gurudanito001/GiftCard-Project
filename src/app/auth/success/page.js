'use client';
import RootLayout from "../../layout";
import styles from '../auth.module.css';
import Image from "next/image";
import { AppTextInput, AppPasswordInput } from "../../../components/formComponents";
import { useRouter } from "next/navigation";

const SuccessPage = () => {
  const router = useRouter()
  return (
      <main className="container-fluid">
        <div className="row">
          <div className="col col-lg-6 offset-lg-3 d-flex pb-5">
            <section className={styles.wrapper}>
              <Image src="/images/success-secondary.svg" alt="Success Icon" width={90} height={90} style={{marginTop: "120px"}} />
              <h2 className={styles.pageTitle} style={{marginTop: "30px"}}>Success!</h2>
              <p className={styles.pageDescription}>In a laoreet purus. Integer turpis quam, laoreet id orci nec, ultrices lacinia nunc.</p>

              <a className="btn app-primary-btn d-flex align-items-center" type="button" href="/auth/login" >
                Login
              </a>
            </section>
          </div>
        </div>
      </main>
  )
}

export default SuccessPage;