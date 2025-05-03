export interface ProductFormValues {
  name?: string;
  description?: string;
  price?: number;
  stock?: number;
}

export interface CustomerFormValue {
  address: string;
  email: string;
  full_name: string;
  phone: string;
}
export interface Products extends ProductFormValues {
  [x: string]: string | number | Date;
  id: string;
}

export interface Customers extends CustomerFormValue {
  id: string;
  user_id: string;
}

export interface Customer {
  id: string;
  full_name: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
}
