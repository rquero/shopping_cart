<template>
  <v-card>
    <v-card-title>
      <p class="text-h5">{{ t('productFilterTitle') }}</p>
    </v-card-title>
    <v-card-text>
      <v-form @submit.prevent="onSearch">
        <!-- Filtro por Nombre -->
        <v-text-field
          v-model="name"
          :label="t('productName')"
          prepend-inner-icon="mdi-magnify"
          clearable
        ></v-text-field>

        <!-- Filtro por Categoría -->
        <v-select
          v-model="selectedCategory"
          :items="categories"
          :item-props="itemProps"
          :label="t('category')"
          prepend-inner-icon="mdi-tag"
          clearable
        >
          <template v-slot:selection="{ item, index }">
            <span
              class="text-grey text-caption align-self-center"
            >
            {{ item.props.title }}
            </span>
          </template>
        </v-select>

        <!-- Filtro por Marca -->
        <v-select
          v-model="selectedBrand"
          :items="brands"
          :item-props="itemProps"
          :label="t('brand')"
          prepend-inner-icon="mdi-factory"
          clearable
        >
          <template v-slot:selection="{ item, index }">
            <span
              class="text-grey text-caption align-self-center"
            >
            {{ item.props.title }}
            </span>
          </template>
        </v-select>

        <!-- Filtro por Color -->
        <v-select
          v-model="selectedColor"
          :items="colors"
          :item-props="itemProps"
          :label="t('color')"
          prepend-inner-icon="mdi-palette"
          clearable
        >
          <template v-slot:selection="{ item, index }">
            <span
              class="text-grey text-caption align-self-center"
            >
            {{ item.props.title }}
            </span>
          </template>
        </v-select>

        <v-btn type="submit" color="primary" block>
          <v-icon left>mdi-magnify</v-icon>
          {{ t('search') }}
        </v-btn>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script lang="ts" setup>
import ColorService from '@/shared/services/color_service';
import { ref, onMounted, defineEmits } from 'vue'
import { useI18n } from 'vue-i18n'
import type { IColor } from '@/shared/interfaces/color_response'
import type { IBrand } from '@/shared/interfaces/brand_response'
import type { ICategory } from '@/shared/interfaces/category_response'
import BrandService from '@/shared/services/brand_service';
import CategoryService from '@/shared/services/category_service';

const emit = defineEmits(['applyFilters'])

const { t } = useI18n()

const selectedColor = ref<IColor | null>(null);

const selectedBrand = ref<IColor | null>(null);

const selectedCategory = ref<IColor | null>(null);

const name = ref<string | null>(null);

const colors = ref<IColor[]>([]);

const brands = ref<IBrand[]>([]);

const categories = ref<ICategory[]>([]);

function itemProps (item: { id: number; name: string }) {
  return {
    title: item.name,
  }
}

onMounted(async () => {
  getColors();
  getBrands();
  getCategories();

})

const getColors = async () => {
  const colorService = new ColorService();

  try {
    const response = await colorService.getColors();
    if ( response ) {
      colors.value = response.data;
    }
  } catch(error) {

  }
}

const getBrands = async () => {
  const brandService = new BrandService();
  try {
    const response = await brandService.getBrands();
    if ( response ) {
      brands.value = response.data;
    }
  } catch(error) {

  }
}

const getCategories = async () => {
  const categoryService = new CategoryService();

  try {
    const response = await categoryService.getCategories();
    if ( response ) {
      categories.value = response.data;
    }
  } catch(error) {

  }
}

const onSearch = () => {
  const filters = {
    name: name.value,
    category: selectedCategory.value ? selectedCategory.value.name : '',
    brand: selectedBrand.value ? selectedBrand.value.name : '',
    color: selectedColor.value ? selectedColor.value.name : ''
  }
  console.log('Filtros aplicados:', filters);

  emit('applyFilters', {...filters});
}


</script>

<style scoped>
</style>