import { theme } from '@/styles/theme';
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    width: 48,
    height: 48,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.darkGrey,
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
  image: {
    width: 48,
    height: 48,
    borderRadius: 999,
  }
});
