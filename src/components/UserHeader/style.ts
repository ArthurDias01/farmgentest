
import { theme } from "@/styles/theme";
import { StyleSheet, Platform } from 'react-native'
import { RFValue } from "react-native-responsive-fontsize";

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingBottom: 8,
    marginTop: RFValue(16),
    backgroundColor: theme.colors.white,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    maxWidth: Platform.OS === "web" ? 400 : '90%',
    borderBottomColor: Platform.OS === "web" ? theme.colors.transparent : theme.colors.primary,
    borderBottomWidth: 1,
  },
})
