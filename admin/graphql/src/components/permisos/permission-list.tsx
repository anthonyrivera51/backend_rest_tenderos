import Pagination from '@/components/ui/pagination';
import { Table } from '@/components/ui/table';
import ActionButtons from '@/components/common/action-buttons';
import { useMeQuery } from '@/graphql/me.graphql';
import { useTranslation } from 'next-i18next';
import { useIsRTL } from '@/utils/locals';
import {
  UserPaginator,
  SortOrder,
  QueryUsersOrderByColumn,
} from '__generated__/__types__';
import { useMemo, useState } from 'react';
import debounce from 'lodash/debounce';
import TitleWithSort from '@/components/ui/title-with-sort';
import { NoDataFound } from '@/components/icons/no-data-found';
import Badge from '@/components/ui/badge/badge';
import Avatar from '../common/avatar';

type IProps = {
  customers: UserPaginator | null | undefined;
  onPagination: (current: number) => void;
  refetch: Function;
};

const PermissionsList = ({ customers, onPagination, refetch }: IProps) => {
  const { data, paginatorInfo } = customers!;
  const { t } = useTranslation();
  const { alignLeft } = useIsRTL();

  const [order, setOrder] = useState<SortOrder>(SortOrder.Desc);
  const [column, setColumn] = useState<string>();

  const debouncedHeaderClick = useMemo(
    () =>
      debounce((value) => {
        setColumn(value);
        setOrder(order === SortOrder.Desc ? SortOrder.Asc : SortOrder.Desc);
        refetch({
          orderBy: [
            {
              column: value,
              order: order === SortOrder.Desc ? SortOrder.Asc : SortOrder.Desc,
            },
          ],
        });
      }, 500),
    [order],
  );
  const staticPermissions = [
    'Admin',
    'Cashier',
    'Coustomer',
    'Seller',
  ];

  const columns = [
    {
        title: t('table:table-item-permissions'),
        dataIndex: 'permissions',
        key: 'permissions',
        align: alignLeft,
        width: 300,
        render: function (permissions, record, index) {
          const permission = staticPermissions[index] || 'Sin permiso asignado';
          return (
            <span className="rounded bg-gray-200/50 px-2.5 py-1">
              {permission}
            </span>
          );
        },
      },
    {
      title: t('table:table-item-actions'),
      dataIndex: 'id',
      key: 'actions',
      align: 'right',
      width: 120,
      render: function Render(id: string, { is_active }: any) {
        const { data: currentUser } = useMeQuery();
        return (
          <>
            {currentUser?.me?.id !== id && (
              <ActionButtons
                id={id}
                editModalView={true}
                deleteModalView={true}
              />
            )}
          </>
        );
      },
    },
  ];

  return (
    <>
      <div className="mb-6 overflow-hidden rounded shadow">
        <Table
          // @ts-ignore
          columns={columns}
          emptyText={() => (
            <div className="flex flex-col items-center py-7">
              <NoDataFound className="w-52" />
              <div className="mb-1 pt-6 text-base font-semibold text-heading">
                {t('table:empty-table-data')}
              </div>
              <p className="text-[13px]">{t('table:empty-table-sorry-text')}</p>
            </div>
          )}
          data={data}
          rowKey="id"
          scroll={{ x: 1000 }}
        />
      </div>

      {!!paginatorInfo.total && (
        <div className="flex items-center justify-end">
          <Pagination
            total={paginatorInfo.total}
            current={paginatorInfo.currentPage}
            pageSize={paginatorInfo.perPage}
            onChange={onPagination}
          />
        </div>
      )}
    </>
  );
};

export default PermissionsList;
