import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import RoutineItem from './RoutineItem';
import { Ionicons } from '@expo/vector-icons';
import { CustomTheme } from '@/src/theme/theme';
import { useTheme } from '@/src/store/useThemeStore';
import { useTranslation } from 'react-i18next';
import { Routine } from '../types/routine.type';

interface RoutineListProps {
  routines: Routine[];
  onAddRoutine?: () => void;
  onRoutinePress?: (routine: Routine) => void;
  onDeleteRoutine?: (routine: Routine) => void;
}

export const RoutineList = ({ routines, onAddRoutine, onRoutinePress, onDeleteRoutine }: RoutineListProps) => {
  const theme = useTheme();
  const { t } = useTranslation();

  return (
    <View style={styles(theme).container}>
      <TouchableOpacity onPress={onAddRoutine} style={styles(theme).addRoutineButton}>
        <View style={styles(theme).iconContainer}>
          <Ionicons name="add" size={24} color={styles(theme).iconColor.color} />
        </View>
        <View style={styles(theme).addRoutineTextContainer}>
          <Text style={styles(theme).addRoutineText}>{t('routines.create')}</Text>
        </View>
      </TouchableOpacity>
      {routines.map((routine, index) => (
        <RoutineItem
          key={routine.id}
          routine={routine}
          onPress={onRoutinePress}
          onDelete={onDeleteRoutine}
          isLastItem={index === routines.length - 1}
        />
      ))}
    </View>
  );
};

const styles = (theme: CustomTheme) =>
  StyleSheet.create({
    container: {
      backgroundColor: theme.customColors.background.paper,
      borderRadius: 10,
    },
    iconColor: {
      color: theme.customColors.secondary.main,
    },
    addRoutineButton: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 5,
      gap: 5,
      borderBottomWidth: 1,
      borderBottomColor: theme.customColors.divider,
    },

    addRoutineText: {
      fontSize: 16,
      color: theme.customColors.secondary.main,
    },
    iconContainer: {
      width: 40,
      height: 40,
      borderRadius: 10,
      backgroundColor: theme.customColors.background.paper,
      justifyContent: 'center',
      alignItems: 'center',
    },
    addRoutineTextContainer: {
      flex: 1,
    },
  });
