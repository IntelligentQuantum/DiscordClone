import { Fragment } from 'react';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { Provider } from 'react-redux';

import { store } from '../redux/app/store';
import '../utils/axios.util';

import '../styles/globals.scss';

function MyApp({ Component, pageProps }: AppProps)
{
    return (
        <Fragment>
            <Head>
                <meta charSet="UTF-8" />
                <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0" />
                <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
            </Head>
            <Provider store={store}>
                <Component {...pageProps} />
            </Provider>
        </Fragment>
    );
}

export default MyApp;
