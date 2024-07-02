import React from "react";
import Tree from "rc-tree";
import "rc-tree/assets/index.css";

interface Permission {
  name: string;
  granted: boolean;
}

interface Module {
  name: string;
  granted: boolean;
  permissions: Permission[];
}

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onTogglePermission: (moduleName: string, permissionName: string) => void;
  onToggleModule: (moduleName: string) => void;
  onSave: () => void;
  modules: Module[];
}

const ModalRoles: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  onTogglePermission,
  onToggleModule,
  onSave,
  modules,
}) => {
  if (!isOpen) return null;

  const handleModuleToggle = (moduleName: string) => {
    onToggleModule(moduleName);
  };

  const handlePermissionToggle = (moduleName: string, permissionName: string) => {
    onTogglePermission(moduleName, permissionName);
  };

  // Prepare data in treeData format
  const treeData = modules.map((module) => ({
    title: (
      <span className="flex items-center">
        <input
          type="checkbox"
          checked={module.granted}
          onChange={() => handleModuleToggle(module.name)}
          className="mr-2"
        />
        {module.name}
      </span>
    ),
    key: module.name,
    children: module.permissions.map((permission) => ({
      title: (
        <span className="flex items-center ml-4">
          <input
            type="checkbox"
            checked={permission.granted}
            onChange={() => handlePermissionToggle(module.name, permission.name)}
            className="mr-2"
          />
          {permission.name}
        </span>
      ),
      key: `${module.name}-${permission.name}`,
    })),
  }));

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-4 rounded-lg shadow-lg max-w-sm w-full z-60">
        <h2 className="text-xl font-bold mb-4">Selecciona permisos</h2>
        <Tree treeData={treeData} />
        <div className="flex justify-end space-x-2 mt-4">
          <button onClick={onClose} className="bg-gray-300 px-4 py-2 rounded">
            Cancel
          </button>
          <button
            onClick={onSave}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Guardar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalRoles;
