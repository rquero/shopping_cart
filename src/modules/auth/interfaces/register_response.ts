export interface IRegisterResponse {
  success: boolean;
  data:    Data;
  message: string;
}

export interface Data {
  token: string;
  name:  string;
  user:  User;
}

export interface User {
  id:            number;
  uuid:          string;
  name:          string;
  email:         string;
  avatar:        null;
  address:       null;
  phone:         null;
  status:        null;
  punctuation:   null;
  bulk_products: null;
  bulk_offer:    null;
  role_id:       number;
  password:      string;
  rating:        null;
}

// Converts JSON strings to/from your types
export class Convert {
  public static toRegisterResponse(json: string): IRegisterResponse {
      return JSON.parse(json);
  }

  public static registerResponseToJson(value: IRegisterResponse): string {
      return JSON.stringify(value);
  }
}
