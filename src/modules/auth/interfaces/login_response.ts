export interface LoginResponse {
  success: boolean
  data: Data
  message: string
}

export interface Data {
  token: string
  name: string
  email: string
  user: User
}

export interface User {
  id: number
  uuid: string
  name: string
  email: string
  avatar: null
  address: string
  phone: string
  status: number
  punctuation: number
  bulk_products: number
  bulk_offer: number
  role_id: number
  password: string
  rating: number
}

// Converts JSON strings to/from your types
export class Convert {
  public static toLoginResponse(json: string): LoginResponse {
    return JSON.parse(json)
  }

  public static loginResponseToJson(value: LoginResponse): string {
    return JSON.stringify(value)
  }
}
