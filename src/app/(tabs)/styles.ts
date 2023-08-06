import { theme } from "@/styles/theme";
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.white,
  },
  errorText: {
    color: theme.colors.error,
    fontSize: 16,
    fontWeight: '700',
    maxWidth: 400,
  },
  scrollView: {
    height: '90%',
    width: '100%',
    margin: 20,
    alignSelf: 'center',
    padding: 20,
    borderWidth: 1,
    maxWidth: 450,
    borderRadius: theme.radius.medium,
    borderColor: theme.colors.darkGrey,
  },
  contentContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    maxWidth: 450,
    backgroundColor: theme.colors.white,
    paddingBottom: 50
  }
})
