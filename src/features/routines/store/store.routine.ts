import { create } from 'zustand';
import { Exercise, Routine } from '../types/routine.type';

interface State {
  routines: Routine[];
  routine: Routine | null;
}

interface Actions {
  setRoutines: (routines: Routine[]) => void;
  addExerciseToRoutine: (routineId: string, exercise: Exercise) => void;
  setRoutine: (routine: Routine) => void;
  deleteExerciseOfRoutine: (routineId: string, exerciseId: string) => void;
  addRoutine: (routine: Routine) => void;
  deleteRoutine: (routineId: string) => void;
  updateRoutine: (routine: Routine) => void;
}

const initialState: State = {
  routines: [],
  routine: null,
};

export const useRoutineStore = create<State & Actions>()((set, get) => ({
  ...initialState,
  setRoutines: (routines: Routine[]) => set({ routines }),
  addExerciseToRoutine: (routineId: string, exercise: Exercise) => {
    const { routines, routine } = get();

    const updatedRoutines = routines.map((routineItem) => {
      if (routineItem.id === routineId) {
        const exists = routineItem.exercises.some((e) => e.exerciseId.id === exercise.id);
        if (!exists) {
          return {
            ...routineItem,
            exercises: [
              ...routineItem.exercises,
              {
                _id: exercise.id,
                order: routineItem.exercises.length + 1,
                exerciseId: exercise,
              },
            ],
          };
        }
      }
      return routineItem;
    });

    const updatedRoutine =
      routine && routine.id === routineId
        ? {
            ...routine,
            exercises: [
              ...routine.exercises,
              {
                _id: exercise.id,
                order: routine.exercises.length + 1,
                exerciseId: exercise,
              },
            ],
          }
        : routine;

    set({ routines: updatedRoutines, routine: updatedRoutine });
  },
  deleteExerciseOfRoutine: (routineId: string, exerciseId: string) => {
    const { routines, routine } = get();

    const updatedRoutines = routines.map((routineItem) => {
      if (routineItem.id === routineId) {
        const filteredExercises = routineItem.exercises
          .filter((e) => e.exerciseId.id !== exerciseId)
          .map((exercise, index) => ({
            ...exercise,
            order: index + 1,
          }));
        return { ...routineItem, exercises: filteredExercises };
      }
      return routineItem;
    });

    const updatedRoutine =
      routine && routine.id === routineId
        ? {
            ...routine,
            exercises: routine.exercises
              .filter((e) => e.exerciseId.id !== exerciseId)
              .map((exercise, index) => ({
                ...exercise,
                order: index + 1,
              })),
          }
        : routine;

    set({ routines: updatedRoutines, routine: updatedRoutine });
  },
  setRoutine: (routine: Routine) => set({ routine }),
  addRoutine: (routine: Routine) => set({ routines: [...get().routines, routine] }),
  deleteRoutine: (routineId: string) => {
    const { routines } = get();
    const updatedRoutines = routines.filter((routine) => routine.id !== routineId);
    set({ routines: updatedRoutines });
  },
  updateRoutine: (routine: Routine) => {
    const { routines, routine: currentRoutine } = get();
    const updatedRoutines = routines.map((r) =>
      r.id === routine.id ? { ...r, name: routine.name, description: routine.description } : r
    );
    set({
      routines: updatedRoutines,
      routine: { ...(currentRoutine as Routine), name: routine.name, description: routine.description },
    });
  },
}));
