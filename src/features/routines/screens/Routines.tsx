import { StyleSheet, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { RoutineList } from '../components/RoutineList';
import { useGetRoutines } from '../hooks/useGetRoutines';
import { CustomTheme } from '@/src/theme/theme';
import { useTheme } from '@/src/store/useThemeStore';
import { Routine } from '../types/routine.type';
import { RootStackNavigationProp } from '@/src/types/navigation';
import FullScreenLoader from '@/src/components/FullScreenLoader';
import { useNavigation } from '@react-navigation/native';
import { useEffect } from 'react';
import { useRoutineStore } from '../store/store.routine';
import { useDeleteRoutine } from '../hooks/useDeleteRoutine';
import Toast from 'react-native-toast-message';
import { ToastComponent } from '@/src/components/toast/ToastComponent';

const RoutinesScreen = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const { data: routinesResponse, isLoading } = useGetRoutines();
  const navigation = useNavigation<RootStackNavigationProp>();
  const { routines, setRoutines, setRoutine, deleteRoutine: deleteRoutineStore } = useRoutineStore();
  const { mutateAsync: deleteRoutine } = useDeleteRoutine();

  const onRoutinePress = (routine: Routine) => {
    navigation.navigate('RoutineRoutes', {
      screen: 'RoutineDetails',
    });
    setRoutine(routine);
  };

  const onAddRoutine = () => {
    navigation.navigate('RoutineRoutes', {
      screen: 'AddRoutineModal',
    });
  };

  const onDeleteRoutine = (routine: Routine) => {
    deleteRoutine(routine.id, {
      onSuccess: () => {
        deleteRoutineStore(routine.id);
        Toast.show({
          type: 'success',
          text1: t('routines.routineDeleted'),
        });
      },
      onError: (error) => {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: error.message,
        });
      },
    });
  };

  useEffect(() => {
    if (routinesResponse) {
      setRoutines(routinesResponse);
    }
  }, [routinesResponse]);

  if (isLoading) {
    return <FullScreenLoader />;
  }

  console.log({ routines });

  return (
    <View style={styles(theme).container}>
      <Text style={styles(theme).title}>{t('routines.title')}</Text>
      <RoutineList
        routines={routines || []}
        onRoutinePress={onRoutinePress}
        onAddRoutine={onAddRoutine}
        onDeleteRoutine={onDeleteRoutine}
      />
      <ToastComponent />
    </View>
  );
};

const styles = (theme: CustomTheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: 10,
      gap: 10,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      color: theme.customColors.text.primary,
    },
  });

export default RoutinesScreen;
