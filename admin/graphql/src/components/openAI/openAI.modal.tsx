import {
  useModalAction,
  useModalState,
} from '@/components/ui/modal/modal.context';
import { useTranslation } from 'next-i18next';
import TextArea from '@/components/ui/text-area';
import Button from '@/components/ui/button';
import { useGenerateDescriptionMutation } from '@/graphql/ai.graphql';
//@ts-ignore
import { GenerateDescriptionInput } from '__generated__/__types__';
// import { useCopyToClipboard } from 'react-use';
import { useWatch, useForm } from 'react-hook-form';
import { isEmpty } from 'lodash';
import Select from '@/components/ui/select/select';
import { useCallback } from 'react';
import { ItemProps } from '@/types/custom-types';
import { selectStylesModern } from '@/components/ui/select/select.styles';

const GenerateDescription = () => {
  const { t } = useTranslation('common');
  const { closeModal } = useModalAction();

  const [generateDescriptionMutation, { data, loading: isLoading }] =
    useGenerateDescriptionMutation();

  const onSubmit = useCallback(({ prompt }: { prompt: string }) => {
    if (!isEmpty(prompt)) {
      generateDescriptionMutation({
        variables: {
          input: {
            prompt,
          },
        },
      });
    }
  }, []);

  const {
    data: { name, set_value, key, suggestion, maxMenuHeight },
  } = useModalState();

  const methods = useForm<GenerateDescriptionInput>({
    defaultValues: { prompt: `Write a description about ${name ?? ''}` },
  });

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = methods;

  const prompt = useWatch({
    control,
    name: 'prompt',
  });

  const onTypeFilter = useCallback((item: ItemProps) => {
    setValue('prompt', item?.title);
  }, []);

  const syncPromptContent = useCallback(
    (data: string) => {
      if (!isEmpty(data)) {
        set_value(key, data);
        closeModal();
      }
    },
    [data]
  );

  // const [_, copyToClipboard] = useCopyToClipboard();

  return (
    <div className="flex h-full min-h-screen w-screen flex-col justify-center bg-light p-4 md:h-auto md:min-h-0 md:max-w-[590px] md:rounded-xl md:p-12 lg:max-w-[836px]">
      <form onSubmit={handleSubmit(onSubmit)} className="mb-8">
        <div className="space-y-4">
          {!isEmpty(suggestion) ? (
            <Select
              isDisabled={isLoading}
              options={suggestion}
              getOptionLabel={(option: any) => option?.title}
              getOptionValue={(option: any) => option?.title}
              placeholder={
                'Please Select Some auto generated Prompt suggestion'
              }
              onChange={onTypeFilter as any}
              className="shadow-promptSuggestion"
              styles={selectStylesModern}
              maxMenuHeight={maxMenuHeight ?? 495}
            />
          ) : (
            ''
          )}
          <div className="">
            <TextArea
              label="Prompt"
              {...register('prompt')}
              error={t(errors.prompt?.message!)}
              variant="outline"
              className="w-full"
              disabled={isLoading}
            />
            <div className="mt-6 flex shrink-0 justify-end">
              <Button
                loading={isLoading}
                disabled={isLoading || isEmpty(prompt)}
              >
                {isEmpty(data?.generateDescriptions?.result)
                  ? 'Generate With AI'
                  : 'Regenerate With AI'}
              </Button>
            </div>
          </div>
        </div>
      </form>
      <div className="group relative space-y-4">
        <div className="relative">
          <TextArea
            name="Generated Description"
            inputClassName="h-72"
            label="Output"
            value={data?.generateDescriptions?.result as string}
            disabled={true}
          />
          {isLoading && (
            <div className="absolute top-1/2 left-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 transform">
              <span
                className="block h-full w-full animate-spin rounded-full border-2 border-t-2 border-transparent ms-2"
                style={{
                  borderTopColor: 'var(--color-accent)',
                }}
              />
            </div>
          )}
        </div>
        {/* {data && (
          <>
            <button
              type="button"
              onClick={() => {
                copyToClipboard(data);
                toast.success(t('Copied to clipboard'));
              }}
              className="absolute right-5 top-10 text-accent-500 transition hover:text-accent-400 group-hover:opacity-100 md:opacity-0"
            >
              <ClipboardIcon />
            </button>
          </>
        )} */}
        <div className="text-right">
          <Button
            disabled={isEmpty(data?.generateDescriptions?.result) || isLoading}
            onClick={() =>
              syncPromptContent(data?.generateDescriptions?.result as string)
            }
          >
            Sync Content
          </Button>
        </div>
      </div>
    </div>
  );
};

export default GenerateDescription;
