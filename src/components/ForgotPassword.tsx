import { FlexContainer } from '@facephi/ui-flex-container';
import { Input } from '@facephi/ui-input';
import { Label } from '@facephi/ui-label';
import { Logo } from '@facephi/ui-logo';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup.js';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Layout, StyledForgotButton } from '../components';
import { ForgotPasswordDTO, forgotPasswordSchema } from '../state/model';

type Props = {
  onSubmit(data: ForgotPasswordDTO): Promise<void>;
  onGoLogin(): void;
};

export const ForgotPassword = ({ onGoLogin, onSubmit }: Props) => {
  const { t } = useTranslation();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordDTO>({
    resolver: yupResolver(forgotPasswordSchema),
  });

  return (
    <Layout>
      <Logo black={false} height="7.2rem" width="7.2rem" />
      <Label as="h3" fontSize="18" negative textAlign="center">
        {t('ForgotPasswordMessage')}
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
              label={t('Email') as string}
              variant="secondary"
              errorLabel={
                t(`${errors.email ? errors.email?.message : ''}`) as string
              }
            />
          )}
        />
        <StyledForgotButton type="submit" fullWidth>
          {t('Send an access link')}
        </StyledForgotButton>
        <Label color="white" textAlign="center">
          {t('Or')}
          <Label
            as="a"
            color="purple200"
            style={{ cursor: 'pointer' }}
            onClick={onGoLogin}
          >
            {' '}
            {t('go to login')}
          </Label>
        </Label>
      </FlexContainer>
    </Layout>
  );
};
