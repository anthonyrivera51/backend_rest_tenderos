import React, { useState } from 'react';

const products = {
  '1234567890': {
    id: '1',
    name: 'Manzana',
    price: 2000,
    description: 'Manzanas importadas',
  },
  '0987654321': {
    id: '2',
    name: 'Gaseosa Cocacola',
    price: 6000,
    description: 'Coca-cola 2 Lts',
  },
  '416594813': {
    id: '3',
    name: 'Avena Alpina',
    price: 2500,
    description: 'Avena alpina 300ml',
  },
};


const getProductByBarcode = (barcode: string) => {
  return new Promise<{ product: any } | null>((resolve) => {
    setTimeout(() => {
      const product = products[barcode];
      resolve(product ? { product } : null);
    }, 1000);
  });
};

const ProductSearch: React.FC = () => {
  const [barcode, setBarcode] = useState('');
  const [product, setProduct] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBarcode(event.target.value);
  };

  const handleSearch = async () => {
    setLoading(true);
    setError(null);
    const result = await getProductByBarcode(barcode);
    if (result) {
      setProduct(result.product);
    } else {
      setError('Producto no encontrado');
    }
    setLoading(false);
  };

  return (
    <div>
      <input
        type="text"
        value={barcode}
        onChange={handleInputChange}
        placeholder="Ingresa el código de barras"
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      />
      <button
        onClick={handleSearch}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Buscar
      </button>

      {loading && <p>Cargando...</p>}
      {error && <p>{error}</p>}


<div className="relative overflow-x-auto">
    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" className="px-6 py-3">
                    Producto
                </th>
                <th scope="col" className="px-6 py-3">
                    Precio
                </th>
                <th scope="col" className="px-6 py-3">
                    Descripcion
                </th>
            </tr>
        </thead>
        <tbody>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {product?.name}
                </th>
                <td className="px-6 py-4">
                 {product?.price}
                </td>
                <td className="px-6 py-4">
                {product?.description}
                </td>
            </tr>
        </tbody>
    </table>
</div>


    </div>
  );
};

export default ProductSearch;
