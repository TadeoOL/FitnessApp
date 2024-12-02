import { useTranslation } from 'react-i18next';
import { Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const RoutinesScreen = () => {
  const { t } = useTranslation();

  return (
    <SafeAreaView className="flex-1 items-center justify-center bg-secondary-main dark:bg-dark-secondary-light">
      <Text className="text-2xl font-bold text-text-primary dark:text-dark-text-primary">{t('routines.title')}</Text>
    </SafeAreaView>
  );
};

export default RoutinesScreen;
