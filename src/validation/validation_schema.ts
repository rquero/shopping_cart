import * as yup from 'yup'

export const emailFieldValidation = yup
  .string()
  .email('Correo electrónico inválido')
  .required('El correo electrónico es obligatorio')
  .default('')

export const passwordFieldValidation = yup
  .string()
  .min(6, 'La contraseña debe tener al menos 6 caracteres')
  .required('La contraseña es obligatoria')
