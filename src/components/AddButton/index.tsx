import { styles } from './style'
import { MaterialIcons } from '@expo/vector-icons'
import { Text, TouchableOpacity, TouchableOpacityProps, Platform } from 'react-native'


export const AddButton = (props: TouchableOpacityProps) => {

  return (
    <TouchableOpacity style={styles.buttonStyle} {...props}>
      {
        Platform.OS === 'web' ?
          <>
            <MaterialIcons name="add" color="white" size={16} />
            <Text style={styles.text}>Add Farm</Text>
          </>
          :
          <MaterialIcons name="add" color="white" size={16} />
      }
    </TouchableOpacity>
  )
}
