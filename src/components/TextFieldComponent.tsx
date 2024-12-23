import { useState } from 'react';
import { Controller, FieldValues, Path, UseFormReturn, FieldError } from 'react-hook-form';
import { View, Text, TextInput, TextInputProps, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { commonStyles } from '../theme/commonStyles';
import { useTheme } from '../store/useThemeStore';

type TextFieldComponentProps<T extends FieldValues> = TextInputProps & {
  label: string;
  name: Path<T>;
  control: UseFormReturn<T>['control'];
  error?: FieldError;
  type?: 'text' | 'password';
};

export const TextFieldComponent = <T extends FieldValues>({
  label,
  name,
  control,
  error,
  type = 'text',
  ...rest
}: TextFieldComponentProps<T>) => {
  const theme = useTheme();
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword(!showPassword);

  return (
    <View style={styles.container}>
      {label && <Text style={commonStyles(theme).inputLabel}>{label}</Text>}
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
          <View style={[error ? styles.inputError : null]}>
            <TextInput
              style={[commonStyles(theme).input, error ? commonStyles(theme).inputError : null]}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              secureTextEntry={type === 'password' && !showPassword}
              {...rest}
            />
            {type === 'password' && (
              <TouchableOpacity onPress={handleClickShowPassword} style={styles.iconButton}>
                <Ionicons name={showPassword ? 'eye-off-outline' : 'eye-outline'} size={20} color="#888" />
              </TouchableOpacity>
            )}
            {error && <Text style={commonStyles(theme).inputErrorText}>{error.message}</Text>}
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 8,
    color: '#333',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 12,
    backgroundColor: '#fff',
  },
  iconButton: {
    marginLeft: 8,
  },
  inputError: {
    borderColor: '#FF6B6B',
  },
});
