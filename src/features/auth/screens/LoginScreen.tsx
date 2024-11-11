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
import colorPalette from "theme/colorPalette";
import { commonStyles } from "theme/commonStyles";
import { useAuthStore } from "../store/useAuth";
import { useNavigation } from "@react-navigation/native";
import { AuthScreenNavigationProp } from "@/src/types/navigation";
import { useTranslation } from "react-i18next";
const { width, height } = Dimensions.get("window");

export const LoginScreen = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigation = useNavigation<AuthScreenNavigationProp>();
  const { t } = useTranslation();

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
      source={require("../../../../assets/fitness-background.jpg")}
      style={commonStyles.mainContainer}
      resizeMode="cover"
    >
      <TouchableWithoutFeedback onPress={dismissKeyboard}>
        <View style={commonStyles.container}>
          <View style={styles.icon}>
            <Image
              source={require("../.././../../assets/icon-login.png")}
              style={styles.iconImage}
              resizeMode="contain"
            />
          </View>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={commonStyles.keyboardAvoidingView}
          >
            <TouchableWithoutFeedback onPress={dismissKeyboard}>
              <View style={styles.card}>
                <Text style={styles.cardTitle}>{t("login.title")}</Text>
                <Controller
                  control={control}
                  rules={{
                    required: true,
                  }}
                  render={({ field: { onChange, value } }) => (
                    <TextInput
                      style={[styles.input, errors.email && styles.inputError]}
                      onChangeText={onChange}
                      value={value}
                      placeholder={t("login.email")}
                      keyboardType="email-address"
                    />
                  )}
                  name="email"
                />
                {errors.email && (
                  <Text style={styles.errorText}>{t("login.emailError")}</Text>
                )}

                <Controller
                  control={control}
                  rules={{
                    required: true,
                  }}
                  render={({ field: { onChange, value } }) => (
                    <TextInput
                      style={[
                        styles.input,
                        errors.password && styles.inputError,
                      ]}
                      onChangeText={onChange}
                      value={value}
                      placeholder={t("login.password")}
                      secureTextEntry
                    />
                  )}
                  name="password"
                />
                {errors.password && (
                  <Text style={styles.errorText}>
                    {t("login.passwordError")}
                  </Text>
                )}
                <TouchableOpacity
                  style={commonStyles.primaryButton}
                  onPress={handleSubmit(onSubmit)}
                >
                  <Text style={commonStyles.buttonText}>
                    {t("login.signIn")}
                  </Text>
                </TouchableOpacity>

                <View style={styles.footer}>
                  <Text style={styles.footerText}>
                    {t("login.dontHaveAccount")}
                  </Text>
                  <TouchableOpacity
                    onPress={() => navigation.navigate("Register")}
                  >
                    <Text style={styles.footerLink}>{t("login.signUp")}</Text>
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

const styles = StyleSheet.create({
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
    backgroundColor: colorPalette.background.paper,
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
    color: colorPalette.text.primary,
    fontSize: 18,
    fontWeight: "800",
    marginBottom: 16,
    textAlign: "center",
  },
  input: {
    backgroundColor: colorPalette.background.default,
    color: colorPalette.text.primary,
    borderRadius: 4,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginVertical: 8,
  },
  inputError: {
    borderColor: colorPalette.secondary.main,
    borderWidth: 1,
  },
  errorText: {
    color: colorPalette.secondary.main,
    marginTop: 4,
  },
  button: {
    backgroundColor: colorPalette.secondary.main,
    borderRadius: 4,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginVertical: 16,
  },
  buttonText: {
    color: colorPalette.text.primary,
    fontWeight: "bold",
    textAlign: "center",
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  footerText: {
    color: colorPalette.text.secondary,
  },
  footerLink: {
    color: colorPalette.secondary.main,
    fontWeight: "medium",
  },
});
