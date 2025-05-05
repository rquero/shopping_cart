import AuthRepositoryInterface from './auth_repository'
import type ILoginDto from '../interfaces/login_dto'
import type IRegisterDto from '../interfaces/register_dto'
import AuthService from '../services/auth_service'
import type { LoginResponse, User } from '../interfaces/login_response'
import type { IRegisterResponse } from '../interfaces/register_response'

export default class AuthRepositoryImp extends AuthRepositoryInterface {
  private readonly authService: AuthService

  constructor() {
    super()
    this.authService = new AuthService()
  }

  async login(credencial: ILoginDto): Promise<boolean> {
    try {
      const response = await this.authService.login(credencial)

      if (response && response.data) {
        const loginResponse: LoginResponse = response

        const { token, user } = loginResponse.data

        this.handleSession(token, user)

        return true
      }
    } catch (error) {
      console.error('Error during login:', error)
      return false
    }

    return false
  }

  async register(register: IRegisterDto): Promise<boolean> {
    console.log(register)
    try {
      const response = await this.authService.register(register)

      if (response && response.data) {
        const registerResponse: IRegisterResponse = response

        return registerResponse.success;
      }
    } catch (error) {
      console.error('Error during login:', error)
      return false
    }

    return false
  }

  logout(): Promise<void> {
    throw new Error('Method not implemented.')
  }

  handleSession = (token: string, user: User) => {
    this.setToken(token)
    this.setUser(user)
  }

  setToken = (token: string) => {
    localStorage.setItem('authToken', token)
  }

  setUser = (user: User) => {
    localStorage.setItem('user', JSON.stringify(user))
  }
}
