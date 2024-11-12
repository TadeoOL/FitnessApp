import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { BasicInfoScreen } from "../../features/initialForm/screens/BasicInfoScreen";
import { PersonalInfoScreen } from "@/src/features/initialForm/screens/PersonalInfoScreen";
import { BodyMeasurementsScreen } from "@/src/features/initialForm/screens/BodyMeasurementsScreen";
import { ActivityLevelScreen } from "@/src/features/initialForm/screens/ActivityLevelScreen";
import { ThemeToggle } from "@/src/components/ThemeToggle";
import { useAppTheme } from "@/src/hooks/useAppTheme";
import { View } from "react-native";
import { LanguageToggle } from "@/src/components/LanguageToggle";
// import { ActivityLevelScreen } from "../../features/initialForm/screens/ActivityLevelScreen";

const Stack = createNativeStackNavigator();

export const InitialFormValidator = () => {
  const { theme } = useAppTheme();
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        headerTitle: "",
        animation: "slide_from_right",
        headerRight: () => (
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <LanguageToggle />
            <ThemeToggle />
          </View>
        ),
        animationDuration: 200,
        gestureEnabled: true,
        gestureDirection: "horizontal",
        contentStyle: {
          backgroundColor: theme.customColors.background.default,
        },
        headerStyle: {
          backgroundColor: "transparent",
        },
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
