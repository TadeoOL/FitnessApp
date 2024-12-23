import { useTheme } from '@/src/store/useThemeStore';
import { CustomTheme } from '@/src/theme/theme';
import { RoutineScreenNavigationProp } from '@/src/types/navigation';
import { useNavigation } from '@react-navigation/native';
import { useLayoutEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ExerciseList from '../components/ExerciseList';
import { useRoutineStore } from '../store/store.routine';

const AddExercise = () => {
  const theme = useTheme();
  const { t } = useTranslation();
  const { setOptions, goBack } = useNavigation<RoutineScreenNavigationProp>();
  const { routine: routineStore } = useRoutineStore();

  useLayoutEffect(() => {
    setOptions({
      headerTitle: routineStore?.name,
      headerStyle: {
        backgroundColor: theme.customColors.background.paper,
      },
      headerTitleStyle: {
        color: theme.customColors.text.primary,
      },
      headerLeft: () => (
        <TouchableOpacity style={styles(theme).closeButton} onPress={() => goBack()}>
          <Ionicons name="chevron-back-outline" size={24} color={theme.customColors.secondary.main} />
          <Text style={styles(theme).closeButtonText}>{t('common.back')}</Text>
        </TouchableOpacity>
      ),
      headerRight: () => (
        <TouchableOpacity style={styles(theme).closeButton} onPress={() => goBack()}>
          <Text style={styles(theme).closeButtonText}>{t('common.confirm')}</Text>
        </TouchableOpacity>
      ),
    });
  }, []);

  return (
    <View style={styles(theme).container}>
      <ExerciseList />
    </View>
  );
};

export default AddExercise;

const styles = (theme: CustomTheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.customColors.background.paper,
    },
    closeButton: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    closeButtonText: {
      marginLeft: 8,
      color: theme.customColors.secondary.main,
      fontSize: 16,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      color: theme.customColors.text.primary,
      marginBottom: 16,
    },
  });
