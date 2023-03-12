import { useToast } from '@facephi/ui-toast'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
  ForgotPassword as ForgotPasswordComponent,
  Login as LoginComponent
} from '../components'
import { useAuth } from '../providers'
import { ForgotPasswordDTO, LoginDTO } from '../state/model'

const LoginPage = () => {
  const [showForgotPassword, setShowForgotPassword] = useState(false)
  const { t } = useTranslation()
  const { changePassword } = useAuth()
  const { toastManager } = useToast()
  const { login: loginWithEmail } = useAuth()

  async function onLogin(data: LoginDTO) {
    try {
      await loginWithEmail(data.email, data.password)
    } catch (err: any) {
      err &&
        toastManager({
          type: 'error',
          message: err.description,
        })
    }
  }

  async function onForgoPassword(data: ForgotPasswordDTO) {
    try {
      await changePassword(data.email)
      toastManager({
        type: 'success',
        message: t("Email sent"),
      })
      setShowForgotPassword(false)
    } catch (err: any) {
      err &&
        toastManager({
          type: 'error',
          message: err.description,
        })
    }
  }

  return showForgotPassword ? (
    <ForgotPasswordComponent
      onSubmit={onForgoPassword}
      onGoLogin={() => setShowForgotPassword(false)}
    />
  ) : (
    <LoginComponent
      onSubmit={onLogin}
      onGoForgotPassword={() => setShowForgotPassword(true)}
    />
  )
}

export default LoginPage
