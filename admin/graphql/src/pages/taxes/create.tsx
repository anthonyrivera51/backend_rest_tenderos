import PageHeading from '@/components/common/page-heading';
import Layout from '@/components/layouts/admin';
import CreateImpuesto from '@/components/tax/tax-form';
import CreateOrUpdateTaxForm from '@/components/tax/tax-form';
import { adminOnly } from '@/utils/auth-utils';
import Card from '@/components/common/card';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export default function CreateTaxPage() {
  const { t } = useTranslation();
  return (
    <>
      <Card className="mb-8 flex flex-col items-center md:flex-row">
        <div className="mb-4 md:mb-0 md:w-1/4">
          <PageHeading title={t('Agregar impuesto')} />
        </div>
      </Card>
      <CreateImpuesto />
    </>
  );
}
CreateTaxPage.authenticate = {
  permissions: adminOnly,
};
CreateTaxPage.Layout = Layout;

export const getStaticProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ['table', 'form', 'common'])),
  },
});
