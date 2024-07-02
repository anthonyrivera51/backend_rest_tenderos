import React, { useState } from 'react';
import Button from '../ui/button';

const ModulesForm: React.FC = () => {
  const [inputModule, setInputModule] = useState('');

  function handleChange(event) {
    event.preventDefault();
    setInputModule(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    alert(`Module create: ${inputModule}`);
    setInputModule('');
  }

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="space-y-4 p-4 bg-white rounded-lg shadow-md"
      >
        <div className="flex flex-col">
          <input
            type="text"
            id="Module"
            value={inputModule}
            onChange={handleChange}
            className="border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter Module name"
          />
        </div>
        <div className="mb-4 text-end">
          <Button>Create Module</Button>
        </div>
      </form>
    </>
  );
};

export default ModulesForm;
