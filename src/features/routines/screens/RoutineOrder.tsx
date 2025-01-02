import HeaderBackButton from '@/src/components/HeaderBackButton';
import { useTheme } from '@/src/store/useThemeStore';
import { RoutineScreenNavigationProp } from '@/src/types/navigation';
import { useNavigation } from '@react-navigation/native';
import { useLayoutEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useRoutineStore } from '../store/store.routine';
import DraggableFlatList, { RenderItemParams, ScaleDecorator } from 'react-native-draggable-flatlist';
import { CustomTheme } from '@/src/theme/theme';
import { commonStyles } from '@/src/theme/commonStyles';
import { RoutineExercise } from '../types/routine.type';

const RoutineOrder = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const { routine } = useRoutineStore();
  const { setOptions, goBack } = useNavigation<RoutineScreenNavigationProp>();
  console.log({ routine });

  useLayoutEffect(() => {
    setOptions({
      title: t('routines.changeOrder.title'),
      headerLeft: () => <HeaderBackButton onPress={() => goBack()} />,
    });
  }, []);

  const renderItem = ({ item, drag, isActive }: RenderItemParams<RoutineExercise>) => {
    return (
      <ScaleDecorator>
        <TouchableOpacity
          onPressIn={drag}
          disabled={isActive}
          style={[
            styles(theme).rowItem,
            { backgroundColor: isActive ? theme.customColors.primary.light : theme.customColors.primary.light },
          ]}
        >
          <Text style={styles(theme).text}>{item.exerciseId.name}</Text>
        </TouchableOpacity>
      </ScaleDecorator>
    );
  };

  return (
    <SafeAreaView style={commonStyles(theme).container}>
      <View style={styles(theme).content}>
        <DraggableFlatList
          style={styles(theme).list}
          data={routine?.exercises || []}
          keyExtractor={(item) => item.exerciseId.id}
          renderItem={renderItem}
          onDragEnd={({ data, from, to }) => {
            console.log({ data, from, to });
          }}
          ItemSeparatorComponent={() => <View style={{ height: 5 }} />}
          ListFooterComponent={() => <View style={{ height: 5 }} />}
        />
        <Text>RoutineOrder</Text>
      </View>
    </SafeAreaView>
  );
};

export default RoutineOrder;

const styles = (theme: CustomTheme) =>
  StyleSheet.create({
    content: {
      flex: 1,
      padding: 20,
    },
    list: {
      flex: 1,
    },
    listItem: {
      padding: 10,
      borderBottomWidth: 1,
      borderBottomColor: theme.customColors.secondary.main,
      backgroundColor: theme.customColors.primary.light,
    },
    text: {
      fontSize: 16,
      fontWeight: 'bold',
    },
    rowItem: {
      padding: 10,
      borderBottomWidth: 1,
      borderBottomColor: theme.customColors.secondary.main,
      backgroundColor: theme.customColors.primary.light,
    },
  });
