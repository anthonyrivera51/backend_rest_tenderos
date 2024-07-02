import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import Modal from 'react-modal';

interface Props {
  isOpen: boolean;
  onRequestClosed: () => void;
}

const ModalOpenCashRegister: React.FC<Props> = ({
  isOpen,
  onRequestClosed,
}) => {
  const [code, setCode] = useState<string>('');
  const [inputValue, setInputValue] = useState<string>('');
  const [currentDate, setCurrentDate] = useState<string>('');


    useEffect(() => {
        const today = new Date()
        const formattedDate = `${today.getDate()}/${today.getMonth() + 1}/${today.getFullYear()}`
        setCurrentDate(formattedDate)
    },[])

    const handleCodeChange = (e: ChangeEvent<HTMLInputElement>) => setCode(e.target.value);
  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => setInputValue(e.target.value);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Aquí puedes manejar la validación del código y cualquier otra lógica
    if (code === '1234') {
      alert('Código correcto, caja abierta.');
      onRequestClosed();
    } else {
      alert('Código incorrecto, intenta de nuevo.');
    }
  };



  return (
    <>
      <Modal
        isOpen={isOpen}
        onRequestClose={onRequestClosed}
        contentLabel="Modal de apertura de caja"
        className="max-w-2xl mx-auto bg-white shadow-md rounded-lg p-6 relative z-50"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-40"
      >
   <div className="bg-white rounded-lg p-8 shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-4">Apertura de Caja Registradora</h2>
        <p className="mb-4">Fecha: {currentDate}</p>
        <form onSubmit={handleSubmit}>
          <label className="block mb-2">
            Código:
            <input
              type="password"
              value={code}
              onChange={handleCodeChange}
              className="w-full mt-1 p-2 border rounded"
            />
          </label>
          <label className="block mb-4">
            Comentarios:
            <textarea
              value={inputValue}
              onChange={handleInputChange}
              className="w-full mt-1 p-2 border rounded"
            ></textarea>
          </label>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onRequestClosed}
              className="mr-2 py-2 px-4 bg-gray-300 rounded hover:bg-gray-400"
            >
              Cerrar
            </button>
            <button
              type="submit"
              className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Ingresar
            </button>
          </div>
        </form>
      </div>
      </Modal>
    </>
  );
};

export default ModalOpenCashRegister;
