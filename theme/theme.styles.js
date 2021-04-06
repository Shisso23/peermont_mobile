import { CardStyleInterpolators } from '@react-navigation/stack';
import colors from './theme.colors';
import variables from './theme.variables';

export const custom = {
  centerTitle: {
    color: colors.gold,
    fontFamily: variables.fontFamilySecondary,
    fontSize: 28,
    marginBottom: 10,
    marginTop: 20,
    textAlign: 'center',
  },
  centerSubtitle: {
    fontSize: 15,
    textAlign: 'center',
  },
  centerTitleSmall: {
    color: colors.gold,
    fontFamily: variables.fontFamilySecondary,
    fontSize: 22,
    marginBottom: 10,
    marginTop: 20,
    textAlign: 'center',
  },
  errorStyle: {
    fontFamily: variables.fontFamily,
    color: colors.danger,
    fontSize: 15,
    height: 26,
    marginLeft: 0,
    paddingTop: 0,
    paddingBottom: 0,
    marginTop: 0,
    marginBottom: 0,
  },
  selectedItemStyle: {
    backgroundColor: colors.transparent,
  },
  bold: {
    fontWeight: 'bold',
  },
  listItemContainerStyle: {
    backgroundColor: colors.reactBackgroundColor,
  },
  disabledTouchable: {
    backgroundColor: colors.transparent,
  },
  surveyContainer: {
    borderBottomWidth: 1,
    borderBottomColor: colors.veryLightGrey,
    paddingBottom: 20,
  },
  surveyText: {
    marginLeft: 30,
  },
  surveyTitle: {
    fontSize: 18,
    fontFamily: 'OpenSans-Bold',
    color: colors.greyBlack,
  },
  surveySubText: {
    fontSize: 13,
    fontFamily: 'OpenSans-Regular',
    color: colors.darkGrey,
  },
  surveyButton: {
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    flexDirection: 'row',
    backgroundColor: colors.veryLightGrey,
    borderRadius: 35,
    padding: 13,
    alignItems: 'center',
    justifyContent: 'space-around',
    marginHorizontal: 10,
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
    borderBottomColor: colors.gold,
    borderBottomWidth: 4,
  },
  headerTitleStyle: {
    fontFamily: variables.fontFamilySecondary,
    color: colors.white,
  },
  headerTintColor: colors.white,
  cardStyle: { backgroundColor: 'white' },
};

export const drawerStyle = {
  backgroundColor: colors.transparent,
};
