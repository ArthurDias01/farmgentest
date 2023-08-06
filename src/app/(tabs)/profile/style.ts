import { theme } from "@/styles/theme";
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: theme.colors.white, gap: 12 },
  text: { fontSize: 16, fontWeight: '700' },
})
