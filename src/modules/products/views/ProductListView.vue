<template>
  <v-layout>
    <Navbar />
    <v-main>
      <v-container fluid>
        <v-row>
          <v-col cols="3" lg="3" md="3" xl="3">
            <ProductFilters @apply-filters="handleApplyFilters" />
          </v-col>
          <v-col cols="9" lg="8" md="6" xl="8">
            <v-card>
              <v-card-title>{{ t('productListTitle') }}</v-card-title>
              <v-card-text>
                <v-row>
                  <v-col
                    v-for="(product, index) in products"
                    :key="index"
                    cols="12"
                    md="4"
                    sm="6"
                  >
                    <v-card>
                      <v-img
                        cover
                        height="120px"
                        :src="
                          product.image?.url
                            ? product.image.url
                            : 'https://cdn.vuetifyjs.com/images/cards/house.jpg'
                        "
                      />
                      <v-card-title>{{ product.name }}</v-card-title>
                      <v-card-subtitle class="text-h6"> {{ product.price }} $ </v-card-subtitle>
                      <v-card-text>
                        {{ product.description }}
                      </v-card-text>
                      <v-card-actions>
                        <v-btn
                          block
                          border
                          color="primary"
                          :text="t('productAddToCart')"
                          @click="handleAddToCart(product)"
                        />
                      </v-card-actions>
                    </v-card>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-layout>
</template>

<script lang="ts" setup>
  import { onMounted, type Ref, ref } from 'vue'
  import { useI18n } from 'vue-i18n'
  import type { IProduct } from '@/modules/products/interfaces/shop_response'
  import type { ProductFilter } from '@/modules/products/interfaces/product_filter'
  import { useCartStore } from '@/store/cart'
  import ProductRepositoryImp from '@/modules/products/repository/product_repository_imp'
  import ProductFilters from '@/modules/products/components/ProductFilters.vue'
  import type { ProductQueryParams } from '@/modules/products/interfaces/product_query_params'
  import Navbar from '@/ui/Navbar.vue'

  const { t } = useI18n()

  const store = useCartStore()

  const isLoading = ref(true)

  const isCartUpdated = ref(false)

  const productRepository = new ProductRepositoryImp()

  const products: Ref<IProduct[]> = productRepository.getProducts()

  const username = ref<string | null>(null)

  onMounted(() => {
    handleGetProducts()
    const user = localStorage.getItem('user')
    if (user) {
      username.value = JSON.parse(user).name
    }
  })

  const handleGetProducts = async (params: ProductQueryParams = {}) => {
    isLoading.value = true
    await productRepository.getShop(params)
    isLoading.value = false
  }

  const handleAddToCart = (product: IProduct) => {
    store.addToCart(product)
    isCartUpdated.value = true
  }

  const handleApplyFilters = (event: ProductFilter) => {
    handleGetProducts({
      color_uuid: event.color,
      brand_uuid: event.brand,
      category_uuid: event.category,
      search_key: event.name,
    })
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
