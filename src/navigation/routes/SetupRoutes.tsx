import { InitialFormValidator } from "../navigators/InitialFormValidator";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const SetupStack = createNativeStackNavigator();

export const SetupRoutes = () => {
  return (
    <SetupStack.Navigator screenOptions={{ headerShown: false }}>
      <SetupStack.Screen name="InitialSetup" component={InitialFormValidator} />
    </SetupStack.Navigator>
  );
};
