import { Text, TextProps } from 'react-native'
import { styles } from "./style";

interface Props extends TextProps {
  children: string;
  required?: boolean;
}

export const Label = ({ children, required,...rest}: Props) => {

  return (
    <Text
      style={styles.labelText}
      {...rest}
    >
      {children}
      {required && <Text style={styles.required}> *</Text>}
    </Text>
  )
}
