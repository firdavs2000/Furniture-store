import { useQuery, UseQueryResult } from '@tanstack/react-query';
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://dummyjson.com/',
});

interface Product {
  rating: number;
  stock: number;
  id: number;
  title: string;
  price: number;
  images?: string[];
  discountPercentage: number;
  rate: number;
  description: string;
  category: string;
}

interface ProductData {
  limit: number;
  products: Product[];
  skip: number;
  total: number;
}

interface UseProductsOptions {
  page?: number;
  limit?: number;
  search?: string;
  sort?: string;
}

export const useProducts = ({
  page = 1,
  limit = 12,
  search = '',
  sort = '',
}: UseProductsOptions): UseQueryResult<ProductData, Error> => {
  const skip = (page - 1) * limit;

  return useQuery<ProductData, Error>({
    queryKey: ['products', page, search, sort],
    queryFn: async () => {
      let url = search.trim()
        ? `products/search?q=${encodeURIComponent(search)}&limit=${limit}`
        : `products?limit=${limit}&skip=${skip}`;
      if (sort) {
        url += `&sortBy=${sort}&order=asc`
      }

      const res = await api.get(url);
      return res.data;
    },
  });
};

// Mahsulot ID bo‘yicha olish
export const useProductById = (
  id: string | number
): UseQueryResult<Product, Error> => {
  return useQuery<Product, Error>({
    queryKey: ['product', id],
    queryFn: async () => {
      const res = await api.get<Product>(`products/${id}`);
      return res.data;
    },
    enabled: !!id,
  });
};



export default api;
