import { theme } from '@/styles/theme'
import { Platform, StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  buttonStyle: {
    backgroundColor: theme.colors.primary,
    borderRadius: 999,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    width: Platform.OS === 'web' ? 120 : 48,
    position: 'absolute',
    bottom: 16,
    right: 16,
    flexDirection: 'row',
  },
  text: {
    color: theme.colors.white,
    fontSize: 16,
    fontWeight: '400',
  }
})
