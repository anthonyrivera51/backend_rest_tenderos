import { Card } from '@mui/material';
import { useState } from 'react';

interface Category {
  tipoCategoria: string;
  nombreCategoria: string;
  descripcion: string;
}

const CategoriaForm: React.FC = () => {
  const [tipoCategoria, setTipoCategoria] = useState<string>('');
  const [nombreCategoria, setNombreCategoria] = useState<string>('');
  const [descripcion, setDescripcion] = useState<string>('');

  const handleAddCategoria = (e: { preventDefault: () => void }) => {

    if(nombreCategoria && tipoCategoria && descripcion){
        e.preventDefault();
        setNombreCategoria(nombreCategoria);
        setTipoCategoria(tipoCategoria);
        setDescripcion(descripcion);
        alert(`${nombreCategoria}, ${tipoCategoria}, ${descripcion}`);
        setTipoCategoria('');
        setDescripcion('');
        setNombreCategoria('');
    }else{
        alert("error")
    }

  };

  return (
    <>
      <Card className="mb-8 p-6 flex flex-col items-center md:flex-row">
        <form className="space-y-6 w-full" action="#">
          <h5 className="text-xl font-medium text-gray-900 dark:text-white mb-4">
            Categorias
          </h5>
          <div className="flex space-x-3">
            <div className="flex-1">
              <label
                htmlFor="name"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Tipo de categoria
              </label>
              <input
                type="text"
                name="categoria"
                id="categoria"
                value={tipoCategoria}
                onChange={(e) => setTipoCategoria(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                placeholder="Tipo de categoria"
                required
              />
            </div>
            <div className="flex-1">
              <label
                htmlFor="name"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Nombre de categoria
              </label>
              <input
                type="text"
                name="nombreCategoria"
                id="nombreCategoria"
                value={nombreCategoria}
                onChange={(e) => setNombreCategoria(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                placeholder="Nombre de categoria "
                required
              />
            </div>
            <div className="flex-1">
              <label
                htmlFor="name"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Descprición de categoria
              </label>
              <textarea
                name="DescriptCategoria"
                id="DescriptCategoria"
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                placeholder="Descripción"
                required
              />
            </div>
          </div>
          <button
            type="submit"
            onClick={handleAddCategoria}
            className="mt-4 text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          >
            Agregar categoria
          </button>
        </form>
      </Card>
    </>
  );
};

export default CategoriaForm;
