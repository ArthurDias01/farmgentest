import { Avatar } from "@/components/Avatar";
import { CustomButton } from "@/components/CustomButton";
import { useAuth } from "@/contexts/Auth";
import { View, Text } from "react-native";
import { styles } from "./style";


export default function Profile() {
  const { user, signOut } = useAuth()
  return (
    <View style={styles.container}>
      <Avatar alt={user ? user.displayName ? user.displayName! : user.email! : " "} url={user?.photoURL ?? null} />
      <Text
        style={styles.text}
      >
        {user?.email}
      </Text>
      <Text
        style={styles.text}
      >
        {user?.displayName ?? 'No display name'}
      </Text>
      <Text
        style={styles.text}
      >
        {user?.uid}
      </Text>
      <CustomButton title="sign out" onPress={signOut} color={"primary"} />
    </View >
  )
}
