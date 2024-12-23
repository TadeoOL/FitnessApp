import RoutineDetail from '@/src/features/routines/screens/RoutineDetail';
import { useTheme } from '@/src/store/useThemeStore';
import { RoutineStackParamList } from '@/src/types/navigation';
import { Platform } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AddExercise from '@/src/features/routines/screens/AddExercise';
import AddRoutine from '@/src/features/routines/screens/AddRoutine';
import { DetailsRoutine } from '@/src/features/routines/screens/DetailsRoutine';

const RoutineStack = createNativeStackNavigator<RoutineStackParamList>();

export const RoutineRoutes = () => {
  const theme = useTheme();

  return (
    <RoutineStack.Navigator
      screenOptions={{
        animation: Platform.OS === 'ios' ? 'default' : 'slide_from_right',
        presentation: 'modal',
        animationDuration: 300,
        headerStyle: {
          backgroundColor: theme.customColors.background.default,
        },
      }}
    >
      <RoutineStack.Screen name="RoutineDetails" component={RoutineDetail} />
      <RoutineStack.Screen name="AddExerciseModal" component={AddExercise} options={{ presentation: 'modal' }} />
      <RoutineStack.Screen name="AddRoutineModal" component={AddRoutine} options={{ presentation: 'modal' }} />
      <RoutineStack.Screen name="DetailsRoutine" component={DetailsRoutine} options={{ presentation: 'modal' }} />
    </RoutineStack.Navigator>
  );
};
