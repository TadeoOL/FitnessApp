import { NavigatorScreenParams, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Routine } from '../features/routines/types/routine.type';

// Auth Stack
export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
  ForgotPassword?: { email?: string };
};

// Setup Stack
export type SetupStackParamList = {
  BasicInfo: undefined;
  PersonalInfo: undefined;
  BodyMeasurements: undefined;
  ActivityLevel: undefined;
};

// Main Stack
export type MainStackParamList = {
  Home: undefined;
  Profile: undefined;
  Workouts: undefined;
  Routines: undefined;
  RoutineRoutes: NavigatorScreenParams<RoutineStackParamList>;
  RoutineEdit: {
    routine: Routine;
  };
  AddExercise: {
    routineId: string;
  };
};

// Navigation Props Types
export type AuthScreenNavigationProp = NativeStackNavigationProp<AuthStackParamList>;
export type SetupScreenNavigationProp = keyof SetupStackParamList;
export type MainScreenNavigationProp = NativeStackNavigationProp<MainStackParamList>;

export type RootStackParamList = {
  MainTabs: undefined;
  SettingsModal: undefined;
  RoutineRoutes: NavigatorScreenParams<RoutineStackParamList>;
};

export type RootStackNavigationProp = NativeStackNavigationProp<RootStackParamList>;
export type SettingsStackParamList = {
  SettingsMain: undefined;
  SettingsDetail: undefined;
  SettingsDisplay: undefined;
  SettingsAccount: undefined;
};

export type SettingsStackNavigationProp = NativeStackNavigationProp<SettingsStackParamList>;
// Routine Stack
export type RoutineStackParamList = {
  Routines: undefined;
  RoutineDetails?: {
    routine?: Routine;
  };
  RoutineEdit: {
    routine: Routine;
  };
  AddExerciseModal: {
    routine?: Routine;
  };
  AddRoutineModal: undefined;
  DetailsRoutine: undefined;
  ChangeOrderRoutine: undefined;
};

// Añade el tipo de navegación para rutinas
export type RoutineScreenNavigationProp = NativeStackNavigationProp<RoutineStackParamList>;
export type RoutineScreenRouteProp = RouteProp<RoutineStackParamList, 'RoutineDetails' | 'AddExerciseModal'>;
