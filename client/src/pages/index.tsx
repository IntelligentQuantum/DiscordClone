import { Fragment, useEffect } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import axios from 'axios';

import { currentAccount } from '../redux/features/auth/auth-slice';
import { useAppDispatch } from '../redux/app/hooks';

import styles from '../styles/register.module.scss';

const Home: NextPage = () =>
{
    const dispatch = useAppDispatch();

    useEffect(() =>
    {
        (
            async () =>
            {
                try
                {
                    const { data } = await axios.get('auth/me');
                    dispatch(currentAccount(data));
                }
                catch (exception: any)
                {
                    console.log(exception);
                }
            }
        )();
    }, []);

    return (
        <Fragment>
            <Head>
                <title>Create Next App</title>
            </Head>
        </Fragment>
    )
}

export default Home;
