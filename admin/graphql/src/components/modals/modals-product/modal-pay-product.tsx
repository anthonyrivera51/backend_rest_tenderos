import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';

interface Product {
  name: string;
  price: number;
  quantity: number;
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  summary: Product[];
  totalPrice: number;
}

const PaymentModal: React.FC<Props> = ({
  isOpen,
  onClose,
  summary,
  totalPrice: initialTotalPrice,
}) => {
  const [metodoPago, setMetodoPago] = useState<string>('');
  const [products, setProducts] = useState<Product[]>(summary);
  const [totalPrice, setTotalPrice] = useState<number>(initialTotalPrice);

  useEffect(() => {
    setProducts(summary);
    setTotalPrice(initialTotalPrice);
  }, [summary, initialTotalPrice]);

  const handlePaymentMethodChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setMetodoPago(event.target.value);
  };

  const handleQuantityChange = (index: number, newQuantity: number) => {
    const updatedProducts = [...products];
    updatedProducts[index].quantity = newQuantity;
    setProducts(updatedProducts);
    updateTotalPrice(updatedProducts);
  };

  const updateTotalPrice = (updatedProducts: Product[]) => {
    const newTotalPrice = updatedProducts.reduce(
      (acc, product) => acc + product.price * product.quantity,
      0
    );
    setTotalPrice(newTotalPrice);
  };

  const handlePayment = () => {
    // Aquí puedes manejar el proceso de pago basado en el método seleccionado
    if (metodoPago === 'tarjeta') {
      console.log('Procesando pago con tarjeta...');
      // Lógica para procesar el pago con tarjeta
    } else if (metodoPago === 'efectivo') {
      console.log('Pago en efectivo seleccionado...');
      // Lógica para procesar el pago en efectivo
    }
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Pago"
      className="fixed right-0 top-0 w-1/3 h-full bg-white shadow-md rounded-l-lg p-6 overflow-y-auto z-50"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-start justify-end z-40"
    >
      <h2 className="text-xl font-bold mb-4">Seleccionar Método de Pago</h2>
      <div className="mb-4">
        <select
          value={metodoPago}
          onChange={handlePaymentMethodChange}
          className="border border-gray-300 rounded p-2 w-full"
        >
          <option value="">Seleccione un método de pago</option>
          <option value="tarjeta">Tarjeta</option>
          <option value="efectivo">Efectivo</option>
        </select>
      </div>

      {products.length > 0 ? (
        <>
          {metodoPago && (
            <>
              <h2 className="text-xl font-bold mb-4">Resumen de la Compra</h2>
              <table className="min-w-full divide-y divide-gray-200 mb-4">
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
                  {products.map((product, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {product.name}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">${product.price}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <input
                          type="number"
                          value={product.quantity}
                          min="1"
                          onChange={(e) =>
                            handleQuantityChange(index, parseInt(e.target.value, 10))
                          }
                          className="border border-gray-300 rounded p-2 w-full"
                        />
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

              {metodoPago === 'tarjeta' && (
                <div className="mt-4">
                  <h3 className="text-lg font-bold mb-2">Codigo de transacción</h3>
                  <input
                    type="text"
                    placeholder="Digite el codigo"
                    className="border border-gray-300 rounded p-2 w-full mb-2"
                  />
                </div>
              )}

              {metodoPago === 'efectivo' && (
                <div className="mt-4">
                  <h3 className="text-lg font-bold mb-2">Pago en Efectivo</h3>
                  <p className="text-sm text-gray-700">Por favor, prepare el monto exacto para el pago en efectivo.</p>
                  <input type="number" name="" id="" />

                  
                </div>
              )}

              <button
                onClick={handlePayment}
                className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
              >
                Confirmar Pago
              </button>
            </>
          )}
        </>
      ) : (
        <p className="text-gray-700">No hay productos en el resumen.</p>
      )}

      <button
        onClick={onClose}
        className="mt-4 bg-gray-500 text-white px-4 py-2 rounded"
      >
        Cerrar Modal
      </button>
    </Modal>
  );
};

export default PaymentModal;
