import { View, Text, TouchableOpacity, TextInput, StyleSheet } from "react-native";
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
  }
});
