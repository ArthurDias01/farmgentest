import { useAuth } from "@/contexts/Auth"
import { View, Text, Platform } from 'react-native'
import { Avatar } from "@/components/Avatar";
import { styles } from "./style";
import { Link } from "expo-router";


export const UserHeader = () => {
  const { user } = useAuth();
  return (
    <View style={styles.container}>
      <Text>{user ? user.displayName ? user.displayName : user.email : null}</Text>
      {
        Platform.OS !== "android" && Platform.OS !== "ios" ?
          <Link href="/(tabs)/profile">
            <Avatar alt={user ? user.displayName ? user.displayName! : user.email! : " "} url={user?.photoURL ?? null} />
          </Link>
          :
          <Avatar alt={user ? user.displayName ? user.displayName! : user.email! : " "} url={user?.photoURL ?? null} />
      }
    </View>
  )
}
