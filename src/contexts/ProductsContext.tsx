import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { debounce } from 'lodash';
import { productsAPI } from '../services/api';

interface Product {
  _id: string;
  title: string;
  description: string;
  price: number;
  currency: string;
  stock: number;
  images: string[];
  category: string;
  createdAt: string;
  updatedAt: string;
}

interface ProductsContextType {
  products: Product[];
  featuredProducts: Product[];
  loading: boolean;
  initialLoading: boolean;
  error: string | null;
  categories: string[];
  selectedCategory: string;
  searchTerm: string;
  currentPage: number;
  totalPages: number;
  totalProducts: number;
  setSelectedCategory: (category: string) => void;
  setSearchTerm: (term: string) => void;
  setCurrentPage: (page: number) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  fetchProducts: (params?: any) => Promise<void>;
}

const ProductsContext = createContext<ProductsContextType | undefined>(undefined);

export const useProducts = () => {
  const context = useContext(ProductsContext);
  if (context === undefined) {
    throw new Error('useProducts must be used within a ProductsProvider');
  }
  return context;
};

interface ProductsProviderProps {
  children: ReactNode;
}

export const ProductsProvider: React.FC<ProductsProviderProps> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>(['Todos']);
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [totalProducts, setTotalProducts] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [initialLoading, setInitialLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const fetchProducts = useCallback(async (params: any = {}) => {
    try {
      setLoading(true);
      setError(null);

      const queryParams = {
        ...params,
        page: currentPage,
        limit: 12,
        ...(selectedCategory !== 'Todos' && { category: selectedCategory }),
        ...(searchTerm && { search: searchTerm }),
      };
      console.log('Fetching products with params:', queryParams);

      const response = await productsAPI.getAll(queryParams);
      setProducts(response.data.products || []);
      setTotalPages(response.data.pagination?.totalPages || 1);
      setTotalProducts(response.data.pagination?.totalProducts || 0);
      setFeaturedProducts((response.data.products || []).slice(0, 4));
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error al cargar productos');
      console.error('Error fetching products:', err);
    } finally {
      setLoading(false);
      setInitialLoading(false);
    }
  }, [currentPage, selectedCategory, searchTerm]);

  const fetchCategories = async () => {
    try {
      const response = await productsAPI.getCategories();
      setCategories(['Todos', ...(response.data || [])]);
    } catch (err) {
      console.error('Error fetching categories:', err);
      setCategories(['Todos']);
    }
  };

  const debouncedSetSearchTerm = useCallback(
    debounce((term: string) => {
      setSearchTerm(term);
      setCurrentPage(1);
    }, 10),
    []
  );

  useEffect(() => {
    fetchCategories();
    fetchProducts();
  }, [fetchProducts]);

  const value = {
    products,
    featuredProducts,
    loading,
    initialLoading,
    error,
    categories,
    selectedCategory,
    searchTerm,
    currentPage,
    totalPages,
    totalProducts,
    setSelectedCategory: (category: string) => {
      setSelectedCategory(category);
      setCurrentPage(1);
    },
    setSearchTerm: debouncedSetSearchTerm,
    setCurrentPage,
    fetchProducts,
  };

  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  );
};
