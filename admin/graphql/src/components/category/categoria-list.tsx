import { Card } from '@mui/material';
import React from 'react';

const categoriaList = () => {
  return (
    <div>
      <Card className="mb-8 flex flex-col">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg overflow-hidden shadow-md">
          <thead className="bg-gray-50">
            <tr>
              <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">
                Type
              </th>
              <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">
                Name
              </th>
              <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">
                Description
              </th>
              <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">
                Actions
              </th>
            </tr>
          </thead>
          <tbody></tbody>
        </table>
      </Card>
    </div>
  );
};

export default categoriaList;
