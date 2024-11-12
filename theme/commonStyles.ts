import { StyleSheet } from "react-native";
import { CustomTheme } from "@/theme/theme";

export const commonStyles = (theme: CustomTheme) =>
  StyleSheet.create({
    // Contenedores
    mainContainer: {
      flex: 1,
      backgroundColor: theme.customColors.background.default,
    },
    container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  contentContainer: {
    padding: 16,
  },
  scrollViewContainer: {
    flexGrow: 1,
  },

  // Cards
  card: {
    backgroundColor: theme.customColors.background.default,
    borderRadius: 8,
    padding: 16,
    marginVertical: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  cardContent: {
      fontSize: 14,
      color: theme.customColors.text.primary,
    },

  // Botones
  primaryButton: {
    backgroundColor: theme.customColors.primary.main,
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 16,
  },
  secondaryButton: {
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: theme.customColors.primary.main,
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
  },
  secondaryButtonText: {
    color: theme.customColors.primary.main,
    fontSize: 16,
    fontWeight: "600",
  },
  backButton: {
    padding: 10,
  },
  backButtonText: {
    fontSize: 16,
    fontWeight: "600",
  },

  // Inputs
  input: {
    backgroundColor: theme.customColors.background.default,
    borderWidth: 1,
    borderColor: theme.customColors.border.default,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    marginBottom: 12,
    color: theme.customColors.text.primary,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 6,
    color: theme.customColors.text.primary,
  },
  inputError: {
    borderColor: theme.customColors.error.main,
  },

  // Listas
  listItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: theme.customColors.border.default,
  },
  listItemText: {
    fontSize: 16,
    color: theme.customColors.text.primary,
  },

  // Encabezados
  header: {
    backgroundColor: theme.customColors.primary.main,
    paddingVertical: 16,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerTitle: {
    color: theme.customColors.text.primary,
    fontSize: 20,
    fontWeight: "bold",
  },
  

  // Elementos de navegación
  tabBar: {
    flexDirection: "row",
    backgroundColor: theme.customColors.background.default,
    borderTopWidth: 1,
    borderTopColor: theme.customColors.border.default,
    paddingBottom: 5, 
  },
  tabItem: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 10,
  },
  tabItemText: {
    fontSize: 12,
    marginTop: 4,
  },

  // Estilos de texto
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    color: theme.customColors.text.primary,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 12,
    color: theme.customColors.text.primary,
  },
  bodyText: {
    fontSize: 16,
    lineHeight: 24,
    color: theme.customColors.text.primary,
  },
  inputErrorText: {
    color: theme.customColors.error.main,
    fontSize: 12,
  },

  // Utilidades
  centerContent: {
    alignItems: "center",
    justifyContent: "center",
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },

  // KeyboardAvoidingView
  keyboardAvoidingView: {
    width: "100%",
    alignItems: "center",
  },
});
