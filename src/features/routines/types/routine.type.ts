export enum MuscleGroup {
  LEGS = 'LEGS',
  CHEST = 'CHEST',
  // Añade los demás grupos musculares según necesites
}

export enum Equipment {
  BARBELL = 'BARBELL',
  MACHINE = 'MACHINE',
  // Añade los demás equipos según necesites
}

export interface Exercise {
  id: string;
  name: string;
  description: string;
  muscleGroup: MuscleGroup;
  equipment: Equipment;
  createdAt: string;
  updatedAt: string;
}

export interface RoutineExercise {
  exerciseId: Exercise;
  order: number;
  _id: string;
}

export interface Routine {
  id: string;
  name: string;
  userId: string;
  description: string;
  exercises: RoutineExercise[];
  createdAt: string;
  updatedAt: string;
}
