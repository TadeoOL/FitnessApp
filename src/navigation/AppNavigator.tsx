import { useAuthStore } from "../features/auth/store/useAuth";
import { AuthRoutes } from "./routes/AuthRoutes";
import { SetupRoutes } from "./routes/SetupRoutes";
import { MainRoutes } from "./routes/MainRoutes";

export const AppNavigator = () => {
  const { isLoggedIn, hasCompletedSetup } = useAuthStore();

  if (!isLoggedIn) {
    return <AuthRoutes />;
  }

  if (!hasCompletedSetup) {
    return <SetupRoutes />;
  }

  return <MainRoutes />;
};
