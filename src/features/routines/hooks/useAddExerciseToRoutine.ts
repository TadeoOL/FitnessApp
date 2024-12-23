import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addExerciseToRoutine } from '../services/routine.service';

const useAddExerciseToRoutine = (exerciseId: string, routineId: string) => {
  const queryClient = useQueryClient();
  const { mutate: addExerciseToRoutineMutation } = useMutation({
    mutationFn: async () => await addExerciseToRoutine(exerciseId, routineId),
    onSuccess: (routine) => {
      console.log('Exercise added to routine', routine);
      queryClient.invalidateQueries({ queryKey: ['routines'] });
    },
    onError: (error) => {
      console.error('Error adding exercise to routine', error);
    },
  });
  return { addExerciseToRoutineMutation };
};

export default useAddExerciseToRoutine;
