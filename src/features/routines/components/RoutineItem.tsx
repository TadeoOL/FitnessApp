import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Swipeable from 'react-native-gesture-handler/ReanimatedSwipeable';
import { useTheme } from '@/src/store/useThemeStore';
import { CustomTheme } from '@/src/theme/theme';

interface RoutineItemProps {
  routine: { name: string; description?: string };
  onPress?: (routine: any) => void;
  onDelete?: (routine: any) => void;
  isLastItem?: boolean;
}

const RoutineItem = ({ routine, onPress, onDelete, isLastItem }: RoutineItemProps) => {
  const theme = useTheme();

  const renderRightActions = () => {
    return (
      <TouchableOpacity style={styles(theme).deleteAction} onPress={() => onDelete?.(routine)}>
        <Ionicons name="trash-outline" size={24} color={theme.customColors.error.main} />
      </TouchableOpacity>
    );
  };

  return (
    <Swipeable renderRightActions={renderRightActions} overshootRight={true} friction={1}>
      <TouchableOpacity onPress={() => onPress?.(routine)} style={styles(theme).container} activeOpacity={1}>
        <View style={styles(theme).iconContainer}>
          <Ionicons name="reader-outline" size={24} color={theme.customColors.secondary.main} />
        </View>
        <View style={styles(theme, isLastItem).content}>
          <Text style={styles(theme).title}>{routine.name}</Text>
          {routine.description && <Text style={styles(theme).description}>{routine.description}</Text>}
        </View>
      </TouchableOpacity>
    </Swipeable>
  );
};

const styles = (theme: CustomTheme, isLastItem?: boolean) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 5,
      gap: 5,
      backgroundColor: theme.customColors.background.default,
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
    rightActionContainer: {
      justifyContent: 'center',
      alignItems: 'flex-end',
      backgroundColor: '#FF6B6B',
      marginVertical: 5,
    },
    deleteAction: {
      justifyContent: 'center',
      alignItems: 'center',
      width: 80,
      height: '100%',
    },
    actionText: {
      color: '#fff',
      fontSize: 12,
      marginTop: 4,
    },
  });

export default RoutineItem;
