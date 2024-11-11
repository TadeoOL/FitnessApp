import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
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
  IBodyMeasurements,
  bodyMeasurementsSchema,
} from "../schema/bodyMeasurementsSchema";
import { useSetupStore } from "../store/useSetupStore";
import { useTranslation } from "react-i18next";

export const BodyMeasurementsScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<SetupStackParamList>>();
  const { t } = useTranslation();

  const { height, weight, setBodyMeasurements } = useSetupStore();

  const { control, handleSubmit } = useForm<IBodyMeasurements>({
    defaultValues: {
      height: height,
      weight: weight,
    },
    resolver: zodResolver(bodyMeasurementsSchema),
  });

  const onSubmit: SubmitHandler<IBodyMeasurements> = (data) => {
    setBodyMeasurements(data.height, data.weight);
    navigation.navigate("ActivityLevel");
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
        <Text style={commonStyles.title}>{t("bodyMeasurements.title")}</Text>

        <View style={styles.inputContainer}>
          <Text style={commonStyles.inputLabel}>
            {t("bodyMeasurements.height.label")}
          </Text>
          <Controller
            control={control}
            name="height"
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <>
                <TextInput
                  style={[commonStyles.input, error && commonStyles.inputError]}
                  onChangeText={onChange}
                  value={value}
                  placeholder={t("bodyMeasurements.height.placeholder")}
                  keyboardType="numeric"
                  maxLength={3}
                  placeholderTextColor={colorPalette.text.secondary}
                />
                {error && (
                  <Text style={commonStyles.inputErrorText}>
                    {t("bodyMeasurements.height.error")}
                  </Text>
                )}
              </>
            )}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={commonStyles.inputLabel}>
            {t("bodyMeasurements.weight.label")}
          </Text>
          <Controller
            control={control}
            name="weight"
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <>
                <TextInput
                  style={[commonStyles.input, error && commonStyles.inputError]}
                  onChangeText={onChange}
                  value={value}
                  placeholder={t("bodyMeasurements.weight.placeholder")}
                  keyboardType="numeric"
                  maxLength={3}
                  placeholderTextColor={colorPalette.text.secondary}
                />
                {error && (
                  <Text style={commonStyles.inputErrorText}>
                    {t("bodyMeasurements.weight.error")}
                  </Text>
                )}
              </>
            )}
          />
        </View>
      </View>

      <TouchableOpacity
        style={commonStyles.primaryButton}
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
});
