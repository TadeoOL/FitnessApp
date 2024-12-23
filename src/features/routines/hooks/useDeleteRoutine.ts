import { useMutation } from '@tanstack/react-query';
import { deleteRoutine } from '../services/routine.service';

export const useDeleteRoutine = () => {
  return useMutation({
    mutationFn: deleteRoutine,
  });
};
