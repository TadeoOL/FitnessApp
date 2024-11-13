import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { BasicInfoScreen } from "../../features/initialForm/screens/BasicInfoScreen";
import { PersonalInfoScreen } from "@/src/features/initialForm/screens/PersonalInfoScreen";
import { BodyMeasurementsScreen } from "@/src/features/initialForm/screens/BodyMeasurementsScreen";
import { ActivityLevelScreen } from "@/src/features/initialForm/screens/ActivityLevelScreen";
import { View } from "react-native";
import { LanguageToggle } from "@/src/components/LanguageToggle";
import { useTheme } from "@/src/store/useThemeStore";
// import { ActivityLevelScreen } from "../../features/initialForm/screens/ActivityLevelScreen";

const Stack = createNativeStackNavigator();

export const InitialFormValidator = () => {
  const theme = useTheme();
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        headerTitle: "",
        animation: "slide_from_right",
        headerShadowVisible: false,
        headerRight: () => (
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <LanguageToggle />
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
        headerTintColor: theme.customColors.secondary.main,
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
