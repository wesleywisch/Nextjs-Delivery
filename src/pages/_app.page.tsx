import type { AppProps } from 'next/app'

import { AppContextProvider } from '../contexts/app'
import { AuthContextProvider } from '../contexts/auth'

import { GlobalStyle } from '../styles/globalStyles'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthContextProvider>
      <AppContextProvider>
        <GlobalStyle />
        <Component {...pageProps} />
      </AppContextProvider>
    </AuthContextProvider>
  )
}
