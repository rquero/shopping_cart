import axios from '@/plugins/axios'
import type { ICategoryResponse } from '../interfaces/category_response'

export default class CategoryService {
  private readonly baseUrl: string = 'https://api.takeit.ciph3r.co/api/v1'
  private readonly endpoint: string = 'categories'

  async getCategories(): Promise<ICategoryResponse> {
    const response = await axios.get(`${this.baseUrl}/${this.endpoint}`)

    return response.data
  }
}
