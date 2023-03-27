import * as yup from 'yup';

export type LoginDTO = {
  email: string;
  password: string;
};

export type ResetPasswordDTO = {
  newPassword: string;
  confirmPassword: any;
};

export type ForgotPasswordDTO = Pick<LoginDTO, 'email'>;

export const loginSchema: yup.SchemaOf<LoginDTO> = yup.object().shape({
  email: yup
    .string()
    .email('This field must be an email')
    .required('Email is a required field'),
  password: yup.string().required('Password is a required field'),
});

export const resetPasswordSchema: yup.SchemaOf<ResetPasswordDTO> = yup
  .object()
  .shape({
    newPassword: yup.string().required('Password is a required field'),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('newPassword'), null], 'Passwords must match'),
  });

export const forgotPasswordSchema: yup.SchemaOf<ForgotPasswordDTO> = yup
  .object()
  .shape({
    email: yup
      .string()
      .email('This field must be an email')
      .required('Email is a required field'),
  });
