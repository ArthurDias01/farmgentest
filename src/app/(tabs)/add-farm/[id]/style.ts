import { StyleSheet } from "react-native";
import { theme } from "@/styles/theme";

export const styles = StyleSheet.create({
  headingTextH1: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.colors.white,
    fontFamily: 'Inter_700Bold',
    marginBottom: 16,
  },
  headingTextH2: {
    fontSize: 20,
    fontWeight: 'bold',
    color: theme.colors.white,
    fontFamily: 'Inter_400Regular',
  },
  rowView: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 16,
  },
  imageWrapper: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backLink: {
    color: theme.colors.black,
    textAlign: 'center',
    marginTop: 16,
    textDecorationLine: 'underline',
    textDecorationColor: theme.colors.black,
  }
});
