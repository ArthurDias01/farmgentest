import { theme, TColors } from '@/styles/theme'
import { ReactNode } from 'react';
import { Text, TouchableOpacity, TouchableOpacityProps } from 'react-native'
import { styles } from './style';

type CustomButton = {
  title: string;
  icon?: ReactNode;
  color?: TColors;
} & TouchableOpacityProps;


export const CustomButton = ({ title, color, ...rest }: CustomButton) => {

  return (
    <TouchableOpacity
    {...rest}
    style={[{ backgroundColor: color ? theme.colors[color] : theme.colors.accent }, styles.buttonStyle, rest.style]}
    activeOpacity={0.8}
    >
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  )
}
