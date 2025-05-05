import { ref, type Ref } from 'vue';
import type { IProduct } from '../interfaces/shop_response';
import ProductService from '../services/product_service'
import ProductRepositoryInterface from './product_repository'
import type { ProductQueryParams } from '../interfaces/product_query_params';

export default class ProductRepositoryImp extends ProductRepositoryInterface {
  private readonly productService: ProductService;
  private readonly products: Ref<IProduct[]>;

  constructor () {
    super()
    this.productService = new ProductService();
    this.products = ref([]);
  }

  getProducts (): Ref<IProduct[]> {
    return this.products;
  }

  async getShop (queryParams: ProductQueryParams): Promise<void> {
    try {

      const filteredQueryParams = Object.fromEntries(
        Object.entries(queryParams).filter(([, value]) => value !== undefined && value !== null)
      );

      const response = await this.productService.getShop({
        per_page: 0,
        ...filteredQueryParams,
      });
      if (response && response.data) {
        const { data } = response;
        this.products.value = data;
      }
    } catch (error) {
      console.log(error);
    }
  }
}
