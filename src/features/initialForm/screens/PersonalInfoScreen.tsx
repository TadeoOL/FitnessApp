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
import colorPalette from "@/theme/colorPalette";
import { commonStyles } from "@/theme/commonStyles";
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

export const PersonalInfoScreen = () => {
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
    <SafeAreaView style={[commonStyles.mainContainer, styles.container]}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.backButtonText}>← {t("common.back")}</Text>
      </TouchableOpacity>

      <View style={commonStyles.contentContainer}>
        <Text style={commonStyles.title}>{t("personalInfo.title")}</Text>

        <View style={styles.inputContainer}>
          <Text style={commonStyles.inputLabel}>
            {t("personalInfo.fullName.label")}
          </Text>
          <Controller
            control={control}
            name="fullName"
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <>
                <TextInput
                  style={[commonStyles.input, error && commonStyles.inputError]}
                  onChangeText={onChange}
                  value={value}
                  placeholder={t("personalInfo.fullName.placeholder")}
                  placeholderTextColor={colorPalette.text.secondary}
                />
                {error && (
                  <Text style={commonStyles.inputErrorText}>
                    {t("personalInfo.fullName.error")}
                  </Text>
                )}
              </>
            )}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={commonStyles.inputLabel}>
            {t("personalInfo.birthDate.label")}
          </Text>
          <Controller
            control={control}
            name="birthDate"
            render={({ fieldState: { error } }) => (
              <>
                <TouchableOpacity onPress={() => setShowDatePicker(true)}>
                  <View
                    style={[
                      commonStyles.input,
                      styles.dateInput,
                      error && commonStyles.inputError,
                    ]}
                  >
                    <Text className="text-base text-primary-main">
                      {birthDate?.toLocaleDateString() ||
                        t("personalInfo.birthDate.placeholder")}
                    </Text>
                  </View>
                </TouchableOpacity>
                {error && (
                  <Text style={commonStyles.inputErrorText}>
                    {t("personalInfo.birthDate.error")}
                  </Text>
                )}
              </>
            )}
          />

          <Modal visible={showDatePicker} transparent animationType="fade">
            <View style={styles.modalOverlay}>
              <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>
                  {t("personalInfo.birthDate.modalTitle")}
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
                />

                <View style={styles.modalButtons}>
                  <TouchableOpacity
                    onPress={() => setShowDatePicker(false)}
                    style={[styles.modalButton, styles.cancelButton]}
                  >
                    <Text style={styles.cancelButtonText}>
                      {t("common.cancel")}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={handleConfirmIOS}
                    style={[styles.modalButton, styles.confirmButton]}
                  >
                    <Text style={styles.confirmButtonText}>
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
        style={[commonStyles.primaryButton]}
        onPress={handleSubmit(onSubmit)}
      >
        <Text style={commonStyles.buttonText}>{t("common.next")}</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  backButton: {
    paddingVertical: 10,
    marginBottom: 20,
  },
  backButtonText: {
    fontSize: 16,
    color: colorPalette.secondary.main,
  },
  inputContainer: {
    marginBottom: 25,
  },
  buttonDisabled: {
    backgroundColor: colorPalette.background.paper,
  },
  dateInput: {
    borderWidth: 1,
    borderColor: colorPalette.primary.main,
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
    backgroundColor: colorPalette.background.paper,
    borderRadius: 10,
    padding: 20,
    width: "90%",
    maxWidth: 340,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: colorPalette.text.primary,
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
    backgroundColor: colorPalette.background.default,
    borderWidth: 1,
    borderColor: colorPalette.error.main,
  },
  confirmButton: {
    backgroundColor: colorPalette.secondary.main,
  },
  cancelButtonText: {
    color: colorPalette.error.main,
    textAlign: "center",
    fontSize: 16,
    fontWeight: "600",
  },
  confirmButtonText: {
    color: colorPalette.text.primary,
    textAlign: "center",
    fontSize: 16,
    fontWeight: "600",
  },
});
