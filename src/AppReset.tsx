import { Spinner } from '@facephi/ui-spinner'
import { InphiniteThemeProvider } from '@facephi/ui-theme'
import { ToastProvider } from '@facephi/ui-toast'
import { Suspense } from 'react'
import './i18n'
import ResetPassword from './pages/ResetPassword'
import { AuthProvider, TranslationProvider } from './providers'

function AppReset() {
  return (
    <InphiniteThemeProvider>
      <TranslationProvider>
        <AuthProvider>
          <ToastProvider>
            <Suspense fallback={<Spinner />}>
              <ResetPassword />
            </Suspense>
          </ToastProvider>
        </AuthProvider>
      </TranslationProvider>
    </InphiniteThemeProvider>
  )
}

export default AppReset
