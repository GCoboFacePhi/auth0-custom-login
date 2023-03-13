import { FlexContainer } from '@facephi/ui-flex-container'
import { Input } from '@facephi/ui-input'
import { Label } from '@facephi/ui-label'
import { Logo } from '@facephi/ui-logo'
import { useToast } from '@facephi/ui-toast'
import { yupResolver } from '@hookform/resolvers/yup/dist/yup.js'
import { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import {
  Layout,
  StyledButtonLogin,
  StyledForgotPassword,
  StyledPasswordInput,
} from '../components'
import { useAuth } from '../providers'
import { RoutesName } from '../state/constants'
import { LoginDTO, loginSchema } from '../state/model'

const Login = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { toastManager } = useToast()
  const { login: loginWithEmail } = useAuth()

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginDTO>({
    resolver: yupResolver(loginSchema),
  })

  async function onSubmit(data: LoginDTO) {
    try {
      await loginWithEmail(data.email, data.password)
    } catch (err) {
      err &&
        toastManager({
          type: 'error',
          message: err as string,
        })
    }
  }

  useEffect(() => {
    if (window.location.pathname.includes('reset')) {
      navigate(RoutesName.resetPassword)
    }
  }, [])

  return (
    <Layout>
      <Logo black={false} height="7.2rem" width="7.2rem" />
      <Label as="h3" fontSize="18" negative textAlign="center">
        {t('Create your workflow and customize it')}
        <br />
        {t('Bring your ideas to life')}
      </Label>
      <FlexContainer
        flexDirection="column"
        as="form"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              iconLeft="Envelope"
              label={t('Email') as string}
              variant="secondary"
              errorLabel={
                t(`${errors.email ? errors.email?.message : ''}`) as string
              }
            />
          )}
        />
        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <StyledPasswordInput
              {...field}
              iconLeft="Lock"
              label={t('Password') as string}
              type="password"
              variant="secondary"
              errorLabel={
                t(
                  `${errors.password ? errors.password?.message : ''}`,
                ) as string
              }
            />
          )}
        />
        <StyledForgotPassword
          variant="text"
          color="white"
          onClick={() => navigate(RoutesName.forgotPassword)}
        >
          {t('Forgot password')}
        </StyledForgotPassword>
        <StyledButtonLogin type="submit" fullWidth>
          {t('Login')}
        </StyledButtonLogin>
      </FlexContainer>
    </Layout>
  )
}

export default Login
