import { theme } from '@/styles/theme'
import { StyleSheet, Platform } from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize';

export const styles = StyleSheet.create({
  mainView: {
    height: RFValue(80),
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
    width: '100%',
    maxWidth: Platform.OS === "web" ? 400 : 'auto',
    marginVertical: Platform.OS === "web" ? RFValue(4) : 0,
    borderRadius: theme.radius.medium,
    backgroundColor: theme.colors.darkGrey,
    shadowColor: theme.colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    overflow: 'hidden',
  },
  imageWrapper: {
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoWrapper: {
    width: '100%',
    padding: Platform.OS !== 'web' ? RFValue(8) : 16,
    flex: 1,
    flexDirection: 'column',
    gap: RFValue(16),
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: theme.colors.white,
    fontFamily: 'Inter_700Bold',
  },
  info: {
    fontSize: 14,
    fontWeight: '500',
    color: theme.colors.white,
    alignItems: 'center',
  }
})
