import { Spinner } from '@facephi/ui-spinner'
import { InphiniteThemeProvider } from '@facephi/ui-theme'
import { ToastProvider } from '@facephi/ui-toast'
import { Suspense } from 'react'
import './i18n'
import LoginPage from './pages/Login'
import { AuthProvider, TranslationProvider } from './providers'

function App() {
  return (
    <InphiniteThemeProvider>
      <TranslationProvider>
        <AuthProvider>
          <ToastProvider>
            <Suspense fallback={<Spinner />}>
              <LoginPage />
            </Suspense>
          </ToastProvider>
        </AuthProvider>
      </TranslationProvider>
    </InphiniteThemeProvider>
  )
}

export default App
