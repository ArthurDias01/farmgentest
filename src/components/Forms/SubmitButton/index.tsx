import { theme } from "@/styles/theme"
import { TouchableOpacityProps, TouchableOpacity, Text, ActivityIndicator } from 'react-native'
import { styles } from "./style";

interface Props extends TouchableOpacityProps {
  title: string;
  isLoading?: boolean;
}

export const SubmitButton = ({ title, isLoading, ...rest }: Props) => {
  return (
    <TouchableOpacity
    {...rest}
      style={styles.buttonStyle}
    >
      {
        isLoading ?
          <ActivityIndicator color={theme.colors.white} />
          :
          <Text style={styles.text}>
            {title}
          </Text>
      }
    </TouchableOpacity>
  )
}
