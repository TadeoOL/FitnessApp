import { BaseToast, ErrorToast } from "react-native-toast-message";
import { StyleSheet, Dimensions, Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";
const { width } = Dimensions.get("window");

export const toastConfig = {
  success: (props: any) => (
    <BaseToast
      {...props}
      style={[styles.toast, styles.successToast]}
      contentContainerStyle={styles.contentContainer}
      text1Style={styles.title}
      text2Style={styles.message}
      text2NumberOfLines={0}
      renderLeadingIcon={() => (
        <Ionicons name="checkmark-circle" size={24} color="#FFFFFF" />
      )}
    />
  ),
  error: (props: any) => (
    <ErrorToast
      {...props}
      style={[styles.toast, styles.errorToast]}
      contentContainerStyle={styles.contentContainer}
      text1Style={styles.title}
      text2Style={styles.message}
      text2NumberOfLines={0}
      renderLeadingIcon={() => (
        <Ionicons name="close-circle" size={24} color="#FFFFFF" />
      )}
    />
  ),
  info: (props: any) => (
    <BaseToast
      {...props}
      style={[styles.toast, styles.infoToast]}
      contentContainerStyle={styles.contentContainer}
      text1Style={styles.title}
      text2Style={styles.message}
      text2NumberOfLines={0}
      renderLeadingIcon={() => (
        <Ionicons name="information-circle" size={24} color="#FFFFFF" />
      )}
    />
  ),
  warning: (props: any) => (
    <BaseToast
      {...props}
      style={[styles.toast, styles.warningToast]}
      contentContainerStyle={styles.contentContainer}
      text1Style={styles.title}
      text2Style={styles.message}
      text2NumberOfLines={0}
      renderLeadingIcon={() => (
        <Ionicons name="warning" size={24} color="#FFFFFF" />
      )}
    />
  ),
};

const styles = StyleSheet.create({
  toast: {
    position: "absolute",
    bottom: Platform.OS === "ios" ? 40 : 20,
    left: 16,
    right: 16,
    width: width - 32,
    maxWidth: width - 32,
    minHeight: 60,
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    elevation: Platform.OS === "android" ? 5 : undefined,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 9999,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
  successToast: {
    backgroundColor: "#4CAF50",
  },
  errorToast: {
    backgroundColor: "#F44336",
  },
  infoToast: {
    backgroundColor: "#2196F3",
  },
  warningToast: {
    backgroundColor: "#FFC107",
  },
  title: {
    fontSize: 12,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  message: {
    fontSize: 10,
    color: "#FFFFFF",
    opacity: 0.9,
    flexWrap: "wrap",
  },
});
