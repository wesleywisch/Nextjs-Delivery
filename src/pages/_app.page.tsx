import type { AppProps } from 'next/app'

import { AppContextProvider } from '../contexts/AppContext'

import { GlobalStyle } from '../styles/globalStyles'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AppContextProvider>
      <GlobalStyle />
      <Component {...pageProps} />
    </AppContextProvider>
  )
}
