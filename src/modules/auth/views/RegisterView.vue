<template>
  <v-row class="w-100 h-100 bg-blue-darken-4" justify="center">
    <v-col cols="12" lg="4" md="6" xl="4">
      <v-sheet class="pa-12 bg-blue-darken-4 register-container" rounded>
        <v-card class="mx-auto w-100">
          <v-card-title>
            <p class="text-h5">{{ t('checkIn') }}</p>
            <div class="w-50 login-divider" />
          </v-card-title>

          <v-card-text>
            <v-form @submit="onSubmit">
              <v-text-field v-model="name" v-bind="nameAttrs" label="Nombre" required />

              <div class="text-red-darken-4 mb-3">
                {{ errors.name }}
              </div>

              <v-text-field
                v-model="email"
                v-bind="emailAttrs"
                :label="t('email')"
                required
                type="email"
              />

              <div class="text-red-darken-4 mb-3">
                {{ errors.email }}
              </div>

              <v-text-field
                v-model="password"
                v-bind="passwordAttrs"
                :label="t('password')"
                required
                type="password"
              />

              <div class="text-red-darken-4 mb-3">
                {{ errors.password }}
              </div>

              <v-text-field
                v-model="passwordConfirmation"
                v-bind="passwordConfirmationAttrs"
                :label="t('passwordConfirmation')"
                required
                type="password"
              />

              <div class="text-red-darken-4 mb-3">
                {{ errors.passwordConfirmation }}
              </div>

              <v-btn block class="mt-4" color="primary" type="submit"> Registrarse </v-btn>

              <div class="mt-4 text-center">
                <span class="text-body-2 blue-darken-4 mr-1">{{ t('alreadyAccount') }} </span>
                <RouterLink class="text-decoration" :to="{ name: 'login' }">
                  {{ t('loginIn') }}
                </RouterLink>
              </div>
            </v-form>
          </v-card-text>
        </v-card>
      </v-sheet>
    </v-col>
  </v-row>
</template>

<script lang="ts" setup>
  import { useForm } from 'vee-validate'
  import { useRouter } from 'vue-router'
  import { useI18n } from 'vue-i18n'
  import * as yup from 'yup'
  import { toTypedSchema } from '@vee-validate/yup'
  import type IRegisterDto from '@/modules/auth/interfaces/register_dto'
  import { emailFieldValidation, passwordFieldValidation } from '@/validation/validation_schema'
  import AuthRepositoryImp from '@/modules/auth/repository/auth_repository_imp'

  const validationSchema = yup.object({
    name: yup.string().required('El nombre es obligatorio').default(''),
    email: emailFieldValidation,
    password: passwordFieldValidation,
    passwordConfirmation: yup
      .string()
      .oneOf([yup.ref('password')], 'Las contraseñas deben coincidir')
      .required('La confirmación de la contraseña es obligatoria')
      .default(''),
  })

  const { errors, handleSubmit, defineField } = useForm({
    validationSchema: toTypedSchema(validationSchema),
  })

  const { t } = useI18n()

  const router = useRouter()

  const [name, nameAttrs] = defineField('name')

  const [email, emailAttrs] = defineField('email')

  const [password, passwordAttrs] = defineField('password')

  const [passwordConfirmation, passwordConfirmationAttrs] = defineField('passwordConfirmation')

  const onSubmit = handleSubmit(async values => {
    const { name, email, password, passwordConfirmation } = values

    const body: IRegisterDto = {
      email,
      name,
      password,
      c_password: passwordConfirmation,
    }

    const authRepository: AuthRepositoryImp = new AuthRepositoryImp()

    try {
      await authRepository.register(body).then(response => {
        if (response) {
          router.push({ name: 'login' })
        }
      })
    } catch (error) {
      console.error('Registration failed:', error)
    }
  })
</script>

<style scoped>
.register-container {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.login-divider {
  height: 2px;
  background-color: #1976d2;
  margin: 16px 0;
}

.text-decoration {
  color: #1976d2;
  cursor: pointer;
  font-weight: 500;
  text-decoration: none;
}
</style>
