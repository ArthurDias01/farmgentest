import { styles } from './style'
import { View, Image, Text } from 'react-native'
interface Props {
  url: string | null;
  alt: string;
}

export const Avatar = ({ url, alt }: Props) => {

  function getAltInitials(alt: string) {
    if (alt.toUpperCase().trim() === '') {
      return '?';
    }

    const words = alt.split(' ');

    if (words.length === 1) {
      return alt.toUpperCase().substring(0, 2);
    }

    return words.map((word) => word.charAt(0)).join('');
  }

  return (
    <View>
      {
        url ?
          <Image style={styles.image} source={{ uri: url }} />
          :
          <View style={styles.container}>
            <Text style={styles.text}>{getAltInitials(alt)}</Text>
          </View>
      }
    </View>
  )
}
