import React, { useState, useEffect } from 'react';
import {
  useModalAction,
  useModalState,
} from '@/components/ui/modal/modal.context';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import EditConfirmationCard from '../common/EditConfirmationCard';

const AuthorEditView = () => {
  const { t } = useTranslation();
  const { data: modalData } = useModalState();
  const { closeModal } = useModalAction();
  
  // Utiliza useState para manejar el estado de los datos del autor
  const [authorData, setAuthorData] = useState({
    id: '',
    name: '',
    biography: '',
    // Agrega aquí más campos según sea necesario
  });

  // Cargar datos del autor desde modalData cuando el componente se monta
  useEffect(() => {
    if (modalData) {
      setAuthorData({
        id: modalData.id,
        name: modalData.name,
        biography: modalData.biography,
        // Carga más campos según sea necesario
      });
    }
  }, [modalData]);

  // Manejador de cambio de datos en el formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setAuthorData({
      ...authorData,
      [name]: value,
    });
  };

  // Manejador de envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Aquí puedes realizar la lógica de actualización sin GraphQL, por ejemplo, una llamada a una API REST
      // Por ejemplo:
      // await updateAuthor(authorData);
      
      // Si la actualización es exitosa, muestra un mensaje de éxito
      toast.success(t('common:successfully-updated'));
      closeModal();
    } catch (error) {
      // Si hay un error, muestra un mensaje de error
      toast.error(getErrorMessage(error));
    }
  };

  return (
    <EditConfirmationCard
      authorData={authorData}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      onCancel={closeModal}
    />
  );
};

export default AuthorEditView;
