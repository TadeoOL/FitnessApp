import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons';
import SetsScreen from '@/src/features/sets/screens';
import DashboardScreen from '@/src/features/dashboard/screens';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '@/src/types/navigation';
import { useTheme } from '@/src/store/useThemeStore';
import { useTranslation } from 'react-i18next';
import RoutinesScreen from '@/src/features/routines/screens/Routines';

const Tab = createBottomTabNavigator();

export const MainRoutes = () => {
  const theme = useTheme();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { t } = useTranslation();
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === t('tabs.home')) {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === t('tabs.myPlans')) {
            iconName = focused ? 'document-text' : 'document-text-outline';
          } else if (route.name === t('tabs.routines')) {
            iconName = focused ? 'barbell' : 'barbell-outline';
          }

          return <Ionicons name={iconName as any} size={size} color={color} />;
        },
        tabBarActiveTintColor: theme.customColors.secondary.main,
        tabBarInactiveTintColor: theme.customColors.text.secondary,
        tabBarStyle: {
          backgroundColor: theme.customColors.background.paper,
          borderTopColor: theme.customColors.divider,
        },
        animation: 'fade',
      })}
    >
      <Tab.Screen
        name={t('tabs.home')}
        options={{
          headerShown: true,
          headerTitle: '',
          headerStyle: {
            backgroundColor: 'transparent',
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
                navigation.navigate('SettingsModal');
              }}
            />
          ),
        }}
        component={DashboardScreen}
      />
      <Tab.Screen name={t('tabs.myPlans')} component={SetsScreen} />
      <Tab.Screen
        name={t('tabs.routines')}
        component={RoutinesScreen}
        options={{ headerShown: true, headerStyle: { backgroundColor: 'transparent' }, headerTitle: '' }}
      />
    </Tab.Navigator>
  );
};
