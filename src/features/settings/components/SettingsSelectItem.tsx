import { useRef, useState } from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
  LayoutRectangle,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@/src/store/useThemeStore";
import { SelectPopover } from "@/src/components/SelectPopover";
export type SelectOption = {
  label: string;
  value: string;
};

type SettingsSelectItemProps = {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  value: string;
  options: readonly SelectOption[] | SelectOption[];
  onSelect: (value: string) => void;
  isFirst?: boolean;
  isLast?: boolean;
};

export const SettingsSelectItem = ({
  icon,
  title,
  value,
  options,
  onSelect,
  isFirst,
  isLast,
}: SettingsSelectItemProps) => {
  const [isPopoverVisible, setIsPopoverVisible] = useState(false);
  const [anchorLayout, setAnchorLayout] = useState<LayoutRectangle>();
  const itemRef = useRef<TouchableOpacity>(null);
  const theme = useTheme();
  const handlePress = () => {
    itemRef.current?.measure((__, _, width, height, pageX, pageY) => {
      setAnchorLayout({ x: pageX, y: pageY, width, height });
      setIsPopoverVisible(true);
    });
  };

  return (
    <>
      <TouchableOpacity
        ref={itemRef}
        style={[
          styles.container,
          { backgroundColor: theme.customColors.background.paper },
          isFirst && styles.firstItem,
          isLast && styles.lastItem,
        ]}
        onPress={handlePress}
      >
        <View style={styles.content}>
          <Ionicons
            name={icon}
            size={22}
            color={theme.customColors.text.secondary}
            style={styles.icon}
          />
          <Text
            style={[styles.title, { color: theme.customColors.text.primary }]}
          >
            {title}
          </Text>
        </View>
        <View style={styles.valueContainer}>
          <Text
            style={[styles.value, { color: theme.customColors.text.secondary }]}
          >
            {options.find((option) => option.value === value)?.label}
          </Text>
          <Ionicons
            name="chevron-forward"
            size={20}
            color={theme.customColors.text.secondary}
            style={styles.chevron}
          />
        </View>
      </TouchableOpacity>

      <SelectPopover
        isVisible={isPopoverVisible}
        onClose={() => setIsPopoverVisible(false)}
        options={options}
        selectedValue={value}
        onSelect={onSelect}
        anchorLayout={anchorLayout}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 11,
    paddingHorizontal: 16,
    borderBottomWidth: 0.5,
    borderBottomColor: "rgba(60, 60, 67, 0.29)",
  },
  firstItem: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  lastItem: {
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderBottomWidth: 0,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    marginRight: 12,
    width: 24,
  },
  title: {
    fontSize: 17,
    fontWeight: "400",
  },
  valueContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  value: {
    fontSize: 17,
    marginRight: 6,
  },
  chevron: {
    marginLeft: 2,
    opacity: 0.4,
  },
});
