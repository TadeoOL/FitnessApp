import {
  Dimensions,
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
import { commonStyles } from "@/src/theme/commonStyles";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome5 } from "@expo/vector-icons";
import { registerSchema, RegisterSchemaType } from "../schema/registerSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import Toast from "react-native-toast-message";
import Divider from "../components/Divider";
import { useTheme } from "@/src/store/useThemeStore";
import { CustomTheme } from "@/src/theme/theme";

const { height } = Dimensions.get("window");

export const RegisterScreen = () => {
  const theme = useTheme();
  const { control, handleSubmit } = useForm<RegisterSchemaType>({
    defaultValues: {
      userName: "",
      email: "",
      password: "",
    },
    resolver: zodResolver(registerSchema),
  });
  const navigation = useNavigation();

  const onSubmit = (data: any) => {
    console.log(data);
  };

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  const handleSocialMedia = () => {
    Toast.show({
      text1: "Por el momento no se encuentra disponible",
      type: "warning",
    });
  };

  return (
    <ImageBackground
      source={require("../../../../assets/fitness-background.jpg")}
      style={commonStyles(theme).mainContainer}
      resizeMode="cover"
    >
      <TouchableWithoutFeedback onPress={dismissKeyboard}>
        <View style={commonStyles(theme).container}>
          <View style={styles(theme).headerText}>
            <Text style={styles(theme).welcomeText}>Únete a la comunidad</Text>
            <Text style={styles(theme).subtitleText}>
              Comienza tu viaje fitness
            </Text>
          </View>

          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={commonStyles(theme).keyboardAvoidingView}
          >
            <View style={styles(theme).card}>
              <Controller
                control={control}
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <>
                    <TextInput
                      style={[
                        styles(theme).input,
                        error && styles(theme).inputError,
                      ]}
                      onChangeText={onChange}
                      value={value}
                      placeholder="Nombre de usuario"
                    />
                    {!!error && (
                      <Text style={styles(theme).errorText}>
                        {error?.message}
                      </Text>
                    )}
                  </>
                )}
                name="userName"
              />

              <Controller
                control={control}
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <>
                    <TextInput
                      style={[
                        styles(theme).input,
                        error && styles(theme).inputError,
                      ]}
                      onChangeText={onChange}
                      value={value}
                      placeholder="Email"
                      keyboardType="email-address"
                    />
                    {!!error && (
                      <Text style={styles(theme).errorText}>
                        {error?.message}
                      </Text>
                    )}
                  </>
                )}
                name="email"
              />

              <Controller
                control={control}
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <>
                    <TextInput
                      style={[
                        styles(theme).input,
                        error && styles(theme).inputError,
                      ]}
                      onChangeText={onChange}
                      value={value}
                      placeholder="Contraseña"
                      secureTextEntry
                    />
                    {!!error && (
                      <Text style={styles(theme).errorText}>
                        {error?.message}
                      </Text>
                    )}
                  </>
                )}
                name="password"
              />

              <TouchableOpacity
                style={commonStyles(theme).primaryButton}
                onPress={handleSubmit(onSubmit)}
              >
                <Text style={commonStyles(theme).buttonText}>Registrarse</Text>
              </TouchableOpacity>

              <View style={styles(theme).socialButtonsContainer}>
                <Divider text="O continúa con" textClassName="mb-2" />
                <View style={styles(theme).socialButtons}>
                  <TouchableOpacity
                    style={[
                      styles(theme).socialButtonRound,
                      styles(theme).googleButtonRound,
                    ]}
                    activeOpacity={0.8}
                    onPress={handleSocialMedia}
                  >
                    <FontAwesome5 name="google" size={24} color="#ffffff" />
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[
                      styles(theme).socialButtonRound,
                      styles(theme).facebookButtonRound,
                    ]}
                    activeOpacity={0.8}
                    onPress={handleSocialMedia}
                  >
                    <FontAwesome5 name="facebook-f" size={24} color="#ffffff" />
                  </TouchableOpacity>
                </View>
              </View>

              <View style={styles(theme).footer}>
                <Text style={styles(theme).footerText}>
                  ¿Ya tienes una cuenta?
                </Text>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                  <Text style={styles(theme).footerLink}>Iniciar sesión</Text>
                </TouchableOpacity>
              </View>
            </View>
          </KeyboardAvoidingView>
        </View>
      </TouchableWithoutFeedback>
    </ImageBackground>
  );
};

const styles = (theme: CustomTheme) =>
  StyleSheet.create({
    headerText: {
      marginTop: height * 0.1,
      alignItems: "center",
      marginBottom: 20,
    },
    welcomeText: {
      fontSize: 28,
      fontWeight: "bold",
      color: "#fff",
      textShadowColor: "rgba(0, 0, 0, 0.75)",
      textShadowOffset: { width: -1, height: 1 },
      textShadowRadius: 10,
    },
    subtitleText: {
      fontSize: 18,
      color: "#fff",
      marginTop: 8,
      textShadowColor: "rgba(0, 0, 0, 0.75)",
      textShadowOffset: { width: -1, height: 1 },
      textShadowRadius: 10,
    },
    card: {
      backgroundColor: theme.customColors.background.paper,
      padding: 24,
      borderRadius: 16,
      width: "90%",
      maxWidth: 400,
      elevation: 5,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
    },
    input: {
      backgroundColor: theme.customColors.background.default,
      color: theme.customColors.text.primary,
      borderRadius: 8,
      paddingVertical: 12,
      paddingHorizontal: 16,
      marginVertical: 8,
    },
    inputError: {
      borderColor: theme.customColors.error.main,
      borderWidth: 1,
    },
    socialButtonsContainer: {
      alignItems: "center",
      marginTop: 20,
    },
    socialText: {
      color: theme.customColors.text.secondary,
      marginBottom: 16,
      fontSize: 14,
    },
    socialButtons: {
      flexDirection: "row",
      justifyContent: "center",
      gap: 20,
    },
    socialButtonRound: {
      width: 50,
      height: 50,
      borderRadius: 25,
      justifyContent: "center",
      alignItems: "center",
      elevation: 2,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.2,
      shadowRadius: 3,
    },
    googleButtonRound: {
      backgroundColor: "#DB4437",
      borderColor: "#DB4437",
    },
    facebookButtonRound: {
      backgroundColor: "#1877f2",
      borderColor: "#1877f2",
    },
    footer: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      marginTop: 20,
      gap: 8,
    },
    footerText: {
      color: theme.customColors.text.secondary,
    },
    footerLink: {
      color: theme.customColors.primary.main,
      fontWeight: "bold",
    },
    errorText: {
      color: theme.customColors.error.main,
      fontSize: 12,
    },
  });
