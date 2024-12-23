import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@/src/store/useThemeStore';
import { Ionicons } from '@expo/vector-icons';
import { CustomTheme } from '@/src/theme/theme';
import { RoutineScreenNavigationProp } from '@/src/types/navigation';
import { useNavigation } from '@react-navigation/native';
import { useLayoutEffect } from 'react';
import { useRoutineStore } from '../store/store.routine';
import { Routine } from '../types/routine.type';

const RoutineDetail = () => {
  const theme = useTheme();
  const { t } = useTranslation();
  const { navigate, setOptions, goBack } = useNavigation<RoutineScreenNavigationProp>();
  const { setRoutine, routine } = useRoutineStore();

  useLayoutEffect(() => {
    setOptions({
      headerTitle: routine?.name,
      headerBackTitle: t('routines.title'),
      headerTintColor: theme.customColors.secondary.main,
      headerTitleStyle: {
        color: theme.customColors.text.primary,
      },

      headerLeft: () => (
        <TouchableOpacity style={styles(theme).closeButton} onPress={goBack}>
          <Ionicons name="chevron-back-outline" size={24} color={theme.customColors.secondary.main} />
          <Text style={styles(theme).closeButtonText}>{t('routines.title')}</Text>
        </TouchableOpacity>
      ),
      headerRight: () => (
        <TouchableOpacity onPress={() => navigate('DetailsRoutine')}>
          <Ionicons name="settings-outline" size={24} color={theme.customColors.secondary.main} />
        </TouchableOpacity>
      ),
    });
  }, [routine]);

  const onAddExercisePress = () => {
    navigate('AddExerciseModal', {});
    setRoutine(routine as Routine);
  };

  return (
    <>
      <View style={styles(theme).container}>
        {routine?.exercises.map((exercise) => (
          <View key={exercise._id} style={styles(theme).exerciseItem}>
            <Text style={styles(theme).exerciseName}>{exercise.exerciseId.name}</Text>
          </View>
        ))}
        <TouchableOpacity style={styles(theme).addButton} onPress={onAddExercisePress}>
          <View style={styles(theme).addButtonContent}>
            <Ionicons name="add-circle-outline" size={24} color={theme.customColors.secondary.main} />
            <Text style={styles(theme).buttonText}>{t('routines.addExercise')}</Text>
          </View>
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = (theme: CustomTheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
      backgroundColor: theme.customColors.background.default,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 16,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      color: theme.customColors.text.primary,
    },
    editButton: {
      padding: 8,
    },
    addButton: {
      position: 'absolute',
      bottom: 40,
      right: 16,
      left: 16,
      zIndex: 1000,
      flexDirection: 'row',
      alignItems: 'center',
      padding: 16,
      backgroundColor: theme.customColors.background.paper,
      borderRadius: 8,
      marginBottom: 16,
      gap: 8,
    },
    buttonText: {
      color: theme.customColors.text.primary,
      fontSize: 16,
      fontWeight: 'bold',
    },
    exerciseItem: {
      padding: 16,
      backgroundColor: theme.customColors.background.paper,
      borderRadius: 8,
      marginBottom: 8,
    },
    exerciseName: {
      fontSize: 16,
      color: theme.customColors.text.primary,
    },
    addButtonContent: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8,
    },
    closeButton: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 5,
    },
    closeButtonText: {
      color: theme.customColors.secondary.main,
      fontSize: 16,
    },
  });

export default RoutineDetail;
