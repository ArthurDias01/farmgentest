import { View, Text, FlatList, ActivityIndicator, Platform, ScrollView } from "react-native";
import { useAuth } from "@/contexts/Auth";
import { router } from "expo-router";
import { AddButton } from "@/components/AddButton";
import { IFarm } from "@/interfaces/global";
import { useEffect, useState } from "react";
import { db } from "@/services/firebase";
import { collection, onSnapshot, orderBy, query, where } from "firebase/firestore";
import { CustomButton } from "@/components/CustomButton";
import { FarmCard } from "@/components/FarmCard";
import { UserHeader } from "@/components/UserHeader";
import { styles } from "./styles";
import { theme } from "@/styles/theme";


export default function Home() {
  const { user } = useAuth()
  const [farms, setFarms] = useState<IFarm[]>([] as IFarm[])
  const [loading, setLoading] = useState(true);
  const [errorLoadingFarms, setErrorLoadingFarms] = useState<string | null>(null);

  useEffect(() => {
    setErrorLoadingFarms(null);
    const subscribe = () => {
      if (user === null) {
        setErrorLoadingFarms("User not found");
        setLoading(false)
        return
      };

      const Collection = collection(db, "farms");
      const q = query(Collection, orderBy('name', 'desc'), where("owner", "==", `${user.uid}`));
      onSnapshot(q, QuerySnapshot => {
        const data = QuerySnapshot.docs.map(doc => {
          return {
            ...doc.data() as Omit<IFarm, 'id'>,
            id: doc.id,
          } as IFarm;
        });
        setFarms(data);
        setLoading(false);
      },
        onError => {
          setErrorLoadingFarms(onError.message);
          setLoading(false);
        }
      );
    };
    return subscribe();
  }, [user])

  return (
    <View style={styles.container}>
      <UserHeader />
      {
        loading && <ActivityIndicator size={36} color={theme.colors.primary} />
      }
      {errorLoadingFarms === null && !loading && Platform.OS !== 'web' &&
        <FlatList
          data={farms}
          renderItem={({ item }) => <FarmCard farm={item} key={item.id} />}
          ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
          style={{ width: '100%', padding: 12, maxWidth: 400 }}
          ListFooterComponent={() => <View style={{ height: 24 }} />}
        />
      }
      {errorLoadingFarms === null && !loading && Platform.OS === 'web' && (
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.contentContainer}
        >
          {farms.map(farm => <FarmCard farm={farm} key={farm.id} />)}
        </ScrollView>
      )}
      {errorLoadingFarms !== null && !loading && user === null &&
        <View>
          <Text style={styles.errorText}>{errorLoadingFarms}</Text>
          <CustomButton title="Sign In" onPress={() => router.push("/(auth)/sign-in")} />
        </View>
      }
      {user && <AddButton onPress={() => router.push("/(tabs)/add-farm")} />}
    </View >
  )
}
