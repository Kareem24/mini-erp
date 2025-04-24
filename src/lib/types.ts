export type Products = {
  id: string;
  name: string;
  price: number;
  stock: number;
  created_at: string;
  description: string;
};

export type ProductFormValues = {
  name: string;
  description: string;
  price: number;
  stock: number;
};
