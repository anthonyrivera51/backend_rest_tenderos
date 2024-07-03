import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import Modal from 'react-modal';

const categories = ['Vegetales', 'Frutas', 'Carnes', 'Bebidas', 'Aseo'];

interface Product {
  id: number;
  name: string;
  code: number;
  stock: number;
  precioBruto: number;
  precioNeto: number;
  description: string;
  category: string;
  imageUrl: string;
}

interface InventoryModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  addProducts: (newProduct: Product) => void;
  productToEdit?: Product | null; // Para editar productos
}

const InventoryModal: React.FC<InventoryModalProps> = ({
  isOpen,
  onRequestClose,
  addProducts,
  productToEdit,
}) => {
  const [product, setProduct] = useState<Product>({
    id: 0,
    name: '',
    code: 0,
    stock: 0,
    precioBruto: 0,
    precioNeto:0,
    description: '',
    category: categories[0],
    imageUrl: '',
  });

  useEffect(() => {
    if (productToEdit) {
      setProduct(productToEdit);
    }
  }, [productToEdit]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setProduct({
      ...product,
      [name]: value,
    });
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setProduct({
          ...product,
          imageUrl: reader.result as string,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    addProducts(product);
    setProduct({
      id: 0,
      name: '',
      code: 0,
      stock: 0,
      precioBruto: 0,
      precioNeto: 0,
      description: '',
      category: categories[0],
      imageUrl: '',
    });
    onRequestClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="max-w-6xl mx-auto bg-white shadow-md rounded-lg p-6 relative z-50 overflow-y-auto"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-40"
    >
      <h2 className="text-2xl font-bold mb-4">
        {productToEdit ? 'Actualizar Producto' : 'Agregar Producto'}
      </h2>
      <div className="fixed inset-0 flex items-center justify-center z-50">
  <div className="bg-white w-full max-w-4xl p-6 mx-2 rounded-lg shadow-lg">
    <form onSubmit={handleSubmit}>
      <div className="grid grid-cols-2 gap-4">
        <div className="mb-4">
          <label className="block text-gray-700">Nombre del Producto</label>
          <input
            type="text"
            name="name"
            value={product.name}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Stock</label>
          <input
            type="number"
            name="stock"
            value={product.stock}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Código de barras</label>
          <input
            type="number"
            name="code"
            value={product.code}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Precio bruto</label>
          <input
            type="number"
            name="precioBruto"
            value={product.precioBruto}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-md"
            required
          />
        </div>
        <div className="col-span-2 mb-4">
          <label className="block text-gray-700">Descripción</label>
          <textarea
            name="description"
            value={product.description}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-md"
            required
          ></textarea>
        </div>
        <div className="col-span-2 mb-4">
          <label className="block text-gray-700">Categoría</label>
          <select
            name="category"
            value={product.category}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-md"
          >
            {categories.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
        <div className="col-span-2 mb-4">
          <label className="block text-gray-700">Imagen del Producto</label>
          <input
            type="file"
            name="image"
            onChange={handleImageChange}
            className="mt-1 p-2 w-full border rounded-md"
            accept="image/*"
          />
        </div>
      </div>
      <div className="flex justify-end">
        <button
          type="button"
          onClick={onRequestClose}
          className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-700 mr-2"
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          {productToEdit ? 'Actualizar Producto' : 'Agregar Producto'}
        </button>
      </div>
    </form>
  </div>
</div>

    </Modal>
  );
};

export default InventoryModal;
