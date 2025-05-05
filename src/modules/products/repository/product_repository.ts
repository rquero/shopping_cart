import type { ProductQueryParams } from '../interfaces/product_query_params';

export default abstract class ProductRepositoryInterface {
  abstract getShop (queryParams: ProductQueryParams): Promise<unknown>
}
