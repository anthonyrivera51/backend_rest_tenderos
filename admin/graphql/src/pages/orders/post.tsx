import Cart from '@/components/cart/cart';
import CartCounterButton from '@/components/cart/cart-counter-button';
import Card from '@/components/common/card';
import PageHeading from '@/components/common/page-heading';
import Search from '@/components/common/search';
import { ArrowDown } from '@/components/icons/arrow-down';
import { ArrowUp } from '@/components/icons/arrow-up';
import Layout from '@/components/layouts/admin';
import ProductCard from '@/components/product/card';
import CategoryTypeFilter from '@/components/filters/category-type-filter';
import Drawer from '@/components/ui/drawer';
import DrawerWrapper from '@/components/ui/drawer-wrapper';
import ErrorMessage from '@/components/ui/error-message';
import Loader from '@/components/ui/loader/loader';
import NotFound from '@/components/ui/not-found';
import Pagination from '@/components/ui/pagination';
import { useUI } from '@/contexts/ui.context';
import { useProductsQuery } from '@/graphql/products.graphql';
import { QueryProductsOrderByColumn } from '@/types/custom-types';
import { adminOnly } from '@/utils/auth-utils';
import { formatSearchParams } from '@/utils/format-search-params';
import {
  Category,
  Product,
  ProductStatus,
  SortOrder,
  Type,
} from '__generated__/__types__';
import cn from 'classnames';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import ProductSearch from '@/components/barcode/barCode';

export default function ProductsPage() {
  const { t } = useTranslation();
  const { locale } = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [type, setType] = useState('');
  const [category, setCategory] = useState('');
  const [page, setPage] = useState(1);
  const [visible, setVisible] = useState(false);
  const { displayCartSidebar, closeCartSidebar } = useUI();
  const toggleVisible = () => {
    setVisible((v) => !v);
  };

  const { data, loading, error, refetch } = useProductsQuery({
    variables: {
      language: locale,
      first: 18,
      search: formatSearchParams({
        status: ProductStatus.Publish.toLocaleLowerCase() as ProductStatus,
      }),
      orderBy: QueryProductsOrderByColumn.CREATED_AT,
      sortedBy: SortOrder.Desc,
      // orderBy: [
      //   {
      //     column: QueryProductsOrderByColumn.CreatedAt,
      //     order: SortOrder.Desc,
      //   },
      // ],
      page: 1,
    },
    fetchPolicy: 'network-only',
  });

  useEffect(() => {
    refetch({
      search: formatSearchParams({
        status: ProductStatus.Publish.toLocaleLowerCase() as ProductStatus,
        name: searchTerm,
        type,
        categories: category,
      }),
      page,
    });
  }, [type, searchTerm, category, page]);

  if (loading) return <Loader text={t('common:text-loading')} />;
  if (error) return <ErrorMessage message={error.message} />;

  const { products } = data as any;
  return (
    <>
      <div className="container mx-auto">
        <p className="text-center">POST</p>
        <br />
        <ProductSearch/>
      </div>
    </>
  );
}
ProductsPage.authenticate = {
  permissions: adminOnly,
};
ProductsPage.Layout = Layout;

export const getStaticProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ['table', 'common', 'form'])),
  },
});
