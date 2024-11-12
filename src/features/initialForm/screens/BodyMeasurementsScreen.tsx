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
import { useAppTheme } from "@/src/hooks/useAppTheme";

export const BodyMeasurementsScreen = () => {
  const { theme } = useAppTheme();
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
    <SafeAreaView style={[commonStyles(theme).mainContainer, styles.container]}>
      <View style={commonStyles(theme).contentContainer}>
        <Text style={commonStyles(theme).title}>
          {t("initialForm.bodyMeasurements.title")}
        </Text>

        <View style={styles.inputContainer}>
          <Text style={commonStyles(theme).inputLabel}>
            {t("initialForm.bodyMeasurements.height.label")}
          </Text>
          <Controller
            control={control}
            name="height"
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
                    "initialForm.bodyMeasurements.height.placeholder"
                  )}
                  keyboardType="numeric"
                  maxLength={3}
                  placeholderTextColor={colorPalette.text.secondary}
                />
                {error && (
                  <Text style={commonStyles(theme).inputErrorText}>
                    {t("initialForm.bodyMeasurements.height.error")}
                  </Text>
                )}
              </>
            )}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={commonStyles(theme).inputLabel}>
            {t("initialForm.bodyMeasurements.weight.label")}
          </Text>
          <Controller
            control={control}
            name="weight"
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
                    "initialForm.bodyMeasurements.weight.placeholder"
                  )}
                  keyboardType="numeric"
                  maxLength={3}
                  placeholderTextColor={colorPalette.text.secondary}
                />
                {error && (
                  <Text style={commonStyles(theme).inputErrorText}>
                    {t("initialForm.bodyMeasurements.weight.error")}
                  </Text>
                )}
              </>
            )}
          />
        </View>
      </View>

      <TouchableOpacity
        style={commonStyles(theme).primaryButton}
        onPress={handleSubmit(onSubmit)}
      >
        <Text style={commonStyles(theme).buttonText}>{t("common.next")}</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  inputContainer: {
    marginBottom: 25,
  },
});
