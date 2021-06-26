import type { AppProps } from 'next/app';

import '../styles/globals.css';

import { AuthContextProvider } from '../contexts/AuthContext';

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <AuthContextProvider>
            <Component {...pageProps} />
        </AuthContextProvider>
    );
}
export default MyApp;
