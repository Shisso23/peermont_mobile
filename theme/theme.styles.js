import { CardStyleInterpolators } from '@react-navigation/stack';
import colors from './theme.colors';
import variables from './theme.variables';

export const custom = {
  errorStyle: {
    fontFamily: variables.fontFamily,
    color: colors.danger,
    fontSize: 15,
    height: 26,
    marginLeft: 10,
    paddingTop: 0,
    paddingBottom: 0,
    marginTop: 0,
    marginBottom: 0,
  },
  selectedItemStyle: {
    backgroundColor: colors.gold,
  },
  trashButtonContainer: {
    marginRight: 25,
  },
};

export const globalScreenOptions = {
  cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
  headerBackTitleVisible: false,
  headerStyle: {
    backgroundColor: colors.primary,
    shadowRadius: 0,
    shadowOffset: {
      height: 0,
    },
    shadowColor: 'transparent',
    elevation: 0,
  },
  headerTitleStyle: {
    fontFamily: variables.fontFamilySecondary,
    color: colors.white,
  },
  headerTintColor: colors.white,
  cardStyle: { backgroundColor: colors.background },
};

export const drawerStyle = {
  backgroundColor: colors.transparent,
};
