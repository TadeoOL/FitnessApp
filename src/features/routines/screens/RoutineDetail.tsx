import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@/src/store/useThemeStore';
import { Routine } from '../types/routine.type';
import { Ionicons } from '@expo/vector-icons';
import { CustomTheme } from '@/src/theme/theme';

interface RoutineDetailProps {
  route: { params: { routine: Routine } };
}

const RoutineDetail = ({ route }: RoutineDetailProps) => {
  const { routine } = route.params;
  const theme = useTheme();
  const { t } = useTranslation();

  return (
    <View style={styles(theme).container}>
      <TouchableOpacity style={styles(theme).addButton}>
        <Ionicons name="add-circle-outline" size={24} color={theme.customColors.text.primary} />
        <Text style={styles(theme).buttonText}>{t('routines.addExercise')}</Text>
      </TouchableOpacity>

      {routine.exercises.map((exercise) => (
        <View key={exercise._id} style={styles(theme).exerciseItem}>
          <Text style={styles(theme).exerciseName}>{exercise.exerciseId.name}</Text>
        </View>
      ))}
    </View>
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
  });

export default RoutineDetail;
