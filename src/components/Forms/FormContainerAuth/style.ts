import { Platform, StyleSheet } from 'react-native';
import { theme } from '@/styles/theme';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    maxHeight: 400,
    flexDirection: 'column',
    alignContent: 'center',
    maxWidth: Platform.OS === 'web' ? 400 : '95%',
    padding: 20,
    backgroundColor: theme.colors.secondary,
    borderRadius: 10,
  }
})
