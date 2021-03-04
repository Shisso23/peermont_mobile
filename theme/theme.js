import variables from './theme.variables';
import colors from './theme.colors';
import { custom } from './theme.styles';

const theme = {
  colors: {
    primary: colors.gold,
  },
  Text: {
    style: {
      fontFamily: variables.fontFamily,
      fontSize: variables.fontSize,
    },
    h1Style: {
      fontFamily: variables.fontFamilySecondary,
      fontSize: 28,
      color: colors.gold,
    },
    h2Style: {
      fontFamily: variables.fontFamilySecondary,
      fontWeight: 'normal',
      fontSize: 24,
    },
    h3Style: {
      fontFamily: variables.fontFamilySecondary,
      fontWeight: 'normal',
      fontSize: 20,
    },
    h4Style: {
      fontFamily: variables.fontFamilySecondary,
      fontWeight: 'normal',
      fontSize: 16,
    },
  },
  Button: {
    raised: true,
    color: colors.primary,
    titleStyle: {
      fontFamily: variables.fontFamilySecondary,
      fontSize: 20,
    },
    buttonStyle: {
      borderRadius: 25,
      height: 50,
    },
    containerStyle: {
      marginHorizontal: 30,
    },
  },
  Divider: {
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: 'transparent',
  },
  Input: {
    labelStyle: {
      color: colors.black,
      marginBottom: 3,
      fontFamily: variables.fontFamilySecondary,
      fontWeight: 'normal',
    },
    errorStyle: custom.errorStyle,
    inputContainerStyle: {
      backgroundColor: colors.white,
      borderColor: '#bcbdc1',
      borderBottomWidth: 0.28,
      borderRadius: 8,
      paddingLeft: 10,
      paddingRight: 5,
    },
    containerStyle: {
      paddingLeft: 0,
      paddingRight: 0,
    },
  },
  SearchBar: {
    containerStyle: {
      backgroundColor: colors.warning,
      paddingLeft: 0,
      paddingRight: 0,
      borderBottomWidth: 1,
      borderBottomColor: colors.black,
      fontFamily: variables.fontFamilySecondary,
      fontSize: 16,
    },
  },
  ListItem: {
    style: {
      backgroundColor: colors.white,
    },
    containerStyle: {
      backgroundColor: colors.white,
    },
    disabledStyle: {
      backgroundColor: colors.grey,
    },
  },
  Card: {
    style: {
      backgroundColor: colors.white,
      borderRadius: 8,
    },
    containerStyle: {
      backgroundColor: colors.white,
      borderRadius: 8,
    },
  },
};

export default theme;
