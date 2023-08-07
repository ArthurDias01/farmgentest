import { useFonts, Inter_400Regular, Inter_500Medium, Inter_700Bold } from '@expo-google-fonts/inter';
import { Fragment, ReactNode } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context'
import { Slot } from 'expo-router'
import { AuthProvider } from '@/contexts/Auth';
import Toast from 'react-native-toast-message';


export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
      <AuthProvider>
        <SafeAreaView style={{ flex: 1 }}>
            <Slot initialRouteName='(auth)/sign-in' />
            <Toast />
        </SafeAreaView>
      </AuthProvider>
  )
}
