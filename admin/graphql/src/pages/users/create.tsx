import Card from '@/components/common/card';
import Layout from '@/components/layouts/admin';
import Search from '@/components/common/search';
import UsersList from '@/components/user/user-list';
import LinkButton from '@/components/ui/link-button';
import { useCustomersQuery } from '@/graphql/customers.graphql';
import { LIMIT } from '@/utils/constants';
import { useState } from 'react';
import ErrorMessage from '@/components/ui/error-message';
import Loader from '@/components/ui/loader/loader';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { adminOnly } from '@/utils/auth-utils';
import { QueryUsersOrderByColumn, SortOrder, UserPaginator } from '__generated__/__types__';
import { Routes } from '@/config/routes';
import PageHeading from '@/components/common/page-heading';
import LocalStorageUserTable from '@/components/user/user-list-table';
import CreateProduct from '@/components/product/product-create';
import AccordionUsage from '@/components/user/user-acordion-create';

export default function CreateProductPage() {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');

  const { data, loading, error, refetch } = useCustomersQuery({
    variables: {
      first: LIMIT,
      page: 1,
      orderBy: [
        {
          column: QueryUsersOrderByColumn.UpdatedAt,
          order: SortOrder.Desc,
        },
      ],
    },
    fetchPolicy: 'network-only',
  });
  if (loading) return <Loader text={t('common:text-loading')} />;
  if (error) return <ErrorMessage message={error.message} />;

  return (
    <>
      <Card className="mb-8 flex flex-col items-center md:flex-row">
        <div className="mb-4 md:mb-0 md:w-1/4">
          <PageHeading title={t('Crear usuario')} />
        </div>
      </Card>
      <AccordionUsage/>

    </>
  );
}
CreateProductPage.authenticate = {
  permissions: adminOnly,
};
CreateProductPage.Layout = Layout;

export const getStaticProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ['table', 'common', 'form'])),
  },
});
