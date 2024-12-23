import { useQuery } from '@tanstack/react-query';
import { getRoutines } from '../services/routine.service';
import { Routine } from '../types/routine.type';

export const useGetRoutines = () => {
  return useQuery<Routine[]>({ queryKey: ['routines'], queryFn: getRoutines });
};
