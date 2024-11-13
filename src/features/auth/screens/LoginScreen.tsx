import {
  Dimensions,
  Image,
  ImageBackground,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import { commonStyles } from "@/theme/commonStyles";
import { useAuthStore } from "../store/useAuth";
import { useNavigation } from "@react-navigation/native";
import { AuthScreenNavigationProp } from "@/src/types/navigation";
import { useTranslation } from "react-i18next";
import { useTheme } from "@/src/store/useThemeStore";
import { CustomTheme } from "@/theme/theme";
const { width, height } = Dimensions.get("window");

const backgroundImage = require("../../../../assets/fitness-background.jpg");
const iconImage = require("../../../../assets/icon-login.png");

export const LoginScreen = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigation = useNavigation<AuthScreenNavigationProp>();
  const { t } = useTranslation();
  const theme = useTheme();
  console.log(backgroundImage);
  console.log(iconImage);
  const { setIsLoggedIn } = useAuthStore();

  const onSubmit = (data: any) => {
    console.log(data);
    setIsLoggedIn(true);
  };

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  return (
    <ImageBackground
      source={backgroundImage}
      style={commonStyles(theme).mainContainer}
      resizeMode="cover"
    >
      <TouchableWithoutFeedback onPress={dismissKeyboard}>
        <View style={commonStyles(theme).container}>
          <View style={styles(theme).icon}>
            <Image
              source={iconImage}
              style={styles(theme).iconImage}
              resizeMode="contain"
            />
          </View>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={commonStyles(theme).keyboardAvoidingView}
          >
            <TouchableWithoutFeedback onPress={dismissKeyboard}>
              <View style={styles(theme).card}>
                <Text style={styles(theme).cardTitle}>
                  {t("auth.login.title")}
                </Text>
                <Controller
                  control={control}
                  rules={{
                    required: true,
                  }}
                  render={({ field: { onChange, value } }) => (
                    <TextInput
                      style={[
                        styles(theme).input,
                        errors.email && styles(theme).inputError,
                      ]}
                      onChangeText={onChange}
                      value={value}
                      placeholder={t("auth.login.email")}
                      keyboardType="email-address"
                    />
                  )}
                  name="email"
                />
                {errors.email && (
                  <Text style={styles(theme).errorText}>
                    {t("auth.login.emailError")}
                  </Text>
                )}

                <Controller
                  control={control}
                  rules={{
                    required: true,
                  }}
                  render={({ field: { onChange, value } }) => (
                    <TextInput
                      style={[
                        styles(theme).input,
                        errors.password && styles(theme).inputError,
                      ]}
                      onChangeText={onChange}
                      value={value}
                      placeholder={t("auth.login.password")}
                      secureTextEntry
                    />
                  )}
                  name="password"
                />
                {errors.password && (
                  <Text style={styles(theme).errorText}>
                    {t("auth.login.passwordError")}
                  </Text>
                )}
                <TouchableOpacity
                  style={commonStyles(theme).primaryButton}
                  onPress={handleSubmit(onSubmit)}
                >
                  <Text style={commonStyles(theme).buttonText}>
                    {t("auth.login.signIn")}
                  </Text>
                </TouchableOpacity>

                <View style={styles(theme).footer}>
                  <Text style={styles(theme).footerText}>
                    {t("auth.login.dontHaveAccount")}
                  </Text>
                  <TouchableOpacity
                    onPress={() => navigation.navigate("Register")}
                  >
                    <Text style={styles(theme).footerLink}>
                      {t("auth.login.signUp")}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </KeyboardAvoidingView>
        </View>
      </TouchableWithoutFeedback>
    </ImageBackground>
  );
};

const styles = (theme: CustomTheme) =>
  StyleSheet.create({
    mainContainer: {
      flex: 1,
      backgroundColor: theme.customColors.background.default,
    },
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    },
    icon: {
      width: width,
      height: height * 0.3,
      justifyContent: "center",
      alignItems: "center",
      position: "absolute",
      top: height * 0.1,
    },
    iconImage: {
      width: "100%",
      height: "100%",
      maxWidth: 300,
      maxHeight: 300,
    },
    card: {
      backgroundColor: theme.customColors.background.paper,
      paddingVertical: 24,
      paddingHorizontal: 20,
      borderRadius: 8,
      elevation: 4,
      width: "90%",
      maxWidth: 400,
      marginTop: height * 0.1,
      display: "flex",
    },
    cardTitle: {
      color: theme.customColors.text.primary,
      fontSize: 18,
      fontWeight: "800",
      marginBottom: 16,
      textAlign: "center",
    },
    input: {
      backgroundColor: theme.customColors.background.paper,
      color: theme.customColors.text.primary,
      borderRadius: 4,
      paddingVertical: 12,
      paddingHorizontal: 16,
      marginVertical: 8,
    },
    inputError: {
      borderColor: theme.customColors.error.main,
      borderWidth: 1,
    },
    errorText: {
      color: theme.customColors.error.main,
      marginTop: 4,
    },
    button: {
      backgroundColor: theme.customColors.secondary.main,
      borderRadius: 4,
      paddingVertical: 12,
      paddingHorizontal: 16,
      marginVertical: 16,
    },
    buttonText: {
      color: theme.colors.text,
      fontWeight: "bold",
      textAlign: "center",
    },
    footer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    footerText: {
      color: theme.customColors.text.secondary,
    },
    footerLink: {
      color: theme.customColors.secondary.main,
      fontWeight: "500",
    },
  });
