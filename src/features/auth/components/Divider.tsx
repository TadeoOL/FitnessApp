import { Text, View } from "react-native";

interface DividerProps {
  text: string;
  className?: string;
  textClassName?: string;
  lineColor?: string;
  lineHeight?: number;
  spacing?: number;
}

const Divider = ({
  text,
  className = "",
  textClassName = "",
  lineColor = "#E5E7EB",
  lineHeight = 1,
  spacing = 10,
}: DividerProps) => {
  return (
    <View className={`flex flex-row items-center ${className} gap-2`}>
      <View
        style={{
          flex: 1,
          height: lineHeight,
          backgroundColor: lineColor,
        }}
      />
      <Text className={`mx-${spacing} ${textClassName} text-gray-500`}>
        {text}
      </Text>
      <View
        style={{
          flex: 1,
          height: lineHeight,
          backgroundColor: lineColor,
        }}
      />
    </View>
  );
};

export default Divider;
