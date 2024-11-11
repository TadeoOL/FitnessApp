import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Text } from "react-native";

const MainStack = createNativeStackNavigator();

export const MainRoutes = () => {
  return (
    <MainStack.Navigator>
      <MainStack.Screen name="Home" component={() => <Text>Home</Text>} />
    </MainStack.Navigator>
  );
};
