import variables from './theme.variables';
import colors from './theme.colors';
import { custom } from './theme.styles';

const theme = {
  colors: {
    primary: colors.primary,
  },
  Text: {
    style: {
      fontFamily: variables.fontFamily,
      fontSize: variables.fontSize,
    },
    h1style: {
      fontFamily: variables.fontFamilySecondary,
      fontSize: 30,
    },
    h2style: {
      fontFamily: variables.fontFamilySecondary,
      fontSize: 26,
    },
    h3style: {
      fontFamily: variables.fontFamilySecondary,
      fontSize: 22,
    },
    h4style: {
      fontFamily: variables.fontFamilySecondary,
      fontSize: 18,
    },
  },
  Button: {
    raised: true,
    color: colors.primary,
    titleStyle: {
      fontFamily: variables.fontFamilySecondary,
    },
    buttonStyle: {
      borderRadius: variables.borderRadius,
      height: 45,
    },
  },
  Input: {
    errorStyle: custom.errorStyle,
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
      borderBottomColor: '#000',
    },
  },
};

export default theme;
