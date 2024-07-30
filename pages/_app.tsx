import '../app/globals.css'
import { AppProps } from 'next/app'
import SessionProvider from '../app/SessionProvider'; // Adjust the path if necessary

const App = ({ Component, pageProps }: AppProps) => {
  // Fetch the session on the server side if necessary
  // For client-side only apps, you might not need this
  const session = pageProps.session || undefined;

  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
};

export default App