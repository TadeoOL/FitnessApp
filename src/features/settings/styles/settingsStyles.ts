import { StyleSheet, Platform, ViewStyle } from "react-native";
import { CustomTheme } from "@/theme/theme";

export const settingsStyles = (theme: CustomTheme) =>
  StyleSheet.create({
    settingsSection: {
      marginTop: 32,
      marginHorizontal: 16,
    },
    settingsGroup: {
      backgroundColor: theme.customColors.background.paper,
      borderRadius: Platform.select({ ios: 10, android: 8 }),
      overflow: 'hidden',
      ...(Platform.select({
        android: {
          elevation: 2,
          marginVertical: 4,
        },
      }) as ViewStyle),
    },
    settingsItem: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingVertical: Platform.select({ ios: 11, android: 14 }),
      paddingHorizontal: 16,
      backgroundColor: theme.customColors.background.paper,
      borderBottomWidth: Platform.select({
        ios: StyleSheet.hairlineWidth,
        android: 0,
      }),
      borderBottomColor: theme.customColors.divider,
      ...(Platform.select({
        android: {
          marginHorizontal: 0,
          borderRadius: 0,
        },
      }) as ViewStyle),
    },
    settingsItemFirst: {
      ...(Platform.select({
        ios: {
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
        },
        android: {
          borderTopLeftRadius: 8,
          borderTopRightRadius: 8,
        },
      }) as ViewStyle),
    },
    settingsItemLast: {
      ...(Platform.select({
        ios: {
          borderBottomLeftRadius: 10,
          borderBottomRightRadius: 10,
          borderBottomWidth: 0,
        },
        android: {
          borderBottomLeftRadius: 8,
          borderBottomRightRadius: 8,
        },
      }) as ViewStyle),
    },
    settingsItemLeft: {
      flexDirection: "row",
      alignItems: "center",
      flex: 1,
    },
    settingsItemRight: {
      flexDirection: "row",
      alignItems: "center",
    },
    settingsItemIcon: {
      width: 24,
      marginRight: Platform.select({ ios: 12, android: 16 }),
      alignItems: 'center',
    },
    settingsItemTitle: {
      fontSize: Platform.select({ ios: 17, android: 16 }),
      color: theme.customColors.text.primary,
      ...Platform.select({
        android: {
          fontFamily: 'Roboto',
        },
      }),
    },
    settingsItemValue: {
      fontSize: Platform.select({ ios: 17, android: 16 }),
      color: theme.customColors.text.secondary,
      marginRight: 6,
      ...Platform.select({
        android: {
          fontFamily: 'Roboto',
        },
      }),
    },
    settingsItemChevron: {
      marginLeft: 2,
      opacity: Platform.select({ ios: 0.4, android: 0.6 }),
    },
    settingsHeader: {
      fontSize: Platform.select({ ios: 13, android: 14 }),
      color: theme.customColors.text.secondary,
      textTransform: 'uppercase',
      marginBottom: 8,
      marginLeft: 16,
      marginTop: 16,
      ...Platform.select({
        android: {
          fontFamily: 'Roboto-Medium',
          letterSpacing: 0.5,
        },
      }),
    },
    settingsFooter: {
      fontSize: Platform.select({ ios: 13, android: 12 }),
      color: theme.customColors.text.secondary,
      marginTop: 8,
      marginHorizontal: 16,
      marginBottom: 16,
      ...Platform.select({
        android: {
          fontFamily: 'Roboto',
        },
      }),
    },
  }); 