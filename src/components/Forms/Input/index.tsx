import { theme } from "@/styles/theme"
import { TextInputProps, TextInput, View, Text } from 'react-native'
import { Label } from "../Label";
import { styles } from "./style";

interface Props extends TextInputProps {
  label: string;
  error?: string;
  required?: boolean;
}

export const Input = ({ label, error, required = false, ...rest }: Props) => {

  return (
    <View>
      <Label required={required}>{label}</Label>
      <TextInput
        {...rest}
        placeholderTextColor={theme.colors.grey}
        style={[styles.inputText, rest.style]}
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  )
}
