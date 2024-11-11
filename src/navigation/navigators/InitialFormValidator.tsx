import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { BasicInfoScreen } from "../../features/initialForm/screens/BasicInfoScreen";
import { PersonalInfoScreen } from "@/src/features/initialForm/screens/PersonalInfoScreen";
import { BodyMeasurementsScreen } from "@/src/features/initialForm/screens/BodyMeasurementsScreen";
import { ActivityLevelScreen } from "@/src/features/initialForm/screens/ActivityLevelScreen";
// import { ActivityLevelScreen } from "../../features/initialForm/screens/ActivityLevelScreen";

const Stack = createNativeStackNavigator();

export const InitialFormValidator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: "slide_from_right",
        animationDuration: 200,
        gestureEnabled: true,
        gestureDirection: "horizontal",
        contentStyle: {
          backgroundColor: "#fff",
        },
        presentation: "card",
      }}
    >
      <Stack.Screen name="BasicInfo" component={BasicInfoScreen} />
      <Stack.Screen name="PersonalInfo" component={PersonalInfoScreen} />
      <Stack.Screen
        name="BodyMeasurements"
        component={BodyMeasurementsScreen}
      />
      <Stack.Screen name="ActivityLevel" component={ActivityLevelScreen} />
    </Stack.Navigator>
  );
};
