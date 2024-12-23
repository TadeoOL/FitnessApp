import { View, Text, StyleSheet, FlatList, SafeAreaView, Pressable } from 'react-native';
import { useGetExercises } from '../hooks/useGetExercises';
import { Exercise } from '../types/routine.type';
import { useTheme } from '@/src/store/useThemeStore';
import { CustomTheme } from '@/src/theme/theme';
import FullScreenLoader from '@/src/components/FullScreenLoader';
import { useNavigation } from '@react-navigation/native';
import { useLayoutEffect, useMemo, useState } from 'react';
import { RoutineScreenNavigationProp } from '@/src/types/navigation';
import { useTranslation } from 'react-i18next';
import Ionicons from '@expo/vector-icons/Ionicons';
import useAddExerciseToRoutine from '../hooks/useAddExerciseToRoutine';
import useDeleteExerciseOfRoutine from '../hooks/useDeleteExerciseOfRoutine';
import { useRoutineStore } from '../store/store.routine';

const ExerciseList = () => {
  const theme = useTheme();
  const { data: exercises, isLoading } = useGetExercises();
  const { setOptions } = useNavigation<RoutineScreenNavigationProp>();
  const [search, setSearch] = useState('');
  const { t } = useTranslation();
  const { routine } = useRoutineStore();

  useLayoutEffect(() => {
    setOptions({
      headerSearchBarOptions: {
        placeholder: t('exercises.search'),
        onChangeText: ({ nativeEvent: { text } }) => {
          setSearch(text);
        },
      },
    });
  }, []);

  const sortedExercisesAlreadyAdded = useMemo(() => {
    return exercises?.sort((a, b) => {
      const aAlreadyAdded = routine?.exercises.some((e) => e.exerciseId.id === a.id);
      const bAlreadyAdded = routine?.exercises.some((e) => e.exerciseId.id === b.id);
      return aAlreadyAdded ? -1 : bAlreadyAdded ? 1 : 0;
    });
  }, [exercises, routine]);

  if (isLoading) return <FullScreenLoader />;
  return (
    <SafeAreaView style={styles(theme).safeViewContainer}>
      <View style={styles(theme).container}>
        <Text style={styles(theme).title}>{t('exercises.myExercises')}</Text>
        <FlatList
          data={sortedExercisesAlreadyAdded?.filter((exercise) =>
            exercise.name.toLowerCase().includes(search.toLowerCase())
          )}
          renderItem={({ item }) => <ExerciseItem exercise={item} />}
          keyExtractor={(item) => item.id.toString()}
          ItemSeparatorComponent={() => <View style={styles(theme).separator} />}
          ListEmptyComponent={() => <Text style={styles(theme).emptyList}>{t('exercises.noExercises')}</Text>}
        />
      </View>
    </SafeAreaView>
  );
};

const ExerciseItem = ({ exercise }: { exercise: Exercise }) => {
  const theme = useTheme();
  const { routine, addExerciseToRoutine, deleteExerciseOfRoutine } = useRoutineStore();
  const { addExerciseToRoutineMutation } = useAddExerciseToRoutine(exercise.id, routine?.id as string);
  const { deleteExerciseOfRoutineMutation } = useDeleteExerciseOfRoutine(exercise.id, routine?.id as string);
  const exerciseAlreadyAdded = (): boolean => {
    if (!routine) return false;
    return routine.exercises.some((e: any) => e.exerciseId.id === exercise.id);
  };
  const handlePressExercise = () => {
    if (exerciseAlreadyAdded()) {
      deleteExerciseOfRoutineMutation();
      deleteExerciseOfRoutine(routine?.id as string, exercise.id);
    } else {
      addExerciseToRoutineMutation();
      addExerciseToRoutine(routine?.id as string, exercise);
    }
  };

  return (
    <Pressable onPress={handlePressExercise} style={styles(theme).exerciseItem}>
      <Ionicons
        name={exerciseAlreadyAdded() ? 'checkmark-circle' : 'add-circle-outline'}
        size={24}
        color={exerciseAlreadyAdded() ? theme.customColors.secondary.main : theme.customColors.text.primary}
      />
      <Text style={styles(theme).exerciseName}>{exercise.name}</Text>
    </Pressable>
  );
};

export default ExerciseList;

const styles = (theme: CustomTheme) =>
  StyleSheet.create({
    safeViewContainer: {
      flex: 1,
    },
    container: {
      paddingVertical: 20,
      paddingHorizontal: 10,
    },
    title: {
      fontSize: 16,
      fontWeight: 'bold',
      color: theme.customColors.text.primary,
      marginBottom: 10,
    },
    exerciseName: {
      fontSize: 16,
      color: theme.customColors.text.primary,
    },
    separator: {
      height: 1,
      backgroundColor: theme.customColors.divider,
    },
    exerciseItem: {
      padding: 10,
      borderBottomWidth: 1,
      borderBottomColor: theme.customColors.divider,
      flexDirection: 'row',
      alignItems: 'center',
      gap: 10,
    },
    emptyList: {
      fontSize: 16,
      color: theme.customColors.text.primary,
      textAlign: 'center',
      padding: 10,
    },
  });
