import { create } from "zustand";

interface Action {
  setIsLoggedIn: (isLoggedIn: boolean) => void;
  setHasCompletedSetup: (hasCompletedSetup: boolean) => void;
  logout: () => void;
}

interface State {
  isLoggedIn: boolean;
  hasCompletedSetup: boolean;
}

const initialState: State = {
  isLoggedIn: false,
  hasCompletedSetup: false,
};

export const useAuthStore = create<Action & State>()((set) => ({
  ...initialState,
  setIsLoggedIn: (isLoggedIn: boolean) => set({ isLoggedIn }),
  setHasCompletedSetup: (hasCompletedSetup: boolean) =>
    set({ hasCompletedSetup }),
  logout: () => set(initialState),
}));
