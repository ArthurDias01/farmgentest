import { StyleSheet } from 'react-native';
import { theme } from "@/styles/theme";


export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    maxWidth: 120,
    gap: 4,
  },
  button: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.radius.medium,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: theme.colors.black,
    fontSize: 16,
    fontWeight: '700',
  },
  dropdown: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.radius.medium,
    padding: 10,
    width: '50%',
    maxWidth: 140,
    alignItems: 'center',
  },
  row: {
    backgroundColor: theme.colors.white,
    padding: 10,
    width: '100%',
    alignItems: 'center',
  },
  rowText: {
    color: theme.colors.black,
    fontSize: 16,
    fontWeight: '700',
  },
})
