import React, { useEffect, useState } from "react";
import InventoryModal from "../modals/modals-product/modal-create-product";
import 'tailwindcss/tailwind.css';

interface Product {
  id: number;
  name: string;
  code: number;
  stock: number;
  price: number;
  description: string;
  category: string;
  imageUrl: string;
}

const CreateProduct: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [product, setProduct] = useState<Product[]>([]);
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  useEffect(() => {
    const storedProducts: Product[] = JSON.parse(localStorage.getItem('products') || '[]');
    setProduct(storedProducts);
    console.log('Productos cargados desde localStorage:', storedProducts);
  }, []);

  const addProducts = (newProduct: Product) => {
    if (isEditing && currentProduct) {
      const updatedProducts = product.map((prod) =>
        prod.id === currentProduct.id ? newProduct : prod
      );
      setProduct(updatedProducts);
      localStorage.setItem("products", JSON.stringify(updatedProducts));
      setIsEditing(false);
      setCurrentProduct(null);
    } else {
      const newId = product.length > 0 ? product[product.length - 1].id + 1 : 1;
      const productWithId = { ...newProduct, id: newId };

      const updatedProducts = [...product, productWithId];
      setProduct(updatedProducts);
      localStorage.setItem("products", JSON.stringify(updatedProducts));
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setIsEditing(false);
    setCurrentProduct(null);
  };

  const handleEdit = (productToEdit: Product) => {
    setCurrentProduct(productToEdit);
    setIsEditing(true);
    setIsModalOpen(true);
  };

  const handleDelete = (productToDelete: Product) => {
    const updatedProducts = product.filter((prod) => prod !== productToDelete);
    setProduct(updatedProducts);
    localStorage.setItem("products", JSON.stringify(updatedProducts));
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={openModal}
            className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition duration-300"
          >
            Add Product
          </button>
        </div>
        <InventoryModal
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          addProducts={addProducts}
          productToEdit={currentProduct}
        />
        <div className="mt-6">
          <h2 className="text-2xl font-bold text-gray-700 mb-4">Products</h2>
          <table className="min-w-full bg-white border border-gray-200 rounded-lg overflow-hidden shadow-md">
            <thead className="bg-gray-50">
              <tr>
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">Name</th>
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">Stock</th>
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">Price</th>
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">Code</th>
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">Description</th>
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">Category</th>
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">Image</th>
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {product.map((product, index) => (
                <tr key={index} className="hover:bg-gray-100 transition duration-200">
                  <td className="py-3 px-4 border-b">{product.name}</td>
                  <td className="py-3 px-4 border-b">{product.stock}</td>
                  <td className="py-3 px-4 border-b">{product.price}</td>
                  <td className="py-3 px-4 border-b">{product.code}</td>
                  <td className="py-3 px-4 border-b">{product.description}</td>
                  <td className="py-3 px-4 border-b">{product.category}</td>
                  <td className="py-3 px-4 border-b">
                    {product.imageUrl && (
                      <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="h-16 w-16 object-cover"
                      />
                    )}
                  </td>
                  <td className="py-3 px-4 border-b flex space-x-2">
                    <button onClick={() => handleEdit(product)} className="text-blue-500 hover:text-blue-700">
                      edit
                    </button>
                    <button onClick={() => handleDelete(product)} className="text-red-500 hover:text-red-700">
                      delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CreateProduct;
