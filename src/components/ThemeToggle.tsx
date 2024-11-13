import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { useAppTheme } from "../hooks/useAppTheme";

export const ThemeToggle = () => {
  const { themeMode, setThemeMode } = useAppTheme();

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => setThemeMode(themeMode === "light" ? "dark" : "light")}
    >
      <Text style={styles.icon}>{themeMode === "light" ? "🌙" : "☀️"}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 8,
  },
  icon: {
    fontSize: 20,
  },
});
