import RoutineDetail from '@/src/features/routines/screens/RoutineDetail';
import { useTheme } from '@/src/store/useThemeStore';
import { RoutineStackParamList } from '@/src/types/navigation';
import { useTranslation } from 'react-i18next';
import { Platform, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator<RoutineStackParamList>();

export const RoutineRoutes = ({ route }: { route: any }) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const { routine } = route.params.params;
  return (
    <Stack.Navigator
      screenOptions={{
        animation: Platform.OS === 'ios' ? 'default' : 'slide_from_right',
        animationDuration: 300,
        headerStyle: {
          backgroundColor: theme.customColors.background.default,
        },
      }}
    >
      <Stack.Screen
        name="RoutineDetails"
        component={RoutineDetail}
        options={{
          headerTitle: routine.name,
          headerBackTitle: t('routines.title'),
          headerTintColor: theme.customColors.secondary.main,
          headerTitleStyle: {
            color: theme.customColors.text.primary,
          },
          headerRight: () => (
            <TouchableOpacity>
              <Ionicons name="settings-outline" size={24} color={theme.customColors.secondary.main} />
            </TouchableOpacity>
          ),
        }}
      />
    </Stack.Navigator>
  );
};
