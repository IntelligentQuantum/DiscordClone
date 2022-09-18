import { Fragment, useState, ChangeEvent } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';

import styles from '../../styles/register.module.scss';

const defaultForm =
{
    email: '',
    username: '',
    password: '',
}

const Register: NextPage = () =>
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
                <title>Register Page</title>
            </Head>
            <main>
                <section className={styles.register}>
                    <div className={styles.registerBox}>
                        <h1 className={styles.registerBoxHeading}>Create an account</h1>
                        <form className={styles.registerBoxForm} onSubmit={handleSubmit}>
                            <div className={styles.registerBoxFormGroup}>
                                <label className={styles.registerBoxFormLabel} htmlFor='email'>Email</label>
                                <input
                                    className={styles.registerBoxFormInput}
                                    type='email'
                                    id='email'
                                    name='email'
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className={styles.registerBoxFormGroup}>
                                <label className={styles.registerBoxFormLabel} htmlFor='username'>Username</label>
                                <input
                                    className={styles.registerBoxFormInput}
                                    type='text'
                                    id='username'
                                    name='username'
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className={styles.registerBoxFormGroup}>
                                <label className={styles.registerBoxFormLabel} htmlFor='password'>Password</label>
                                <input
                                    className={styles.registerBoxFormInput}
                                    type='password'
                                    id='password'
                                    name='password'
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <button className={styles.registerBoxFormButton} type='submit'>
                                Continue
                            </button>
                        </form>

                        <Link href='/auth/login'>
                            <a className={styles.registerBoxLink}>Already have an account?</a>
                        </Link>
                    </div>
                </section>
            </main>
        </Fragment>
    )
}

export default Register;
