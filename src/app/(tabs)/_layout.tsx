import { Platform } from 'react-native'
import { Tabs, router, useSegments } from "expo-router"
import { MaterialIcons } from '@expo/vector-icons'
import { useAuth } from '@/contexts/Auth';
import { useEffect } from 'react';

export default function TabRoutesLayout() {

  return (
    <Tabs screenOptions={{
      headerShown: false,
      tabBarStyle: {
        display: Platform.OS === 'web' ? 'none' : 'flex',
      },
      tabBarHideOnKeyboard: true,
    }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="home" color={color} size={size} />
          )
        }}
      />
      <Tabs.Screen
        name="profile/index"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="person" color={color} size={size} />
          )
        }}
      />
      <Tabs.Screen
        name="add-farm/index"
        options={{
          title: "add-farm",
          tabBarButton: () => null,
        }}
      />
    </Tabs>
  )
}
