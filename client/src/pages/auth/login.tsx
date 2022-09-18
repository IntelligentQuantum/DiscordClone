import { ChangeEvent, Fragment, useState } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';

import styles from '../../styles/login.module.scss';

const defaultForm =
{
    email: '',
    password: ''
}

const Login: NextPage = () =>
{
    const [form, setForm] = useState(defaultForm);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) =>
    {
        setForm({...form, [e.target.name]: e.target.value});
    }

    const handleSubmit = (e: ChangeEvent<HTMLFormElement>) =>
    {
        e.preventDefault();
    }

    return (
        <Fragment>
            <Head>
                <title>Login Page</title>
            </Head>
            <main>
                <section className={styles.login}>
                    <div className={styles.loginBox}>
                        <h1 className={styles.loginBoxHeading}>Welcome Back!</h1>
                        <form className={styles.loginBoxForm} onSubmit={handleSubmit}>
                            <div className={styles.loginBoxFormGroup}>
                                <label className={styles.loginBoxFormLabel} htmlFor='email'>Email</label>
                                <input
                                    className={styles.loginBoxFormInput}
                                    type='email'
                                    id='email'
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className={styles.loginBoxFormGroup}>
                                <label className={styles.loginBoxFormLabel} htmlFor='password'>Password</label>
                                <input
                                    className={styles.loginBoxFormInput}
                                    type='password'
                                    id='password'
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <button className={styles.loginBoxFormButton}>
                                Continue
                            </button>
                        </form>

                        <Link href='/auth/register'>
                            <a className={styles.loginBoxLink}>Register</a>
                        </Link>
                    </div>
                </section>
            </main>
        </Fragment>
    )
}

export default Login;
