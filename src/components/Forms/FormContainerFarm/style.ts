import { Platform, StyleSheet } from 'react-native';
import { theme } from '@/styles/theme';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginVertical: 10,
    flexDirection: 'column',
    alignContent: 'center',
    maxWidth: Platform.OS === 'web' ? 400 : '95%',
    padding: 20,
    backgroundColor: theme.colors.secondary,
    borderRadius: 10,
  }
})
