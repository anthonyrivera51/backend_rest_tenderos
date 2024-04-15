import { EditIcon } from '@/components/icons/edit';
import Button from '@/components/ui/button';
import { useTranslation } from 'next-i18next';
import cn from 'classnames';
import React, { useState } from 'react';

type EditConfirmationCardProps = {
  onCancel: () => void;
  onEdit: (inputText: string) => void;
  title?: string;
  icon?: any;
  description?: string;
  cancelBtnClassName?: string;
  editBtnClassName?: string;
  cancelBtnText?: string;
  editBtnText?: string;
  cancelBtnLoading?: boolean;
  editBtnLoading?: boolean;
};

const EditConfirmationCard: React.FC<EditConfirmationCardProps> = ({
  onCancel,
  onEdit,
  icon,
  title = 'Edit User',
  description = '',
  cancelBtnText = 'button-cancel',
  editBtnText = 'Edit',
  cancelBtnClassName,
  editBtnClassName,
  cancelBtnLoading,
  editBtnLoading,
}) => {
  const { t } = useTranslation('common');
  const [inputText, setInputText] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
  };

  const handleEditClick = () => {
    onEdit(inputText);
  };

  return (
    <div className="p-4 pb-6 bg-light m-auto max-w-sm w-full rounded-md md:rounded-xl sm:w-[24rem]">
      <div className="w-full h-full text-center">
        <div className="flex h-full flex-col justify-between">
          {icon ? (
            icon
          ) : (
            <EditIcon className="mt-4 w-12 h-12 m-auto text-accent" />
          )}
          <p className="text-heading text-xl font-bold mt-4">{t(title)}</p>
          <p className="text-body-dark dark:text-muted leading-relaxed py-2 px-6">
            {t(description)}
          </p>
          <input
            type="text"
            value={inputText}
            onChange={handleInputChange}
            className="border border-gray-300 rounded-md w-full p-2 my-4"
            placeholder={t('Escriba algo...')}
          />
          <div className="flex items-center justify-between space-s-4 w-full mt-8">
            <div className="w-1/2">
              <Button
                onClick={onCancel}
                loading={cancelBtnLoading}
                disabled={cancelBtnLoading}
                variant="custom"
                className={cn(
                  'w-full py-2 px-4 bg-accent focus:outline-none hover:bg-accent-hover focus:bg-accent-hover text-light transition ease-in duration-200 text-center text-base font-semibold rounded shadow-md',
                  cancelBtnClassName
                )}
              >
                {t(cancelBtnText)}
              </Button>
            </div>

            <div className="w-1/2">
              <Button
                onClick={handleEditClick}
                loading={editBtnLoading}
                disabled={editBtnLoading}
                variant="custom"
                className={cn(
                  'w-full py-2 px-4 bg-blue-600 focus:outline-none hover:bg-blue-700 focus:bg-blue-700 text-light transition ease-in duration-200 text-center text-base font-semibold rounded shadow-md',
                  editBtnClassName
                )}
              >
                {t(editBtnText)}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditConfirmationCard;
