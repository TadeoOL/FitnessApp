import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Routine } from '../types/routine.type';
import { CustomTheme } from '@/src/theme/theme';
import { useTheme } from '@/src/store/useThemeStore';
import { Ionicons } from '@expo/vector-icons';

interface RoutineItemProps {
  routine: Routine;
  onPress?: (routine: Routine) => void;
  isLastItem?: boolean;
}

const RoutineItem = ({ routine, onPress, isLastItem }: RoutineItemProps) => {
  const theme = useTheme();
  return (
    <TouchableOpacity onPress={() => onPress?.(routine)} style={styles(theme).container}>
      <View style={styles(theme).iconContainer}>
        <Ionicons name="reader-outline" size={24} color={theme.customColors.secondary.main} />
      </View>
      <View style={styles(theme, isLastItem).content}>
        <Text style={styles(theme).title}>{routine.name}</Text>
        {routine.description && <Text style={styles(theme).description}>{routine.description}</Text>}
      </View>
    </TouchableOpacity>
  );
};

const styles = (theme: CustomTheme, isLastItem?: boolean) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 5,
      gap: 5,
    },
    content: {
      flex: 1,
      borderBottomWidth: isLastItem ? 0 : 1,
      borderBottomColor: theme.customColors.divider,
    },
    title: {
      fontSize: 16,
      fontWeight: 'bold',
      color: theme.customColors.text.primary,
    },
    description: {
      fontSize: 14,
      color: theme.customColors.text.secondary,
    },
    iconContainer: {
      width: 40,
      height: 40,
      borderRadius: 10,
      backgroundColor: theme.customColors.background.paper,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });

export default RoutineItem;
