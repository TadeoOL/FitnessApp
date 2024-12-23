import { useTheme } from '@/src/store/useThemeStore';
import { commonStyles } from '@/src/theme/commonStyles';
import { RoutineScreenNavigationProp } from '@/src/types/navigation';
import { useNavigation } from '@react-navigation/native';
import { useLayoutEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { CustomTheme } from '@/src/theme/theme';
import { SubmitHandler, useForm } from 'react-hook-form';
import { routineSchema, RoutineType } from '../schema/schema.routine';
import { zodResolver } from '@hookform/resolvers/zod';
import { TextFieldComponent } from '@/src/components/TextFieldComponent';
import { useAddRoutine } from '../hooks/useAddRoutine';
import Toast from 'react-native-toast-message';
import { ToastComponent } from '@/src/components/toast/ToastComponent';
import { useRoutineStore } from '../store/store.routine';

const AddRoutine = () => {
  const theme = useTheme();
  const { setOptions, goBack } = useNavigation<RoutineScreenNavigationProp>();
  const { t } = useTranslation();
  const { mutateAsync, isPending } = useAddRoutine();
  const { addRoutine } = useRoutineStore();

  const { control, handleSubmit } = useForm<RoutineType>({
    defaultValues: {
      name: '',
      description: '',
    },
    resolver: zodResolver(routineSchema(t)),
  });

  const onSubmit: SubmitHandler<RoutineType> = async (data) => {
    Keyboard.dismiss();
    await mutateAsync(data, {
      onSuccess: (res) => {
        addRoutine(res);
        goBack();
      },
      onError: () => {
        Toast.show({
          type: 'error',
          text1: t('routines.error'),
        });
      },
    });
  };

  useLayoutEffect(() => {
    setOptions({
      headerTitle: t('routines.create'),
      headerStyle: {
        backgroundColor: theme.customColors.background.paper,
      },
      headerTitleStyle: {
        color: theme.customColors.text.primary,
      },
      headerLeft: () => (
        <TouchableOpacity style={styles(theme).closeButton} onPress={() => goBack()}>
          <Ionicons name="chevron-back-outline" size={24} color={theme.customColors.secondary.main} />
          <Text style={styles(theme).closeButtonText}>{t('routines.title')}</Text>
        </TouchableOpacity>
      ),
    });
  }, []);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={commonStyles(theme).mainContainer}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView style={commonStyles(theme).mainContainer}>
          <View style={styles(theme).formContainer}>
            <Text style={styles(theme).title}>{t('routines.addRoutine')}</Text>
            <TextFieldComponent label={t('routines.labels.name')} name="name" control={control} />
            <TextFieldComponent label={t('routines.labels.description')} name="description" control={control} />
            <View style={styles(theme).buttonContainer}>
              <TouchableOpacity style={styles(theme).button} onPress={handleSubmit(onSubmit)} disabled={isPending}>
                <Text style={styles(theme).buttonText}>{t('routines.add')}</Text>
              </TouchableOpacity>
            </View>
          </View>
          <ToastComponent />
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default AddRoutine;

const styles = (theme: CustomTheme) =>
  StyleSheet.create({
    closeButton: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    closeButtonText: {
      color: theme.customColors.secondary.main,
      fontSize: 16,
    },
    title: {
      color: theme.customColors.text.primary,
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
    },
    formContainer: {
      flex: 1,
      padding: 20,
    },
    button: {
      backgroundColor: theme.customColors.secondary.main,
      padding: 10,
      borderRadius: 5,
    },
    buttonText: {
      color: theme.customColors.text.primary,
      fontSize: 16,
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
    },
  });
