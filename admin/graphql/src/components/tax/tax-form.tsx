import { Card } from '@mui/material';
import { useState } from 'react';

interface Impuesto {
  nameImpuesto: string;
  valor: number;
}

const CreateImpuesto: React.FC = () => {
  const [nameImpuesto, setNameImpuesto] = useState<string>('');
  const [valor, setValor] = useState<number>(0);

  const handleAddImpuesto = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (nameImpuesto && valor) {
      setNameImpuesto(nameImpuesto);
      setValor(valor);
      alert(`Impuesto creado: ${nameImpuesto} ${valor}`);
      setNameImpuesto('');
      setValor(0);
    } else {
      alert('Error');
    }
  };

  return (
    <>
     <Card className="mb-8 p-6 flex flex-col items-center md:flex-row">
      <form className="space-y-6 w-full" action="#">
        <h5 className="text-xl font-medium text-gray-900 dark:text-white mb-4">
          Impuestos
        </h5>
        <div className="flex space-x-3">
          <div className="flex-1">
            <label
              htmlFor="name"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Tipo de Impuesto
            </label>
            <input
              type="text"
              name="name"
              id="name"
              value={nameImpuesto}
              onChange={(e) => setNameImpuesto(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              placeholder="Impuesto"
              required
            />
          </div>
          <div className="flex-1">
            <label
              htmlFor="valor"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Valor
            </label>
            <input
              type="number"
              name="valor"
              id="valor"
              value={valor}
              onChange={(e) => setValor(parseInt(e.target.value))}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              placeholder="Valor"
              required
            />
          </div>
        </div>
        <button
          type="submit"
          onClick={handleAddImpuesto}
          className="mt-4 text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
        >
          Agregar impuesto
        </button>
      </form>
    </Card>
    </>
  );
};

export default CreateImpuesto;
