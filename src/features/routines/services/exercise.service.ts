const baseUrl = 'exercises';
import axios from '@/src/services/axios';
import { Exercise } from '../types/routine.type';

export namespace ExerciseService {
  export const getExercises = async (): Promise<Exercise[]> => {
    const response = await axios.get<Exercise[]>(baseUrl);
    return response.data;
  };
}
