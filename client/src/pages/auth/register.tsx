import { Fragment } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';

import styles from '../../styles/register.module.scss';

const Register: NextPage = () =>
{
    return (
        <Fragment>
            <Head>
                <title>Register Page</title>
            </Head>
            <main>
                <section className={styles.register}>
                    <div className={styles.registerBox}>
                        <h1 className={styles.registerBoxHeading}>Create an account</h1>
                        <form className={styles.registerBoxForm}>
                            <div className={styles.registerBoxFormGroup}>
                                <label className={styles.registerBoxFormLabel} htmlFor="email">Email</label>
                                <input className={styles.registerBoxFormInput} type="email" id="email" required />
                            </div>
                            <div className={styles.registerBoxFormGroup}>
                                <label className={styles.registerBoxFormLabel} htmlFor="username">Username</label>
                                <input className={styles.registerBoxFormInput} type="text" id="username" required />
                            </div>
                            <div className={styles.registerBoxFormGroup}>
                                <label className={styles.registerBoxFormLabel} htmlFor="password">Password</label>
                                <input className={styles.registerBoxFormInput} type="password" id="password" required />
                            </div>

                            <button className={styles.registerBoxFormButton}>
                                Continue
                            </button>
                        </form>

                        <Link href="/auth/login">
                            <a className={styles.registerBoxLink}>Already have an account?</a>
                        </Link>
                    </div>
                </section>
            </main>
        </Fragment>
    )
}

export default Register;
