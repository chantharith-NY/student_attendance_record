// filepath: /frontend/pages/_app.js
import Head from 'next/head';
import '../styles/global.css';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        {/* Removed Tailwind CSS CDN link */}
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;