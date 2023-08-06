import { theme } from "@/styles/theme"
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  inputText: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.radius.medium,
    padding: 10,
    width: '100%',
    alignItems: 'center',
  },
  errorText: {
    color: theme.colors.error,
    fontSize: 12,
    fontWeight: 'bold',
    marginTop: 4,
  },
})
