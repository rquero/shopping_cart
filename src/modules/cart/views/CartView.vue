<template>
  <v-container>
    <div class="cart-header">
      <v-btn color="primary" icon @click="goBack">
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>

      <h1 class="text-h4">{{ t('shoppingCartTitle') }}</h1>
    </div>
    <v-data-table class="elevation-1" :headers="headers" item-value="id" :items="cartItems">
      <template #item.image="{ item }">
        <v-img
          contain
          max-height="80"
          max-width="80"
          :src="
            item.image?.url ? item.image.url : 'https://cdn.vuetifyjs.com/images/cards/house.jpg'
          "
        />
      </template>

      <template #item.name="{ item }">
        <span>{{ item.name }}</span>
      </template>

      <template #item.price="{ item }">
        <span>{{ item.price }} $</span>
      </template>

      <template #item.description="{ item }">
        <span>{{ item.description }}</span>
      </template>

      <template #item.actions="{ item }">
        <v-btn color="red" icon @click="store.removeFromCart(item.id)">
          <v-icon>mdi-delete</v-icon>
        </v-btn>
      </template>
    </v-data-table>
  </v-container>
</template>

<script lang="ts" setup>
  import { useRouter } from 'vue-router'
  import { useI18n } from 'vue-i18n'
  import { useCartStore } from '@/store/cart'

  const { t } = useI18n()
  const store = useCartStore()
  const cartItems = store.cart

  const headers: Array<{
    text: string;
    value: string;
    align?: 'start' | 'center' | 'end';
    sortable?: boolean;
  }> = [
    { text: 'Imagen', value: 'image', align: 'start', sortable: true },
    { text: 'Nombre', value: 'name', align: 'start', sortable: true },
    { text: 'Precio', value: 'price', align: 'start', sortable: true },
    { text: 'Descripción', value: 'description', align: 'start', sortable: true },
    { text: 'Acciones', value: 'actions', align: 'end', sortable: false },
  ]

  const router = useRouter()

  const goBack = () => {
    router.go(-1)
  }
</script>

<style scoped>
.cart-header {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  gap: 14px;
}

.cart-title {
  font-size: 24px;
  font-weight: bold;
}
</style>
