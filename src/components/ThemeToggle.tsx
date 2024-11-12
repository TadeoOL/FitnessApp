import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { useAppTheme } from "../hooks/useAppTheme";

export const ThemeToggle = () => {
  const { isDarkMode, toggleTheme } = useAppTheme();

  return (
    <TouchableOpacity style={styles.container} onPress={toggleTheme}>
      <Text style={styles.icon}>{isDarkMode ? "🌙" : "☀️"}</Text>
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
