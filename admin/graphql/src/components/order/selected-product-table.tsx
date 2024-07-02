import React from 'react';


interface Product{
    name: string;
    price: number;
    quantity: number
}

interface SelectedProductTableProps{
    products: Product[];
    onRemove: (index:number) => void
    onQuantityChange: (event: React.ChangeEvent<HTMLInputElement>, index: number) => void;
}


const SelectedProductTable: React.FC<SelectedProductTableProps> = ({ products, onRemove, onQuantityChange }) => {
  return (
    <div className="mt-8 border border-gray-300 rounded p-4">
      <h2 className="text-xl font-bold mb-4">Productos Seleccionados</h2>
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
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Acciones
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
                <div className="text-sm text-gray-900">
                  ${product.price}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <input
                  type="number"
                  min="1"
                  value={product.quantity}
                  onChange={(e) => onQuantityChange(e, index)}
                  className="border border-gray-300 rounded px-4 py-2 w-16"
                />
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">
                  ${product.price * product.quantity}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <button
                  onClick={() => onRemove(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SelectedProductTable;
