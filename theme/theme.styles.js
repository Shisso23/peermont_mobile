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
    marginTop: 10,
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
  errorStyleCardPin: {
    color: colors.danger,
    fontFamily: variables.fontFamily,
    fontSize: 16,
    height: 45,
    marginBottom: 0,
    marginLeft: 0,
    marginTop: 0,
    paddingBottom: 0,
    paddingTop: 0,
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
  headerContainerText: {
    marginLeft: 24,
  },
  headerContainerTitle: {
    fontSize: 18,
    fontFamily: 'OpenSans-Bold',
    color: colors.primary,
  },
  headerContainerSubText: {
    fontSize: 12,
    fontFamily: 'OpenSans-Regular',
    color: colors.darkGrey,
  },
  headerContainerSubTextHealth: {
    alignSelf: 'center',
    color: colors.darkGrey,
    fontFamily: 'OpenSans-Regular',
    fontSize: 12,
  },
  headerButton: {
    alignItems: 'center',
    backgroundColor: colors.white,
    borderBottomColor: colors.primary,
    borderColor: colors.primary,
    borderRadius: 15,
    borderWidth: 1,
    elevation: 5,
    flexDirection: 'row',
    height: 90,
    justifyContent: 'space-evenly',
    marginHorizontal: 3,
    padding: 13,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    width: 180,
  },
  resendOtpStyle: {
    color: colors.textGrey,
    textAlign: 'center',
  },
  nameContainer: {
    borderBottomWidth: 0.28,
    borderColor: colors.inputBorderColor,
    paddingBottom: 15,
  },
  headerContainer: {
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  palaceBetIcon: {
    height: 32,
    marginLeft: 5,
    marginRight: -10,
    width: 34,
  },
  healthIcon: {
    marginLeft: 5,
    marginRight: -15,
    width: 34,
  },
  statusIcon: {
    marginLeft: 10,
    marginRight: -10,
  },
  paymentProviderIcon: {
    height: 25,
    width: 90,
  },
  avatarStyleCreditCard: {
    marginLeft: 20,
  },
  textStyleCreditCard: {
    fontSize: 16,
    paddingLeft: 20,
  },
  bottomRegistration: {
    bottom: -400,
  },
  hitSlop: {
    top: 10,
    bottom: 10,
    left: 10,
    right: 10,
  },
  modalCenterSubtitle: {
    fontSize: 16,
    marginBottom: 10,
    textAlign: 'center',
  },
  modalCenterTitle: {
    color: colors.gold,
    fontFamily: variables.fontFamilySecondary,
    fontSize: 20,
    marginBottom: 5,
    marginTop: -10,
    textAlign: 'center',
  },
  centeredView: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    marginTop: 22,
  },
  closeIconContainer: {
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: 30,
    height: 30,
    justifyContent: 'center',
    margin: 20,
    marginHorizontal: 10,
    position: 'absolute',
    right: 0,
    top: -10,
    width: 30,
    zIndex: 1,
  },
  modalButton: {
    alignItems: 'center',
    backgroundColor: colors.white,
    borderColor: colors.gold,
    borderRadius: 10,
    borderWidth: 1.5,
    height: 50,
    justifyContent: 'center',
    width: 280,
  },
  modalButtonText: {
    fontFamily: variables.fontFamilyPrimary,
    fontSize: 20,
  },
  rowAlign: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  settingsContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  settingsText: {
    marginHorizontal: 10,
  },
  errorStyleProfileForm: {
    fontSize: 12,
  },
  addPadding: {
    fontSize: 14,
    paddingLeft: 10,
  },
  carouselCardNumber: {
    alignSelf: 'center',
    backgroundColor: colors.white,
    bottom: 15,
    color: colors.darkGrey,
    fontFamily: 'OpenSans-Bold',
    fontSize: 20,
  },
  carouselImage: {
    height: 200,
    width: 250,
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
