import { FlexContainer } from '@facephi/ui-flex-container'
import { Input } from '@facephi/ui-input'
import { Label } from '@facephi/ui-label'
import { Logo } from '@facephi/ui-logo'
import { yupResolver } from '@hookform/resolvers/yup/dist/yup.js'
import { Controller, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { Layout, StyledButtonLogin, StyledPasswordInput } from '../components'
import { useAuth } from '../providers'
import { ResetPasswordDTO, resetPasswordSchema } from '../state/model'

const ResetPassword = () => {
  const { t } = useTranslation()
  const { resetPassword } = useAuth()

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordDTO>({
    resolver: yupResolver(resetPasswordSchema),
  })

  async function onSubmit(data: ResetPasswordDTO) {
    console.log(data)
    try {
      console.log('esta pasando')
      await resetPassword(data.newPassword)
      console.log('ha pasado')
    } catch (e) {
      console.log(e)
    }
  }

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
          name="newPassword"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              iconLeft="Lock"
              label={t('Insert new password') as string}
              type="password"
              variant="secondary"
              errorLabel={
                t(
                  `${errors.newPassword ? errors.newPassword?.message : ''}`,
                ) as string
              }
            />
          )}
        />
        <Controller
          name="confirmPassword"
          control={control}
          render={({ field }) => (
            <StyledPasswordInput
              {...field}
              iconLeft="Lock"
              label={t('Confirm password') as string}
              type="password"
              variant="secondary"
              errorLabel={
                t(
                  `${
                    errors.confirmPassword
                      ? errors.confirmPassword?.message
                      : ''
                  }`,
                ) as string
              }
            />
          )}
        />
        <StyledButtonLogin type="submit" fullWidth>
          {t('Resend')}
        </StyledButtonLogin>
      </FlexContainer>
    </Layout>
  )
}

export default ResetPassword
