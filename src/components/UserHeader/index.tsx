import { useAuth } from "@/contexts/Auth"
import { View, Text } from 'react-native'
import { Avatar } from "@/components/Avatar";
import { styles } from "./style";


export const UserHeader = () => {
  const { user } = useAuth();
  return (
    <View style={styles.container}>
      <Text>{user ? user.displayName ? user.displayName : user.email : null}</Text>
      <Avatar alt={user ? user.displayName ? user.displayName! : user.email! : " "} url={user?.photoURL ?? null} />
    </View>
  )
}
