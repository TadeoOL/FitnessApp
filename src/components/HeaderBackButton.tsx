import { useTranslation } from 'react-i18next';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { CustomTheme } from '../theme/theme';
import { useTheme } from '../store/useThemeStore';
import Ionicons from '@expo/vector-icons/Ionicons';
import { TouchableOpacityProps } from 'react-native-gesture-handler';

interface HeaderBackButtonProps extends TouchableOpacityProps {
  title?: string;
}

const HeaderBackButton = ({ onPress, title, ...rest }: HeaderBackButtonProps) => {
  const { t } = useTranslation();
  const theme = useTheme();
  return (
    <TouchableOpacity onPress={onPress} style={styles(theme).backButtonContainer} {...rest}>
      <Ionicons name="chevron-back-outline" size={24} style={styles(theme).backIcon} />
      <Text style={styles(theme).backButton}>{title || t('common.back')}</Text>
    </TouchableOpacity>
  );
};

export default HeaderBackButton;

const styles = (theme: CustomTheme) =>
  StyleSheet.create({
    backButton: {
      fontSize: 16,
      color: theme.customColors.secondary.main,
    },
    backIcon: {
      color: theme.customColors.secondary.main,
    },
    backButtonContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 5,
    },
  });
