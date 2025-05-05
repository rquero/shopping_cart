import axios from '@/plugins/axios'
import type { IBrandResponse } from '../interfaces/brand_response'

export default class BrandService {
  private readonly baseUrl: string = 'https://api.takeit.ciph3r.co/api/v1'
  private readonly endpoint: string = 'brands'

  async getBrands(): Promise<IBrandResponse> {
    const response = await axios.get(`${this.baseUrl}/${this.endpoint}`)

    return response.data
  }
}
