import { Provider } from 'react-redux'
import { store } from '../app/store'
import '../styles/globals.css'
import { SessionProvider as AuthProvider } from "next-auth/react"

const MyApp = ({ Component, pageProps }) => {
  return (
    <AuthProvider session={pageProps.session}>
      {/* Over here, we have imported SessionProvider and set the session. This means we give the entire app
      the access to the authentication state and can be used throughout the app. */}
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
    </AuthProvider>
  )
}

export default MyApp
