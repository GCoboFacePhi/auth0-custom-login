import { InphiniteThemeProvider } from '@facephi/ui-theme'
import { ToastProvider } from '@facephi/ui-toast'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import './i18n'
import './index.css'
import { AuthProvider, TranslationProvider } from './providers'
import { Routes } from './routes/Routes'

const rootElement = document.getElementById('root')

ReactDOM.createRoot(rootElement as HTMLElement).render(
  <React.StrictMode>
    <InphiniteThemeProvider>
      <TranslationProvider>
        <AuthProvider>
          <ToastProvider>
            <RouterProvider router={Routes} />
          </ToastProvider>
        </AuthProvider>
      </TranslationProvider>
    </InphiniteThemeProvider>
  </React.StrictMode>,
)
