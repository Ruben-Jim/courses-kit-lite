import type { ComponentProps } from 'react';
import { Text, TextInput, View } from 'react-native';
import { palette } from '../../constants/colors';

type InputProps = ComponentProps<typeof TextInput>;

interface TextFieldProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  error?: string;
  hint?: string;
  placeholder?: string;
  inputMode?: InputProps['inputMode'];
  autoComplete?: InputProps['autoComplete'];
  enterKeyHint?: InputProps['enterKeyHint'];
  autoCapitalize?: InputProps['autoCapitalize'];
  multiline?: boolean;
  secure?: boolean;
  onSubmitEditing?: () => void;
}

/** 16px input (iOS won't zoom on focus), label above, error below. */
export function TextField({
  label,
  value,
  onChangeText,
  error,
  hint,
  placeholder,
  inputMode,
  autoComplete,
  enterKeyHint,
  autoCapitalize,
  multiline,
  secure,
  onSubmitEditing,
}: TextFieldProps) {
  return (
    <View className="gap-1.5">
      <Text className="font-body-bold text-ink text-base">{label}</Text>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={palette.muted}
        inputMode={inputMode}
        autoComplete={autoComplete}
        enterKeyHint={enterKeyHint}
        autoCapitalize={autoCapitalize}
        multiline={multiline}
        secureTextEntry={secure}
        onSubmitEditing={onSubmitEditing}
        accessibilityLabel={label}
        aria-invalid={Boolean(error)}
        className={`font-body text-ink rounded-2xl border-2 bg-surface px-4 py-3 ${
          multiline ? 'min-h-[96px]' : 'min-h-[48px]'
        } ${error ? 'border-tomato' : 'border-border'}`}
        style={{ fontSize: 16, textAlignVertical: multiline ? 'top' : 'center' }}
      />
      {error ? (
        <Text className="font-body-bold text-tomato text-sm" accessibilityLiveRegion="polite">
          {error}
        </Text>
      ) : hint ? (
        <Text className="font-body text-muted text-sm">{hint}</Text>
      ) : null}
    </View>
  );
}
