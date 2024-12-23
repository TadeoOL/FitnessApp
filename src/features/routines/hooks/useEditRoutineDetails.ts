import { useMutation } from '@tanstack/react-query';
import { updateRoutine } from '../services/routine.service';

export const useEditRoutineDetails = (routineId: string) => {
  return useMutation({
    mutationFn: (routine: { name: string; description?: string }) => updateRoutine(routineId, routine),
  });
};
