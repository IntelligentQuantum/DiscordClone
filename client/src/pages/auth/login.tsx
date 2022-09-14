import { Fragment } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';

import styles from '../../styles/login.module.scss';

const Login: NextPage = () =>
{
    return (
        <Fragment>
            <Head>
                <title>Login Page</title>
            </Head>
            <main>
                <section className={styles.login}>
                    <div className={styles.loginBox}>
                        <h1 className={styles.loginBoxHeading}>Welcome Back!</h1>
                        <form className={styles.loginBoxForm}>
                            <div className={styles.loginBoxFormGroup}>
                                <label className={styles.loginBoxFormLabel} htmlFor="email">Email</label>
                                <input className={styles.loginBoxFormInput} type="email" id="email" required />
                            </div>
                            <div className={styles.loginBoxFormGroup}>
                                <label className={styles.loginBoxFormLabel} htmlFor="password">Password</label>
                                <input className={styles.loginBoxFormInput} type="password" id="password" required />
                            </div>

                            <button className={styles.loginBoxFormButton}>
                                Continue
                            </button>
                        </form>

                        <Link href="/auth/register">
                            <a className={styles.loginBoxLink}>Register</a>
                        </Link>
                    </div>
                </section>
            </main>
        </Fragment>
    )
}

export default Login;
