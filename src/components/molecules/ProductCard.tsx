import React from 'react';
import { motion } from 'framer-motion';
import { Typography } from '../atoms/Typography';
import { Button } from '../atoms/Button';
import { ExternalLink } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../contexts/CartContext';

interface Product {
  _id: string;
  title: string;
  description: string;
  price: number;
  currency: string;
  stock: number;
  images: string[];
  category: string;
}

interface ProductCardProps {
  product: Product;
  className?: string;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, className = '' }) => {
  const { user } = useAuth();
  const { addToCart } = useCart();
  const navigate = useNavigate();
  //   const handleAddToCart = (e: React.MouseEvent) => {
  //   e.stopPropagation();
  //   addToCart(product._id, 1);
  // };

  return (
    <motion.div
      whileHover={{ y: -8 }}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className={`
        bg-white dark:bg-gradient-to-r from-gray-800 to-gray-900
        rounded-xl
        shadow-lg
        hover:shadow-xl
        overflow-hidden
        transition-shadow
        duration-300
        border
        border-gray-200
        dark:border-gray-700
        h-full
        ${className}
      `}
    >
      <div className="aspect-video overflow-hidden">
        <img
          src={product.images[0] || 'https://via.placeholder.com/300x200'}
          alt={product.title}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
        {product.stock === 0 && (
          <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded text-xs">
            Sin stock
          </div>
        )}
      </div>

      <div className="p-6">
        <div className="flex justify-between items-start mb-3">
          <Typography variant="h5" color="default">
            {product.title}
          </Typography>
          <span className="text-primary-500 font-semibold text-lg">
            {product.currency === 'PEN' ? 'S/ ' : '$ '}
            {product.price.toFixed(2)}
          </span>
        </div>

        <Typography variant="body" color="muted" className="mb-4 line-clamp-2">
          {product.description}
        </Typography>

        <div className="flex items-center justify-between mb-4">
          <Typography variant="caption" color={product.stock > 0 ? 'success' : 'error'}>
            {product.stock > 0 ? `${product.stock} disponibles` : 'Sin stock'}
          </Typography>
          <Typography variant="caption" color="muted">
            {product.category}
          </Typography>
        </div>

        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            icon={ExternalLink}
            iconPosition="right"
            className="flex-1"
            onClick={() => navigate(`/productos/${product._id}`)}
          >
            Ver Detalles
          </Button>
          <Button
            variant="primary"
            size="sm"
            disabled={product.stock === 0 || !user}
            className="flex-1"
            title={!user ? 'Inicia sesión para comprar' : undefined}
            onClick={() => {
              if (user) {
                addToCart(product._id, 1);
              } else {
                window.location.href = '/login';
              }
            }}
          >
            {product.stock === 0 ? 'Sin stock' : 'Agregar'}
          </Button>
        </div>
      </div>
    </motion.div>
  );
};
