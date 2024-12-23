import { useQuery } from '@tanstack/react-query';
import { ExerciseService } from '../services/exercise.service';
import { Exercise } from '../types/routine.type';

export const useGetExercises = () => {
  return useQuery<Exercise[]>({
    queryKey: ['exercises'],
    queryFn: ExerciseService.getExercises,
  });
};
