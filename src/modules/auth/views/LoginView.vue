<template>
  <v-app-bar class="bg-blue-darken-4 elevation-0">
    <v-spacer />

    <v-switch
      v-model="isDarkMode"
      class="theme-switch ml-2 mr-2"
      hide-details
      inset
      @change="toggleDarkMode"
    >
      <template #label>
        <v-icon>{{ isDarkMode ? 'mdi-weather-night' : 'mdi-white-balance-sunny' }}</v-icon>
      </template>
    </v-switch>

    <v-select
      v-model="currentLocale"
      class="language-selector ml-2 mr-2"
      :items="locales"
      :label="t('selectLanguage')"
      @update:model-value="onUpdateModelValue"
    />
  </v-app-bar>

  <v-row align="center" class="w-100 h-100 bg-blue-darken-4" justify="center">
    <v-col cols="12" lg="4" md="6" xl="4">
      <v-alert
        v-if="showAlert"
        closable
        dismissible
        :text="formAlert.text"
        :title="formAlert.title"
        :type="formAlert.type"
        @input="showAlert = false"
      />

      <v-sheet class="pa-12 bg-blue-darken-4 login_container" rounded>
        <v-card class="mx-auto w-100">
          <v-card-title>
            <p class="text-h5">{{ t('loginIn') }}</p>
            <div class="w-50 login-divider" />
          </v-card-title>

          <v-card-text>
            <v-form @submit="onSubmit">
              <v-text-field
                v-model="email"
                class="custom-text-field"
                :label="t('email')"
                prepend-inner-icon="mdi-email"
                required
                type="email"
              />

              <div class="text-red-darken-4 mb-3">
                {{ errors.email }}
              </div>

              <v-text-field
                v-model="password"
                :label="t('password')"
                prepend-inner-icon="mdi-lock"
                required
                type="password"
              />

              <div class="text-red-darken-4 mb-3">
                {{ errors.password }}
              </div>

              <v-btn
                block
                class="mt-4"
                color="primary"
                :disabled="isSubmitting"
                :loading="isSubmitting"
                type="submit"
              >
                {{ t('loginIn') }}
              </v-btn>

              <div class="mt-4 text-center">
                <span class="text-body-2 blue-darken-4 mr-1">{{ t('notAccount') }} </span>
                <RouterLink class="text-decoration" :to="{ name: 'register' }">
                  {{ t('register') }}
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
  import * as yup from 'yup'
  import { toTypedSchema } from '@vee-validate/yup'
  import { RouterLink, useRouter } from 'vue-router'
  import { ref, type Ref } from 'vue'
  import type { IAlert } from '@/shared/interfaces/alert'
  import type ILoginDto from '@/modules/auth/interfaces/login_dto'
  import AuthRepositoryImp from '@/modules/auth/repository/auth_repository_imp'
  import { emailFieldValidation, passwordFieldValidation } from '@/validation/validation_schema'
  import { Constant } from '@/core/constants/constants'
  import { useI18n } from 'vue-i18n'
  import { useTheme } from 'vuetify'

  const theme = useTheme()

  // Función para alternar entre modo oscuro y claro
  const toggleDarkMode = () => {
    theme.global.name.value = isDarkMode.value ? 'dark' : 'light'
  }

  const validationSchema = yup.object({
    email: emailFieldValidation,
    password: passwordFieldValidation,
  })

  const { errors, handleSubmit, defineField, isSubmitting } = useForm({
    validationSchema: toTypedSchema(validationSchema),
  })

  const formAlert: Ref<IAlert> = ref({
    title: '',
    text: '',
    type: undefined,
  })

  const locales = ['en', 'es']

  const { locale, t } = useI18n()

  const isDarkMode = ref(false)

  const currentLocale = ref(locale.value)

  const router = useRouter()

  const formStatus: Ref<boolean> = ref(false)

  const showAlert = ref(false)

  const [email] = defineField('email')

  const [password] = defineField('password')

  const onSubmit = handleSubmit(async values => {
    return new Promise(resolve => {
      const { email, password } = values

      const body: ILoginDto = {
        email,
        password,
      }

      const handleLogin = async () => {
        try {
          const authRepository: AuthRepositoryImp = new AuthRepositoryImp()

          const response: boolean = await authRepository.login(body)
          showAlert.value = true

          formAlert.value = {
            title: response ? Constant.loginAlertSuccess : Constant.loginAlertError,
            text: response ? Constant.loginAlertTextSuccess : Constant.loginAlertTextError,
            type: response ? 'success' : 'error',
          }

          if (response) {
            formStatus.value = true
            setTimeout(() => {
              router.push('/products')
            }, 2000)
          } else {
            formStatus.value = false
          }
        } catch {
          formStatus.value = false
          showAlert.value = true
        }

        resolve(true)
      }

      handleLogin()
    })
  })

  const changeLanguage = (lang: string) => {
    locale.value = lang
    currentLocale.value = lang
  }

  const onUpdateModelValue = (value: string) => {
    changeLanguage(value)
  }
</script>

<style scoped>
.login_container {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.language-selector {
  max-width: 150px;
}

.custom-text-field .v-input__control {
  font-size: 14px;
}

.text-link {
  color: #1976d2;
  cursor: pointer;
  font-weight: 500;
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
