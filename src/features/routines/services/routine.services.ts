const baseUrl = '/routines';
import axios from '@/src/services/axios';
import { Routine } from '../types/routine.type';

export const getRoutines = async (): Promise<Routine[]> => {
  const response = await axios.get<Routine[]>(`${baseUrl}/`);
  return response.data;
};
