import { NativeStackNavigationProp } from "@react-navigation/native-stack";

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
};

// Navigation Props Types
export type AuthScreenNavigationProp = NativeStackNavigationProp<AuthStackParamList>;
export type SetupScreenNavigationProp = keyof SetupStackParamList;
export type MainScreenNavigationProp = NativeStackNavigationProp<MainStackParamList>; 