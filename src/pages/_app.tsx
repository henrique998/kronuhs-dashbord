import type { AppProps } from 'next/app';
import { Toaster } from 'react-hot-toast';
import { Providers } from '../contexts/Providers';
import { GlobalStyle } from '../styles/global';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Providers>
      <Component {...pageProps} />
      <Toaster />
      <GlobalStyle />
    </Providers>
  );
}

export default MyApp
