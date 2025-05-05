import axios from '@/plugins/axios'
import type ILoginDto from '../interfaces/login_dto'
import type IRegisterDto from '../interfaces/register_dto'

export default class AuthService {
  private readonly baseUrl: string = 'https://api.takeit.ciph3r.co/api/v1';

  constructor() {
    // Initialization code if needed
  }

  async login(credencial: ILoginDto) {
    const response = await axios.post(`${this.baseUrl}/login`, credencial);

    return response.data
  }

  async register(register: IRegisterDto) {
    const response = await axios.post(`${this.baseUrl}/register`, register);

    return response.data
  }

  logout(): void {
    console.log('Logging out user')
  }

  isAuthenticated(): boolean {
    // Placeholder for actual authentication check
    return false
  }
}
