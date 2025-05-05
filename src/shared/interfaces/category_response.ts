export interface ICategoryResponse {
  data:    ICategory[];
  links:   Links;
  meta:    Meta;
  message: string;
  success: boolean;
}

export interface ICategory {
  id:          number;
  uuid:        string;
  name:        string;
  slug:        string;
  description: string;
  status:      number;
  image:       string;
  created_at:  null;
  updated_at:  null;
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
  public static toICategoryResponse(json: string): ICategoryResponse {
      return JSON.parse(json);
  }

  public static ICategoryResponseToJson(value: ICategoryResponse): string {
      return JSON.stringify(value);
  }
}
