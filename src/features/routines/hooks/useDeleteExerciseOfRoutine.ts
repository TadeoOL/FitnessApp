import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteExerciseOfRoutine } from '../services/routine.service';

const useDeleteExerciseOfRoutine = (exerciseId: string, routineId: string) => {
  const queryClient = useQueryClient();
  const { mutate: deleteExerciseOfRoutineMutation } = useMutation({
    mutationFn: async () => await deleteExerciseOfRoutine(exerciseId, routineId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['routines'] });
    },
    onError: (error) => {
      console.error('Error deleting exercise of routine', error);
    },
  });
  return { deleteExerciseOfRoutineMutation };
};

export default useDeleteExerciseOfRoutine;
