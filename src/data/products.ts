export interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  category: "Hoodies" | "T-Shirts" | "Bottoms" | "Outerwear" | "Accessories";
  images: string[];
  description: string;
  sizes: string[];
  colors: string[];
  stock: number;
  isNew: boolean;
  isTrending?: boolean;
}

export const products: Product[] = [];
