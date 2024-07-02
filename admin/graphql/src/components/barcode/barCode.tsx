import React, { useState, useEffect, ChangeEvent } from 'react';
import Modal from 'react-modal';
import PaymentModal from '../modals/modals-product/modal-pay-product';
import ModalOpenCashRegister from '../modals/modals-order/modal-open-cashRegister';
import ProductCard from '../order/product-card';
import SelectedProductTable from '../order/selected-product-table';

interface Product {
  name: string;
  price: number;
  description: string;
  stock: number;
  category: string;
  quantity: number;
  imageUrl: string;
}

const SalesProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>(''); // Estado para la categoría seleccionada
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);
  const [quantity, setQuantity] = useState<number>(1);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [showSummary, setShowSummary] = useState<boolean>(false);
  const [summary, setSummary] = useState<Product[]>([]);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState<boolean>(false);
  const [ModalOCRIsOpen, setModalORCIsOpen] = useState<boolean>(false);

  useEffect(() => {
    setModalORCIsOpen(true);
  }, []);

  const closeModal = () => {
    setModalORCIsOpen(false);
  };

  useEffect(() => {
    const storedProducts: Product[] = JSON.parse(
      localStorage.getItem('products') || '[]',
    );
    setProducts(storedProducts);
    console.log('Productos cargados desde localStorage:', storedProducts);
  }, []);

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
  };

  const handleCategoryChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const category = e.target.value;
    setSelectedCategory(category);
  };

  const handleCheckout = () => {
    setSummary(selectedProducts); // Actualiza el resumen con los productos seleccionados
    setShowSummary(true); // Muestra el resumen en la interfaz
    setIsPaymentModalOpen(true); // Abre el modal de pago
  };

  const handleSelectProduct = (product: Product) => {
    const updatedProducts = [...selectedProducts, { ...product, quantity }];
    setSelectedProducts(updatedProducts);
    calculateTotalPrice(updatedProducts);
    setSearchTerm('');
  };

  const handleQuantityChange = (
    e: ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    const newQuantity = parseInt(e.target.value);
    const updatedProducts = [...selectedProducts];
    updatedProducts[index].quantity = newQuantity;
    setSelectedProducts(updatedProducts);
    calculateTotalPrice(updatedProducts);
  };

  const calculateTotalPrice = (updatedProducts: Product[]) => {
    const total = updatedProducts.reduce((acc, curr) => {
      return acc + curr.price * curr.quantity;
    }, 0);
    setTotalPrice(total);
  };

  const removeProduct = (index: number) => {
    const updatedProducts = [...selectedProducts];
    updatedProducts.splice(index, 1);
    setSelectedProducts(updatedProducts);
    calculateTotalPrice(updatedProducts);
  };

  const handleClosePaymentModal = () => {
    setIsPaymentModalOpen(false);
    window.location.reload();
  };

  // Filtrar productos según el término de búsqueda y la categoría seleccionada
  const filteredProducts = products.filter((product) => {
    const matchesSearchTerm = product.name.toLowerCase().includes(searchTerm);
    const matchesCategory = selectedCategory
      ? product.category === selectedCategory
      : true;
    return matchesSearchTerm && matchesCategory;
  });

  // Obtener categorías únicas para el campo de selección
  const uniqueCategories = Array.from(
    new Set(products.map((product) => product.category)),
  );

  return (
    <>
      <ModalOpenCashRegister
        isOpen={ModalOCRIsOpen}
        onRequestClosed={closeModal}
      />
      <div className="p-6 bg-white shadow-lg rounded-lg mt-6">
        <div className="container mx-auto py-8">
          <h1 className="text-3xl font-bold mb-4">Ventas de Productos</h1>
          <button
            onClick={handleCheckout}
            className="fixed top-1/2 right-4 transform -translate-y-1/2 bg-green-700 text-white px-4 py-2 rounded shadow-lg"
          >
            Pagar <br />${totalPrice}
          </button>

          {/* Search input */}
          <input
            type="text"
            placeholder="Buscar producto por nombre"
            value={searchTerm}
            onChange={handleSearch}
            className="border border-gray-300 rounded px-4 py-2 mb-4"
          />

          {/* Category select */}
          <select
            value={selectedCategory}
            onChange={handleCategoryChange}
            className="border border-gray-300 rounded px-4 py-2 ml-0 sm:ml-2 w-full sm:w-auto"
          >
            <option value="">Todas las Categorías</option>
            {uniqueCategories.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>

          {/* Product list */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 mt-4">
            {filteredProducts.map((product, index) => (
              <ProductCard
                key={index}
                product={product}
                onSelect={handleSelectProduct}
              />
            ))}
          </div>

          {/* Selected products */}
          {selectedProducts.length > 0 && (
            <SelectedProductTable
              products={selectedProducts}
              onRemove={removeProduct}
              onQuantityChange={handleQuantityChange}
            />
          )}

          {/* Payment Modal */}
          <PaymentModal
            isOpen={isPaymentModalOpen}
            onClose={handleClosePaymentModal}
            summary={summary}
            totalPrice={totalPrice}
          />

          {/* Summary */}
          {showSummary && (
            <div className="mt-8 border border-gray-300 rounded p-4">
              <h2 className="text-xl font-bold mb-4">Resumen de la Compra</h2>
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Producto
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Precio Unitario
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Cantidad
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Subtotal
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {summary.map((product, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {product.name}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          ${product.price}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {product.quantity}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          ${product.price * product.quantity}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="mt-4 text-xl font-bold">Total: ${totalPrice}</div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default SalesProducts;
