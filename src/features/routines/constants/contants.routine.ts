import { TFunction } from 'i18next';

export const routineOptions = (t: TFunction) =>
  [
    { label: t('routines.options.editDetails'), value: 'editDetails' },
    { label: t('routines.options.changeOrder'), value: 'changeOrder' },
    { label: t('routines.options.sortBy'), value: 'sortBy' },
  ] as const;
