import Layout from '@/components/layouts/admin';
import ModulesForm from '@/components/modulo/modules-form';
import { adminOnly } from '@/utils/auth-utils';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export default function CreateModules() {
  const { t } = useTranslation();
  return (
    <>
      <div className="flex border-b border-dashed border-border-base pb-5 md:pb-7">
        <h1 className="text-lg font-semibold text-heading">
          {t('form:form-title-create-modules')}
        </h1>
      </div>
      <ModulesForm/>
    </>
  );
}
CreateModules.authenticate = {
  permissions: adminOnly,
};
CreateModules.Layout = Layout;

export const getStaticProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ['table', 'form', 'common'])),
  },
});
