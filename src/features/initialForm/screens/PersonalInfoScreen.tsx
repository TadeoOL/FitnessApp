import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Platform,
  Modal,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { SetupStackParamList } from "@/src/types/navigation";
import { SafeAreaView } from "react-native-safe-area-context";
import { commonStyles } from "@/src/theme/commonStyles";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  IPersonalInfo,
  personalInfoSchema,
} from "../schema/personalInfoSchema";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useState } from "react";
import { useSetupStore } from "../store/useSetupStore";
import { useTranslation } from "react-i18next";
import { CustomTheme } from "@/src/theme/theme";
import { useTheme } from "@/src/store/useThemeStore";

export const PersonalInfoScreen = () => {
  const theme = useTheme();
  const navigation =
    useNavigation<NativeStackNavigationProp<SetupStackParamList>>();
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [tempDate, setTempDate] = useState(new Date());
  const {
    fullName,
    birthDate: birthDateStore,
    setPersonalInfo,
  } = useSetupStore();
  const { t } = useTranslation();

  const { control, handleSubmit, setValue, watch } = useForm<IPersonalInfo>({
    defaultValues: {
      fullName: fullName,
      birthDate: birthDateStore,
    },
    resolver: zodResolver(personalInfoSchema),
  });

  const birthDate = watch("birthDate");

  const onSubmit: SubmitHandler<IPersonalInfo> = (data) => {
    setPersonalInfo(data.fullName, data.birthDate);
    navigation.navigate("BodyMeasurements");
  };

  const handleDateChange = (_: any, selectedDate?: Date) => {
    if (Platform.OS === "android") {
      setShowDatePicker(false);
      if (selectedDate) {
        setValue("birthDate", selectedDate, { shouldDirty: true });
      }
    } else {
      setTempDate(selectedDate || tempDate);
    }
  };

  const handleConfirmIOS = () => {
    setValue("birthDate", tempDate, { shouldDirty: true });
    setShowDatePicker(false);
  };

  return (
    <SafeAreaView
      style={[commonStyles(theme).mainContainer, styles(theme).container]}
    >
      <View style={commonStyles(theme).contentContainer}>
        <Text style={commonStyles(theme).title}>
          {t("initialForm.personalInfo.title")}
        </Text>

        <View style={styles(theme).inputContainer}>
          <Text style={commonStyles(theme).inputLabel}>
            {t("initialForm.personalInfo.fullName.label")}
          </Text>
          <Controller
            control={control}
            name="fullName"
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <>
                <TextInput
                  style={[
                    commonStyles(theme).input,
                    error && commonStyles(theme).inputError,
                  ]}
                  onChangeText={onChange}
                  value={value}
                  placeholder={t(
                    "initialForm.personalInfo.fullName.placeholder"
                  )}
                  placeholderTextColor={theme.customColors.text.secondary}
                />
                {error && (
                  <Text style={commonStyles(theme).inputErrorText}>
                    {t("initialForm.personalInfo.fullName.error")}
                  </Text>
                )}
              </>
            )}
          />
        </View>

        <View style={styles(theme).inputContainer}>
          <Text style={commonStyles(theme).inputLabel}>
            {t("initialForm.personalInfo.birthDate.label")}
          </Text>
          <Controller
            control={control}
            name="birthDate"
            render={({ fieldState: { error } }) => (
              <>
                <TouchableOpacity onPress={() => setShowDatePicker(true)}>
                  <View
                    style={[
                      commonStyles(theme).input,
                      styles(theme).dateInput,
                      error && commonStyles(theme).inputError,
                    ]}
                  >
                    <Text className="text-base text-primary-main">
                      {birthDate?.toLocaleDateString() ||
                        t("initialForm.personalInfo.birthDate.placeholder")}
                    </Text>
                  </View>
                </TouchableOpacity>
                {error && (
                  <Text style={commonStyles(theme).inputErrorText}>
                    {t("initialForm.personalInfo.birthDate.error")}
                  </Text>
                )}
              </>
            )}
          />

          <Modal visible={showDatePicker} transparent animationType="fade">
            <View style={styles(theme).modalOverlay}>
              <View style={styles(theme).modalContent}>
                <Text style={commonStyles(theme).inputLabel}>
                  {t("initialForm.personalInfo.birthDate.modalTitle")}
                </Text>

                <DateTimePicker
                  value={
                    Platform.OS === "ios" ? tempDate : birthDate || new Date()
                  }
                  mode="date"
                  display={Platform.OS === "ios" ? "spinner" : "spinner"}
                  onChange={handleDateChange}
                  maximumDate={new Date()}
                  minimumDate={new Date(1900, 0, 1)}
                  textColor={theme.customColors.text.primary}
                />

                <View style={styles(theme).modalButtons}>
                  <TouchableOpacity
                    onPress={() => setShowDatePicker(false)}
                    style={[
                      styles(theme).modalButton,
                      styles(theme).cancelButton,
                    ]}
                  >
                    <Text style={styles(theme).cancelButtonText}>
                      {t("common.cancel")}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={handleConfirmIOS}
                    style={[
                      styles(theme).modalButton,
                      styles(theme).confirmButton,
                    ]}
                  >
                    <Text style={styles(theme).confirmButtonText}>
                      {t("common.confirm")}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
        </View>
      </View>

      <TouchableOpacity
        style={[commonStyles(theme).primaryButton]}
        onPress={handleSubmit(onSubmit)}
      >
        <Text style={commonStyles(theme).buttonText}>{t("common.next")}</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = (theme: CustomTheme) =>
  StyleSheet.create({
    container: {
      paddingHorizontal: 20,
    },
    backButton: {
      paddingVertical: 10,
      marginBottom: 20,
    },
    backButtonText: {
      fontSize: 16,
      color: theme.customColors.secondary.main,
    },
    inputContainer: {
      marginBottom: 25,
    },
    buttonDisabled: {
      backgroundColor: theme.customColors.background.paper,
    },
    dateInput: {
      borderWidth: 1,
      borderColor: theme.customColors.primary.main,
      borderRadius: 5,
      padding: 10,
    },
    modalOverlay: {
      flex: 1,
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      justifyContent: "center",
      alignItems: "center",
    },
    modalContent: {
      backgroundColor: theme.customColors.background.paper,
      borderRadius: 10,
      padding: 20,
      width: "90%",
      maxWidth: 340,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    modalTitle: {
      fontSize: 18,
      fontWeight: "bold",
      color: theme.dark
        ? theme.customColors.text.primary // Blanco en modo oscuro
        : theme.customColors.text.primary, // Negro en modo claro
      textAlign: "center",
      marginBottom: 20,
    },
    modalButtons: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginTop: 20,
    },
    modalButton: {
      flex: 1,
      padding: 15,
      borderRadius: 8,
      marginHorizontal: 5,
    },
    cancelButton: {
      backgroundColor: theme.customColors.background.default,
      borderWidth: 1,
      borderColor: theme.customColors.error.main,
    },
    confirmButton: {
      backgroundColor: theme.customColors.secondary.main,
    },
    cancelButtonText: {
      color: theme.customColors.error.main,
      textAlign: "center",
      fontSize: 16,
      fontWeight: "600",
    },
    confirmButtonText: {
      color: theme.dark
        ? theme.customColors.text.primary // Blanco en modo oscuro
        : "#FFFFFF", // Blanco en modo claro (para contraste con el botón)
      textAlign: "center",
      fontSize: 16,
      fontWeight: "600",
    },
  });
