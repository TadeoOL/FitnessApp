import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { MainRoutes } from "../routes/MainRoutes";
import { SettingsRoutes } from "../routes/SettingsRoutes";
import { RootStackParamList } from "../../types/navigation";
import { Platform } from "react-native";

const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        animation: Platform.OS === "ios" ? "default" : "slide_from_right",
        animationDuration: 300,
      }}
    >
      <Stack.Group>
        <Stack.Screen
          name="MainTabs"
          component={MainRoutes}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Group>
      <Stack.Group
        screenOptions={{
          presentation: "modal",
          animation: Platform.OS === "ios" ? "default" : "fade",
          animationDuration: 300,
        }}
      >
        <Stack.Screen
          name="SettingsModal"
          component={SettingsRoutes}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
};
