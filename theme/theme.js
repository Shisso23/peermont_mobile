import { createTheme } from '@rneui/themed';

import variables from './theme.variables';
import colors from './theme.colors';
import { custom } from './theme.styles';

const theme = createTheme({
  colors: {
    primary: colors.gold,
    background: '#ffffff',
  },
  components: {
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
        fontSize: 24,
      },
      h3Style: {
        fontFamily: variables.fontFamilySecondary,
        fontSize: 20,
      },
      h4Style: {
        fontFamily: variables.fontFamilySecondary,
        fontSize: 16,
      },
    },
    Button: {
      raised: true,
      color: colors.gold,
      titleStyle: {
        fontFamily: variables.fontFamilySecondary,
        fontSize: 20,
      },
      buttonStyle: {
        borderRadius: 25,
        height: 50,
      },
      containerStyle: {
        marginHorizontal: 50,
        borderRadius: 25,
      },
    },
    Divider: {
      marginTop: 10,
      marginBottom: 10,
      color: 'transparent',
    },
    Input: {
      placeholderTextColor: colors.grey,
      labelStyle: {
        color: colors.black,
        marginBottom: 3,
        fontFamily: variables.fontFamilySecondary,
      },
      errorStyle: custom.errorStyle,
      inputContainerStyle: {
        backgroundColor: colors.white,
        borderColor: '#000000',
        borderBottomWidth: 0.5,
        borderRadius: 0,
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
        paddingHorizontal: 20,
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
  },
});

export default theme;
