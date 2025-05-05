import axios from '@/plugins/axios'
import type { IColorResponse } from '../interfaces/color_response'

export default class ColorService {
  private readonly baseUrl: string = 'https://api.takeit.ciph3r.co/api/v1'
  private readonly endpoint: string = 'colors'

  async getColors(): Promise<IColorResponse> {
    const response = await axios.get(`${this.baseUrl}/${this.endpoint}`)

    return response.data
  }
}
