import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Text, TouchableOpacity, Platform } from "react-native";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import {
  RootStackParamList,
  SettingsStackParamList,
} from "@/src/types/navigation";
import { useTranslation } from "react-i18next";
import SettingsScreen from "@/src/features/settings/screens";
import SettingsDisplayScreen from "@/src/features/settings/screens/SettingsDisplay";
import { useTheme } from "@/src/store/useThemeStore";

const Stack = createNativeStackNavigator<SettingsStackParamList>();

const SettingsDetailScreen = () => <Text>Settings Detail Screen</Text>;

export const SettingsRoutes = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <Stack.Navigator
      screenOptions={{
        animation: Platform.OS === "ios" ? "default" : "slide_from_right",
        animationDuration: 300,
        headerStyle: {
          backgroundColor: theme.customColors.background.default,
        },
      }}
    >
      <Stack.Screen
        name="SettingsMain"
        component={SettingsScreen}
        options={{
          headerRight: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Text
                style={{
                  color: theme.customColors.secondary.main,
                  fontSize: 17,
                  fontWeight: "400",
                  marginRight: 16,
                }}
              >
                {t("common.done")}
              </Text>
            </TouchableOpacity>
          ),
          title: t("settings.title"),
          headerStyle: {
            backgroundColor: theme.customColors.background.default,
          },
        }}
      />
      <Stack.Screen
        name="SettingsDetail"
        component={SettingsDetailScreen}
        options={{
          title: t("settings.detail.title"),
          headerTintColor: theme.customColors.secondary.main,
        }}
      />
      <Stack.Screen
        name="SettingsDisplay"
        component={SettingsDisplayScreen}
        options={{
          title: t("settings.sections.display"),
          headerTintColor: theme.customColors.secondary.main,
          headerTitleStyle: {
            color: theme.customColors.text.primary,
          },
        }}
      />
    </Stack.Navigator>
  );
};
