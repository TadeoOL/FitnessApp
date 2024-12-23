const baseUrl = '/routines';
import axios from '@/src/services/axios';
import { Routine } from '../types/routine.type';

export const getRoutines = async (): Promise<Routine[]> => {
  const response = await axios.get<Routine[]>(`${baseUrl}/`);
  return response.data;
};

export const addExerciseToRoutine = async (exerciseId: string, routineId: string): Promise<Routine> => {
  const response = await axios.post<Routine>(`${baseUrl}/${routineId}/exercises`, { exerciseId });
  return response.data;
};

export const deleteExerciseOfRoutine = async (exerciseId: string, routineId: string): Promise<Routine> => {
  const response = await axios.delete<Routine>(`${baseUrl}/${routineId}/exercises/${exerciseId}`);
  return response.data;
};

export const createRoutine = async (routine: { name: string; description?: string }): Promise<Routine> => {
  const response = await axios.post<Routine>(`${baseUrl}/`, routine);
  return response.data;
};

export const deleteRoutine = async (routineId: string): Promise<void> => {
  await axios.delete<void>(`${baseUrl}/${routineId}`);
};

export const updateRoutine = async (
  routineId: string,
  routine: { name: string; description?: string }
): Promise<Routine> => {
  const response = await axios.put<Routine>(`${baseUrl}/${routineId}`, routine);
  return response.data;
};
