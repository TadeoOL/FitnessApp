import { TFunction } from 'i18next';
import { z } from 'zod';

export const routineSchema = (t: TFunction) =>
  z.object({
    name: z.string().min(1, { message: t('routines.nameRequired') }),
    description: z.string().optional(),
  });

export type RoutineType = z.infer<ReturnType<typeof routineSchema>>;
