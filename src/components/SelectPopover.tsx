import { Text, StyleSheet, TouchableOpacity, Modal, Pressable, Dimensions } from 'react-native';
import { BlurView } from 'expo-blur';
import { useTheme } from '@/src/store/useThemeStore';
import { Ionicons } from '@expo/vector-icons';

type Option = {
  label: string;
  value: string;
};

type SelectPopoverProps = {
  isVisible: boolean;
  onClose: () => void;
  options: readonly Option[] | Option[];
  selectedValue: string;
  onSelect: (value: string) => void;
  anchorLayout?: { x: number; y: number; width: number; height: number };
  selectable?: boolean;
};

export const SelectPopover = ({
  isVisible,
  onClose,
  options,
  selectedValue,
  onSelect,
  anchorLayout,
  selectable = true,
}: SelectPopoverProps) => {
  const theme = useTheme();
  const windowWidth = Dimensions.get('window').width;
  const POPOVER_WIDTH = Math.min(300, windowWidth - 32);

  const getPopoverPosition = () => {
    if (!anchorLayout) return { top: 0, left: 0 };

    let left = anchorLayout.x + anchorLayout.width / 2 - POPOVER_WIDTH / 2;
    left = Math.max(16, Math.min(left, windowWidth - POPOVER_WIDTH - 16));
    const top = anchorLayout.y + anchorLayout.height + 8;

    return { top, left };
  };

  const position = getPopoverPosition();

  return (
    <Modal visible={isVisible} transparent animationType="fade" onRequestClose={onClose}>
      <Pressable style={styles.overlay} onPress={onClose}>
        <BlurView
          style={[
            styles.popover,
            {
              top: position.top,
              left: position.left,
              width: POPOVER_WIDTH,
            },
          ]}
          intensity={30}
          tint={theme.dark ? 'dark' : 'light'}
        >
          {options.map((option, index) => (
            <TouchableOpacity
              key={option.value}
              style={[
                styles.option,
                index === 0 && styles.firstOption,
                index === options.length - 1 && styles.lastOption,
                {
                  backgroundColor: theme.customColors.background.paper,
                },
              ]}
              onPress={() => {
                onSelect(option.value);
                onClose();
              }}
            >
              <Text
                style={[
                  styles.optionText,
                  { color: theme.customColors.text.primary },
                  selectable && selectedValue === option.value && styles.selectedText,
                ]}
              >
                {option.label}
              </Text>
              {selectable && selectedValue === option.value && (
                <Ionicons name="checkmark" size={22} color={theme.customColors.secondary.main} />
              )}
            </TouchableOpacity>
          ))}
        </BlurView>
      </Pressable>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  popover: {
    position: 'absolute',
    borderRadius: 14,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'rgba(60, 60, 67, 0.36)',
  },
  firstOption: {
    borderTopLeftRadius: 14,
    borderTopRightRadius: 14,
  },
  lastOption: {
    borderBottomLeftRadius: 14,
    borderBottomRightRadius: 14,
    borderBottomWidth: 0,
  },
  optionText: {
    fontSize: 17,
    fontWeight: '400',
    letterSpacing: -0.4,
  },
  selectedText: {
    fontWeight: '600',
  },
});
