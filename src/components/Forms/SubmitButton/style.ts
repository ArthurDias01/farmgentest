import { theme } from "@/styles/theme"
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  buttonStyle: {
    backgroundColor: theme.colors.primary,
    borderRadius: theme.radius.medium,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
  },
  text: {
    color: theme.colors.white,
    fontFamily: theme.fonts.Inter_400Regular,
    fontSize: 16,
    fontWeight: '700',
  }
})
