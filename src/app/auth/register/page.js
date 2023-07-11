import styles from '../auth.module.css';
import RegisterForm from './form';


const Register = () => {
  return (
    <main style={{height: "100vh"}} className='d-flex flex-column'>
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
            <h2 className={styles.pageTitle}>Create Your Account!</h2>
            <p className={styles.pageDescription}>In a laoreet purus. Integer turpis quam, laoreet id orci nec, ultrices lacinia nunc.</p>
            <RegisterForm />
          </div>
        </section>
        <section className="d-none accent-light-bg d-lg-flex justify-content-center col-lg-7">
          <div className="sign-up-img">
          </div>
        </section>
      </div>
    </div>
    </main>
  )
}

export default Register;