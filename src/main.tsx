import { Spinner } from '@facephi/ui-spinner'
import { InphiniteThemeProvider } from '@facephi/ui-theme'
import { ToastProvider } from '@facephi/ui-toast'
import React, { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import './i18n'
import './index.css'
import LoginPage from './pages/Login'
import ResetPassword from './pages/ResetPassword'
import { AuthProvider, TranslationProvider } from './providers'

const rootElement = document.getElementById('root')
const resetElement = document.getElementById('reset-password')

let content = null
if (rootElement) {
  content = <LoginPage />
} else if (resetElement) {
  content = <ResetPassword />
}

const targetElement = rootElement || resetElement

ReactDOM.createRoot(targetElement as HTMLElement).render(
  <React.StrictMode>
    <InphiniteThemeProvider>
      <TranslationProvider>
        <AuthProvider>
          <ToastProvider>
            <Suspense fallback={<Spinner />}>{content}</Suspense>
          </ToastProvider>
        </AuthProvider>
      </TranslationProvider>
    </InphiniteThemeProvider>
  </React.StrictMode>,
)
