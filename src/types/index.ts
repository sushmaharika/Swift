export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  username: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
}

export interface Comment {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}

export interface SortConfig {
  field: keyof Pick<Comment, 'postId' | 'name' | 'email'> | null;
  direction: 'asc' | 'desc' | null;
}

export interface PaginationConfig {
  currentPage: number;
  pageSize: number;
  totalItems: number;
}

export interface FilterConfig {
  search: string;
  searchFields: Array<'name' | 'email' | 'body'>;
}