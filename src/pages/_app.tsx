import Layout from '@/components/layout/layout.component';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Head>
        <title>Bonus Calculator</title>
        <meta
          name="description"
          content="Bonus calculator for warehouse worker"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Component {...pageProps} />
    </Layout>
  );
}
