<template>
  <v-app-bar color="blue-accent-4">
    <template #image>
      <v-img gradient="to top right, rgba(19,84,122,.8), rgba(128,208,199,.8)" />
    </template>

    <v-app-bar-title>
      {{ t('appTitle') }}
    </v-app-bar-title>

    <v-spacer />

    <v-btn icon>
      <v-icon> mdi-account </v-icon>
    </v-btn>

    <div v-if="username" class="text-white text-h6 mr-2">{{ t('welcome') }}, {{ username }}</div>

    <v-divider inset vertical />

    <v-btn icon @click="goToCart">
      <v-badge bordered color="red" :content="store.getCart.length" overlap>
        <v-btn icon>
          <v-icon :class="{ 'cart-animate': isCartUpdated }" @animationend="isCartUpdated = false">
            mdi-cart
          </v-icon>
        </v-btn>
      </v-badge>
    </v-btn>

    <v-divider inset vertical />

    <v-btn icon @click="logout">
      <v-icon> mdi-logout </v-icon>
    </v-btn>

    <v-icon icon="md:home" />
  </v-app-bar>
</template>

<script lang="ts" setup>
  import { onMounted, ref } from 'vue'
  import { useI18n } from 'vue-i18n'
  import { useRouter } from 'vue-router'
  import { useCartStore } from '@/store/cart'
  import TokenService from '@/shared/services/token_service'

  const { t } = useI18n()

  const router = useRouter()

  const store = useCartStore()

  const username = ref<string | null>(null)

  const isCartUpdated = ref(false)

  onMounted (() => {
    const user = localStorage.getItem('user')
    if (user) {
      username.value = JSON.parse(user).name
    }
  })

  const logout = () => {
    const tokenService = new TokenService();
    tokenService.removeAuthToken()
    localStorage.removeItem('user')
    router.push({ name: 'login' })
  }

  const goToCart = () => {
    router.push({ name: 'cart' })
  }
</script>

<style scoped>
.spacing {
  padding: 16px;
}

@keyframes bounce {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

.cart-animate {
  animation: bounce 0.5s ease;
}
</style>
