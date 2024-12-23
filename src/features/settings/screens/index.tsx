import { View, Text, ScrollView } from 'react-native';
import { SettingsItem } from '../components/SettingsItem';
import { useTheme } from '@/src/store/useThemeStore';
import { commonStyles } from '@/src/theme/commonStyles';
import { settingsStyles } from '../styles/settingsStyles';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import { SettingsStackNavigationProp } from '@/src/types/navigation';

export const SettingsScreen = () => {
  const theme = useTheme();
  const commonStyle = commonStyles(theme);
  const styles = settingsStyles(theme);
  const { t } = useTranslation();
  const { navigate } = useNavigation<SettingsStackNavigationProp>();

  const handleDisplayPress = () => {
    navigate('SettingsDisplay');
  };

  const handleAccountPress = () => {
    navigate('SettingsAccount');
  };

  return (
    <ScrollView style={[commonStyle.mainContainer, { backgroundColor: theme.customColors.background.default }]}>
      <View style={styles.settingsSection}>
        <Text style={styles.settingsHeader}>{t('settings.title')}</Text>
        <View style={styles.settingsGroup}>
          <SettingsItem
            icon="person-outline"
            title={t('settings.sections.account.title')}
            onPress={handleAccountPress}
            isFirst
            isLast
          />
        </View>
      </View>
      <View style={styles.settingsSection}>
        <Text style={styles.settingsHeader}>{t('settings.sections.display.appearance')}</Text>
        <View style={styles.settingsGroup}>
          <SettingsItem
            icon="phone-portrait-outline"
            title={t('settings.sections.display.title')}
            onPress={handleDisplayPress}
            isFirst
            isLast
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default SettingsScreen;
