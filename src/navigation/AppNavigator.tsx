import { useAuthStore } from "../features/auth/store/useAuth";
import { AuthRoutes } from "./routes/AuthRoutes";
import { SetupRoutes } from "./routes/SetupRoutes";
import { RootStack } from "./stacks/RootStack";
import { AuthInitializer } from "../features/auth/components/AuthInitializer";

export const AppNavigator = () => {
  return (
    <AuthInitializer>
      <NavigatorContent />
    </AuthInitializer>
  );
};

const NavigatorContent = () => {
  const { hasCompletedSetup, isLoggedIn } = useAuthStore();

  if (!isLoggedIn) {
    return <AuthRoutes />;
  }

  if (!hasCompletedSetup) {
    return <SetupRoutes />;
  }

  return <RootStack />;
};
