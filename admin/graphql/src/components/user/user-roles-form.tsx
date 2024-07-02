import React, { useState } from 'react';

interface RoleFormProps {
  onAddRole: (roleName: string) => void;
}

const RoleForm: React.FC<RoleFormProps> = ({ onAddRole }) => {
  const [roleName, setRoleName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (roleName.trim()) {
      onAddRole(roleName);
      setRoleName('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <div className="flex space-x-4">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Enter role name"
            value={roleName}
            onChange={(e) => setRoleName(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
          />
        </div>
        <div className="flex-1">
          <button
            type="submit"
            className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          >
            Add Role
          </button>
        </div>
      </div>
    </form>
  );
};

export default RoleForm;
