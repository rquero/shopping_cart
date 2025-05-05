export default class TokenService {

  getAuthToken(): string | null {
    const token = localStorage.getItem('authToken')
    return token ? token : null
  }

  setAuthToken(token: string): void {
    localStorage.setItem('authToken', JSON.stringify(token))
  }

  removeAuthToken(): void {
    localStorage.removeItem('authToken')
  }
}
