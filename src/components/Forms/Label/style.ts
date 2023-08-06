import { theme } from "@/styles/theme"
import { StyleSheet } from 'react-native'
import { RFValue } from "react-native-responsive-fontsize";

export const styles = StyleSheet.create({
  labelText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: theme.colors.white,
    fontFamily: 'Inter_700Bold',
    marginBottom: RFValue(2),
  },
  required: {
    color: theme.colors.error,
    position: 'relative',
    top: -8,
  }
})
