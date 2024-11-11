import { create } from 'zustand';

interface SetupStore {
  // Personal Info
  fullName: string;
  birthDate: Date | null;
  setPersonalInfo: (fullName: string, birthDate: Date | null) => void;

  // Body Measurements
  height: string;
  weight: string;
  setBodyMeasurements: (height: string, weight: string) => void;

  // Activity Level
  activityLevel: {
    id: string;
    value: number;
  } | null;
  setActivityLevel: (level: { id: string; value: number }) => void;

  // Reset
  resetSetup: () => void;
}

export const useSetupStore = create<SetupStore>((set) => ({
  // Initial values
  fullName: '',
  birthDate: null,
  height: '',
  weight: '',
  activityLevel: null,

  // Setters
  setPersonalInfo: (fullName: string, birthDate: Date | null) =>
    set({ fullName, birthDate }),

  setBodyMeasurements: (height: string, weight: string) =>
    set({ height, weight }),

  setActivityLevel: (level) =>
    set({ activityLevel: level }),

  // Reset function
  resetSetup: () =>
    set({
      fullName: '',
      birthDate: new Date(),
      height: '',
      weight: '',
      activityLevel: null,
    }),
})); 