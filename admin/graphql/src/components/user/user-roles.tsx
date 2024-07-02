import React, { useState, useEffect } from 'react';
import RoleForm from './user-roles-form';
import ModalRoles from '../modals/modals-user/modal-user-roles';

interface Permission {
  name: string;
  granted: boolean;
}

interface Module {
  name: string;
  granted: boolean;
  permissions: Permission[];
}

interface Role {
  name: string;
  modules: Module[];
  permissions: Permission[];
}

interface RolePermissionManagerProps {
  onRolesUpdate: (roles: Role[]) => void;
}

const RolePermissionManager: React.FC<RolePermissionManagerProps> = ({
  onRolesUpdate,
}) => {
  const [roles, setRoles] = useState<Role[]>([]);
  const [modules, setModules] = useState<Module[]>([
    {
      name: 'Dashboard',
      granted: false,
      permissions: [
        { name: 'Leer', granted: false },
        { name: 'Crear', granted: false },
        { name: 'Eliminar', granted: false },
        { name: 'Editar', granted: false },
      ],
    },
    {
      name: 'Users',
      granted: false,
      permissions: [
        { name: 'Leer', granted: false },
        { name: 'Crear', granted: false },
        { name: 'Eliminar', granted: false },
        { name: 'Editar', granted: false },
      ],
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedRole, setSelectedRole] = useState<string | null>(null);

  // UseEffect to load roles from localStorage once when component mounts
  useEffect(() => {
    const storedRoles = JSON.parse(
      localStorage.getItem('roles') || '[]',
    ) as Role[];
    const initializedRoles = storedRoles.map((role) => ({
      ...role,
      permissions: role.permissions || [],
      modules: role.modules || [],
    }));
    setRoles(initializedRoles);
    onRolesUpdate(initializedRoles);
  }, []);

  const saveRolesToLocalStorage = (updatedRoles: Role[]) => {
    localStorage.setItem('roles', JSON.stringify(updatedRoles));
    onRolesUpdate(updatedRoles);
  };

  const handleAddRole = (roleName: string) => {
    const updatedRoles = [
      ...roles,
      { name: roleName, modules: [], permissions: [] },
    ];
    setRoles(updatedRoles);
    saveRolesToLocalStorage(updatedRoles);
  };

  const handleTogglePermission = (
    moduleName: string,
    permissionName: string,
  ) => {
    setModules(
      modules.map((module) =>
        module.name === moduleName
          ? {
              ...module,
              permissions: module.permissions.map((permission) =>
                permission.name === permissionName
                  ? { ...permission, granted: !permission.granted }
                  : permission,
              ),
            }
          : module,
      ),
    );
  };

  const handleToggleModule = (moduleName: string) => {
    setModules(
      modules.map((module) =>
        module.name === moduleName
          ? { ...module, granted: !module.granted }
          : module,
      ),
    );
  };

  const handleDeleteRol = (roleName: string) => {
    const updatedRoles = roles.filter((role) => role.name !== roleName);
    setRoles(updatedRoles);
    saveRolesToLocalStorage(updatedRoles);
  };

  const handleOpenModal = (roleName: string) => {
    const selectedRole = roles.find((role) => role.name === roleName);
    if (selectedRole) {
      // Obtener todos los módulos disponibles
      const allModules = modules.map((module) => ({
        ...module,
        granted: selectedRole.modules.some(
          (m) => m.name === module.name && m.granted,
        ),
        permissions: module.permissions.map((permission) => ({
          ...permission,
          granted: selectedRole.permissions.some(
            (p) => p.name === permission.name && p.granted,
          ),
        })),
      }));

      setModules(allModules);
      setSelectedRole(roleName);
      setIsModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSaveModules = () => {
    const updatedRoles = roles.map((role) =>
      role.name === selectedRole
        ? {
            ...role,
            modules: modules
              .map((module) => ({
                ...module,
                permissions: module.permissions.map((permission) => ({
                  ...permission,
                  granted:
                    permission.granted ||
                    role.modules.some((m) => m.name === module.name),
                })),
              }))
              .filter((module) => module.granted),
          }
        : role,
    );
    setRoles(updatedRoles);
    saveRolesToLocalStorage(updatedRoles);
    handleCloseModal();
  };

  return (
    <div className="p-4 bg-white shadow-md rounded-lg">
      <RoleForm onAddRole={handleAddRole} />
      <div>
        <h3 className="font-bold mb-2">Roles</h3>
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2">Nombre</th>
              <th className="py-2">Modulos</th>
              <th className="py-2"></th>
            </tr>
          </thead>
          <tbody>
            {roles.map((role, index) => (
              <tr key={index} className="border-t">
                <td className="py-2 px-4">{role.name}</td>
                <td className="py-2 px-4">
                  {role.modules && role.modules.length > 0 ? (
                    role.modules.map((module, i) => (
                      <span
                        key={i}
                        className="text-sm bg-gray-200 px-2 py-1 rounded mr-1 inline-block"
                      >
                        {module.name}
                      </span>
                    ))
                  ) : (
                    <span className="text-sm text-gray-500">
                      No modules assigned
                    </span>
                  )}
                </td>
                <td className="py-2 px-4">
                  <button
                    onClick={() => handleOpenModal(role.name)}
                    className="bg-green-500 text-white px-2 py-1 rounded"
                  >
                    Edit
                  </button>
                </td>
                <td className="py-2 px-4">
                  <button
                    onClick={() => handleDeleteRol(role.name)}
                    className="bg-red-500 text-white px-2 py-1 rounded"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ModalRoles
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onTogglePermission={handleTogglePermission}
        modules={modules}
        onToggleModule={handleToggleModule}
        onSave={handleSaveModules}
      />
    </div>
  );
};

export default RolePermissionManager;
