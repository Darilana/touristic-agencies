import { FC } from 'react';
import type { AppProps /*, AppContext */ } from 'next/app';

const MyApp: FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <div>
      <div>
        <h1>Header</h1>
      </div>
      <div>
        <Component {...pageProps} />
      </div>
    </div>
  );
};

export default MyApp;
