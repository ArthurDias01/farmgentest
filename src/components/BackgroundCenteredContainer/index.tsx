import { View } from 'react-native';
import { ReactNode } from 'react';
import { styles } from './style';

interface Props {
  children: ReactNode
}

export const BackgroundContainerCentered = ({ children }: Props) => {

  return (
      <View style={styles.container}>
        {children}
      </View>
  )
}
