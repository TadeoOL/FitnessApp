import { View, Text, Pressable, Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@/src/store/useThemeStore";
import { settingsStyles } from "../styles/settingsStyles";

type SettingsItemProps = {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  value?: string;
  onPress: () => void;
  isFirst?: boolean;
  isLast?: boolean;
  iconColor?: string;
};

export const SettingsItem = ({
  icon,
  title,
  value,
  onPress,
  isFirst,
  isLast,
  iconColor,
}: SettingsItemProps) => {
  const theme = useTheme();
  const styles = settingsStyles(theme);

  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.settingsItem,
        isFirst && styles.settingsItemFirst,
        isLast && styles.settingsItemLast,
      ]}
      android_ripple={{
        color: "rgba(0, 0, 0, 0.1)",
        borderless: false,
      }}
    >
      <View style={styles.settingsItemLeft}>
        <View style={styles.settingsItemIcon}>
          <Ionicons
            name={icon}
            size={24}
            color={iconColor || theme.customColors.secondary.main}
          />
        </View>
        <Text style={styles.settingsItemTitle}>{title}</Text>
      </View>
      {value ? (
        <View style={styles.settingsItemRight}>
          <Text style={styles.settingsItemValue}>{value}</Text>
          <Ionicons
            name={
              Platform.OS === "ios"
                ? "chevron-forward"
                : "chevron-forward-outline"
            }
            size={Platform.OS === "ios" ? 20 : 24}
            color={theme.customColors.text.secondary}
            style={styles.settingsItemChevron}
          />
        </View>
      ) : (
        <Ionicons
          name={
            Platform.OS === "ios"
              ? "chevron-forward"
              : "chevron-forward-outline"
          }
          size={Platform.OS === "ios" ? 20 : 24}
          color={theme.customColors.text.secondary}
          style={styles.settingsItemChevron}
        />
      )}
    </Pressable>
  );
};
