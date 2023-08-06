import { IFarm } from '@/interfaces/global'
import { View, Text, Image } from 'react-native'
import { styles } from './style'

interface Props {
  farm: IFarm,
}


export const FarmCard = ({ farm }: Props) => {

  return (
    <View style={styles.mainView}>
      <View style={styles.infoWrapper}>
        <View>
          <Text style={styles.title}>
            Display Name:
          </Text>
          <Text style={styles.info}>
            {farm.displayName}
          </Text>
        </View>
        <View>
          <Text style={styles.title}>
            Open Hours
          </Text>
          <Text style={styles.info}>{farm.openHour}h to {farm.closeHour}h</Text>
        </View>
      </View>
      <Image style={styles.imageWrapper} source={{ uri: farm.farmImageUrl }} />
    </View>
  )
}
