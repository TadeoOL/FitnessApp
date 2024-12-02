import { LANGUAGES_TYPE } from "../constants/languages";

export interface LoginResponse {
  token: string;
  user: {
    id: number;
    email: string;
  };
  hasCompletedSetup: boolean;
  language: LANGUAGES_TYPE;
}

export interface LoginRequest {
  email: string;
  password: string;
}
