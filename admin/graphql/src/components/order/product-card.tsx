import React from 'react';

interface Product {
  name: string;
  price: number;
  description: string;
  stock: number;
  category: string;
  imageUrl: string;
}

interface ProductCardProps {
  product: Product;
  onSelect: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onSelect }) => {
  return (
    <div
      onClick={() => onSelect(product)}
      className="border rounded-lg shadow-md p-4 text-center transition-transform transform hover:scale-105 cursor-pointer"
    >
      <img
        src={product.imageUrl}
        alt={product.name}
        className="h-32 w-32 mx-auto object-cover mb-4 rounded-md"
      />
      <p className="text-lg font-semibold mb-2">${product.price}</p>
      <p className="text-md mb-4 truncate">{product.name}</p>
      <button className="bg-green-500 text-white py-2 px-4 rounded">Add</button>
    </div>
  );
};

export default ProductCard;
