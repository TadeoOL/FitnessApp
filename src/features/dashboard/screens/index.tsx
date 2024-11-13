import { useTheme } from "@/src/store/useThemeStore";
import { Text, View } from "react-native";

const DashboardScreen = () => {
  const theme = useTheme();
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme.customColors.background.default,
      }}
    >
      <Text>Dashboard</Text>
    </View>
  );
};

export default DashboardScreen;
