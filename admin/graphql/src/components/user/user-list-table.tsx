// LocalStorageUserTable.tsx

import React, { useState, useEffect } from "react";

interface User {
  name: string;
  role: string;
  modules: { name: string; permissions: { name: string; granted: boolean }[] }[];
}

const LocalStorageUserTable: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const storedUsersJson = localStorage.getItem("users");
    if (storedUsersJson) {
      const storedUsers: User[] = JSON.parse(storedUsersJson);
      setUsers(storedUsers);
      console.log("Usuarios cargados desde localStorage:", storedUsers);
    }
  }, []);

  const handleDeleteUser = (userName: string) => {
    const updatedUsers = users.filter((user) => user.name !== userName);
    setUsers(updatedUsers);
    saveUsersToLocalStorage(updatedUsers);
  };

  const saveUsersToLocalStorage = (updatedUsers: User[]) => {
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    console.log("Usuarios guardados en localStorage:", updatedUsers);
  };

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg mt-6">
      <h3 className="text-xl font-semibold mb-4">Usuarios</h3>
      <table className="min-w-full bg-white shadow-md rounded-lg">
        <thead>
          <tr>
            <th className="py-3 px-6 bg-gray-100 text-left">Nombre de Usuario</th>
            <th className="py-3 px-6 bg-gray-100 text-left">Rol</th>
            <th className="py-3 px-6 bg-gray-100 text-left">Módulos y Permisos</th>
            <th className="py-3 px-6 bg-gray-100 text-left">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => {
            return (
              <tr key={index} className="border-t">
                <td className="py-3 px-6">{user.name}</td>
                <td className="py-3 px-6">{user.role}</td>
                <td className="py-3 px-6">
                  {user.modules && user.modules.length > 0 ? (
                    user.modules.map((module, i) => (
                      <div key={i} className="mb-2">
                        <div className="font-bold">{module.name}</div>
                        {module.permissions && module.permissions.length > 0 ? (
                          module.permissions
                            .filter((permission) => permission.granted)
                            .map((permission, j) => (
                              <span
                                key={j}
                                className="text-sm bg-gray-200 px-2 py-1 rounded mr-1 inline-block"
                              >
                                {permission.name}
                              </span>
                            ))
                        ) : (
                          <span className="text-sm text-gray-500">Sin permisos</span>
                        )}
                      </div>
                    ))
                  ) : (
                    <span className="text-sm text-gray-500">Sin módulos asignados</span>
                  )}
                </td>
                <td className="py-3 px-6">
                  <button
                    onClick={() => handleDeleteUser(user.name)}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg"
                  >
                    Eliminar Usuario
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default LocalStorageUserTable;
