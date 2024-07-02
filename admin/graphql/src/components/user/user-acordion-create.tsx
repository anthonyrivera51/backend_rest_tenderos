import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from '@mui/material/Button';
import { useState } from 'react';
import RolePermissionManager from './user-roles';
import UserForm from './user-form';

interface Role {
  name: string;
  modules: {
    name: string;
    granted: boolean;
    permissions: {
      name: string;
      granted: boolean;
    }[];
  }[];
  permissions: {
    name: string;
    granted: boolean;
  }[];
}

export default function AccordionUsage() {
  const [roles, setRoles] = useState<Role[]>([]);

  const handleRolesUpdate = (updatedRoles: Role[]) => {
    setRoles(updatedRoles);
  };

  return (
    <div>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          Roles
        </AccordionSummary>
        <AccordionDetails>
          <RolePermissionManager onRolesUpdate={handleRolesUpdate} />
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2-content"
          id="panel2-header"
        >
          Usuarios
        </AccordionSummary>
        <AccordionDetails>
          <UserForm roles={roles} selectedUser={''} accounts={undefined} onUserSelect={function (userName: string): void {
            throw new Error('Function not implemented.');
          } }/>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
