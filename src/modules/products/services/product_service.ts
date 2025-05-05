import axios from '@/plugins/axios'
import type { IShopResponse } from '../interfaces/shop_response';

export default class ProductService {
  private readonly baseUrl: string = 'https://api.takeit.ciph3r.co/api/v1';

  async getShop(queryParams: Record<string, any>): Promise<IShopResponse> {
    const response = await axios.get(`${this.baseUrl}/shop`, {
      params: queryParams
    });

    return response.data
  }
}
