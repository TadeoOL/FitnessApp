import { useAuthStore } from "../features/auth/store/useAuth";
import { AuthRoutes } from "./routes/AuthRoutes";
import { SetupRoutes } from "./routes/SetupRoutes";
import { RootStack } from "./stacks/RootStack";

export const AppNavigator = () => {
  const { hasCompletedSetup, isLoggedIn } = useAuthStore();

  if (!isLoggedIn) {
    return <AuthRoutes />;
  }

  if (!hasCompletedSetup) {
    return <SetupRoutes />;
  }

  return <RootStack />;
};
