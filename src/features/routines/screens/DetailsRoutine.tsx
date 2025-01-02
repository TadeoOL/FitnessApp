import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { useRoutineStore } from '../store/store.routine';
import { useNavigation } from '@react-navigation/native';
import { RoutineScreenNavigationProp } from '@/src/types/navigation';
import { useLayoutEffect } from 'react';
import { useTheme } from '@/src/store/useThemeStore';
import { useTranslation } from 'react-i18next';
import { TouchableOpacity } from 'react-native';
import { CustomTheme } from '@/src/theme/theme';
import { SubmitHandler, useForm } from 'react-hook-form';
import { routineSchema, RoutineType } from '../schema/schema.routine';
import { TextFieldComponent } from '@/src/components/TextFieldComponent';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEditRoutineDetails } from '../hooks/useEditRoutineDetails';
import { ToastComponent } from '@/src/components/toast/ToastComponent';
import Toast from 'react-native-toast-message';
import { Routine } from '../types/routine.type';
import HeaderBackButton from '@/src/components/HeaderBackButton';

export const DetailsRoutine = () => {
  const { routine, updateRoutine: updateRoutineStore } = useRoutineStore();
  const { setOptions, goBack } = useNavigation<RoutineScreenNavigationProp>();
  const theme = useTheme();
  const { t } = useTranslation();

  console.log({ routine });

  const { control, handleSubmit } = useForm<RoutineType>({
    values: {
      name: routine?.name || '',
      description: routine?.description || '',
    },
    resolver: zodResolver(routineSchema(t)),
  });

  const { mutateAsync: updateRoutine, isPending } = useEditRoutineDetails(routine?.id || '');

  const submitHandler: SubmitHandler<RoutineType> = async (data) => {
    await updateRoutine(data, {
      onSuccess: (routine: Routine) => {
        updateRoutineStore(routine);
        goBack();
      },
      onError: (error) => {
        Toast.show({
          type: 'error',
          text1: error.message,
        });
      },
    });
  };

  const onDonePress = handleSubmit(submitHandler);

  useLayoutEffect(() => {
    setOptions({
      headerTitle: routine?.name,
      headerRight: () => (
        <TouchableOpacity onPress={onDonePress} disabled={isPending}>
          <Text style={styles(theme).doneButtonText}>{t('common.done')}</Text>
        </TouchableOpacity>
      ),
      headerLeft: () => <HeaderBackButton onPress={goBack} title={t('common.cancel')} disabled={isPending} />,
      headerTitleStyle: {
        color: theme.customColors.text.primary,
      },
    });
  }, []);

  return (
    <SafeAreaView style={styles(theme).container}>
      <View style={styles(theme).content}>
        <TextFieldComponent control={control} name="name" label={t('routines.labels.name')} type="text" />
        <TextFieldComponent
          control={control}
          name="description"
          label={t('routines.labels.description')}
          placeholder={t('routines.labels.description')}
          type="text"
          multiline
          numberOfLines={5}
        />
      </View>
      <ToastComponent />
    </SafeAreaView>
  );
};

const styles = (theme: CustomTheme) =>
  StyleSheet.create({
    doneButtonText: {
      color: theme.customColors.secondary.main,
      fontSize: 18,
    },
    cancelButtonText: {
      color: theme.customColors.secondary.main,
      fontSize: 18,
    },
    container: {
      flex: 1,
      backgroundColor: theme.customColors.background.default,
    },
    content: {
      flex: 1,
      padding: 20,
    },
  });
