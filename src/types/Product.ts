import { CategoryProduct } from "./CategoryProduct";

export type Product = {
  id: string;
  image: string;
  category: CategoryProduct;
  name: string;
  price: number;
  description?: string;
}
