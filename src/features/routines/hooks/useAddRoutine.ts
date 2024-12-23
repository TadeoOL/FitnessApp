import { useMutation } from '@tanstack/react-query';
import { createRoutine } from '../services/routine.service';

export const useAddRoutine = () => {
  return useMutation({
    mutationFn: createRoutine,
  });
};
