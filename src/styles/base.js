import { StyleSheet, Dimensions } from 'react-native'

export const dimensions = {
  fullHeight: Dimensions.get('window').height,
  fullWidth: Dimensions.get('window').width
}

export const colors  = {
    //primary: '#226B74',
    //secondary: '#254B5A',
    //tertiary: '#5DA6A7'
    primaryDark: '#1A1B4A',
    primaryLight: '#3F416EE',
    secondary: '#775D9E',
    secondaryVariant: '#3E939E',
    tertiary: '#77BBC7',
    green: '#4D992B'
  }

  export const padding = {
    sm: 10,
    md: 20,
    lg: 30,
    xl: 40
  }

  export const fonts = {
    sm: 12,
    md: 18,
    lg: 28,
    xl: 36,
    primary: 'Cochin'
  }

  export const base = StyleSheet.create({
    container: {
      flex: 1,
      marginLeft: 16,
      marginRight: 16,
      paddingTop: 32
    },
    buttonGroupContainer: {
      marginTop: 16
    },
    button: {

    },
    headerContainer: {
      marginBottom: 24
    },
    headerText: {
      fontSize: 32,
      textAlign: 'center'
    },
    contentText: {

    },
    primaryButton: {
      backgroundColor: colors.secondary
    },
    secondaryButton: {
      backgroundColor: colors.secondaryVariant
    },
    secondaryButtonHollow: {
      backgroundColor: '#FFF',
      borderWidth: 1,
      borderStyle: 'solid',
      borderColor: colors.tertiary,
      color: colors.tertiary,
      opacity: 1
    }
  })