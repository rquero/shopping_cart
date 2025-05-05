export interface IColorResponse {
  data:    IColor[];
  links:   Links;
  meta:    Meta;
  message: string;
  success: boolean;
}

export interface IColor {
  id:         number;
  uuid:       string;
  name:       string;
  hex:        string;
  status:     number;
  created_at: Date | null;
  updated_at: Date | null;
}

export interface Links {
  first: string;
  last:  string;
  prev:  null;
  next:  null;
}

export interface Meta {
  current_page: number;
  from:         number;
  last_page:    number;
  links:        Link[];
  path:         string;
  per_page:     number;
  to:           number;
  total:        number;
}

export interface Link {
  url:    null | string;
  label:  string;
  active: boolean;
}

// Converts JSON strings to/from your types
export class Convert {
  public static toColorResponse(json: string): IColorResponse {
      return JSON.parse(json);
  }

  public static colorResponseToJson(value: IColorResponse): string {
      return JSON.stringify(value);
  }
}
