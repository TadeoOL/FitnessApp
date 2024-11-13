import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "@expo/vector-icons/Ionicons";
import SetsScreen from "@/src/features/sets/screens";
import DashboardScreen from "@/src/features/dashboard/screens";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { RootStackParamList } from "@/src/types/navigation";
import { useTheme } from "@/src/store/useThemeStore";

const Tab = createBottomTabNavigator();

export const MainRoutes = () => {
  const theme = useTheme();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Sets") {
            iconName = focused ? "barbell" : "barbell-outline";
          }

          return <Ionicons name={iconName as any} size={size} color={color} />;
        },
        tabBarActiveTintColor: theme.customColors.secondary.main,
        tabBarInactiveTintColor: theme.customColors.text.secondary,
        tabBarStyle: {
          backgroundColor: theme.customColors.background.paper,
          borderTopColor: theme.customColors.divider,
        },
        animation: "slide_from_right",
        animationDuration: 300,
      })}
    >
      <Tab.Screen
        name="Home"
        options={{
          headerShown: true,
          headerTitle: "",
          headerStyle: {
            backgroundColor: "transparent",
          },
          headerLeft: () => (
            <Ionicons
              name="cog-outline"
              size={24}
              style={{
                marginLeft: 15,
                color: theme.customColors.secondary.main,
              }}
              onPress={() => {
                navigation.navigate("SettingsModal");
              }}
            />
          ),
        }}
        component={DashboardScreen}
      />
      <Tab.Screen name="Sets" component={SetsScreen} />
    </Tab.Navigator>
  );
};
