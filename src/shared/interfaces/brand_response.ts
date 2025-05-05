
export interface IBrandResponse {
  data:    IBrand[];
  links:   Links;
  meta:    Meta;
  message: string;
  success: boolean;
}

export interface IBrand {
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
  public static toIBrandResponse(json: string): IBrandResponse {
      return JSON.parse(json);
  }

  public static IBrandResponseToJson(value: IBrandResponse): string {
      return JSON.stringify(value);
  }
}
