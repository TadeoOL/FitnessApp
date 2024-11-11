import { AuthNavigator } from "../navigators/AuthNavigator";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const AuthStack = createNativeStackNavigator();

export const AuthRoutes = () => {
  return (
    <AuthStack.Navigator screenOptions={{ headerShown: false }}>
      <AuthStack.Screen name="Auth" component={AuthNavigator} />
    </AuthStack.Navigator>
  );
};
