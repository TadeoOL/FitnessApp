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

const RoutinesScreen = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const { data: routines, isLoading } = useGetRoutines();
  const navigation = useNavigation<RootStackNavigationProp>();

  const onRoutinePress = (routine: Routine) => {
    navigation.navigate('RoutineRoutes', {
      screen: 'RoutineDetails',
      params: {
        routine,
      },
    });
  };

  if (isLoading) {
    return <FullScreenLoader />;
  }

  return (
    <View style={styles(theme).container}>
      <Text style={styles(theme).title}>{t('routines.title')}</Text>
      <RoutineList routines={routines || []} onRoutinePress={onRoutinePress} />
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
