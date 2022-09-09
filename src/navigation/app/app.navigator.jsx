import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import { DrawerComponent } from '../../components/molecules';
import { BackHeader, BurgerHeader, NotificationHeader } from '../../components/headers';
import { drawerStyle, globalScreenOptions } from '../../../theme/theme.styles';

import HomeScreen from '../../screens/app/home/home.screen';
import HealthSurveyScreen from '../../screens/app/health-survey/health-survey.screen';
import MembershipCardPinScreen from '../../screens/app/membership-card/membership-card-pin/membership-card-pin.screen';
import MembershipCardDetailScreen from '../../screens/app/membership-card/membership-card-detail/membership-card-detail.screen';
import TopUpScreen from '../../screens/app/payments/top-up/top-up.screen';
import PayOutScreen from '../../screens/app/payments/pay-out/pay-out.screen';
import PaymentOtpScreen from '../../screens/app/payments/payment-otp/payment-otp.screen';
import TopUpCompleteScreen from '../../screens/app/payments/top-up/top-up-complete/top-up-complete.screen';
import PayOutCompleteScreen from '../../screens/app/payments/pay-out/pay-out-complete/pay-out-complete.screen';
import MyAccountScreen from '../../screens/app/my-account/my-account.screen';
import AddCreditCardScreen from '../../screens/app/my-account/add-account/add-credit-card/add-credit-card.screen';
import AddBankAccountScreen from '../../screens/app/my-account/add-account/add-bank-account/add-bank-account.screen';
import UploadBankAccountDocumentScreen from '../../screens/app/my-account/add-account/add-bank-account-document/upload-bank-account-document.screen';
import AddMembershipCardScreen from '../../screens/app/my-account/add-account/add-membership-card/add-membership-card.screen';
import DailyTopUpLimitScreen from '../../screens/app/my-account/daily-top-up-limit/daily-top-up-limit.screen';
import MyProfileScreen from '../../screens/app/profile/profile.screen';
import UploadProfileDocumentsScreen from '../../screens/app/profile/add-profile-document/upload-profile-document.screen';
import UpdateMobileOtpScreen from '../../screens/app/profile/update-mobile-otp/update-mobile-otp.screen';
import UpdateMobileSelectCardScreen from '../../screens/app/profile/update-mobile-otp/update-mobile-select-card.screen';
import TermsAndConditionsScreen from '../../screens/global/terms-and-conditions/terms-and-conditions.screen';
import PrivacyPolicyScreen from '../../screens/global/privacy-policy/privacy-policy.screen';
import PalaceBetScreen from '../../screens/app/palace-bet/palace-bet';
import NotificationsScreen from '../../screens/app/notification/notifications.screen';
import TransactionsScreen from '../../screens/app/transactions/transactions.screen';
import ContactUsScreen from '../../screens/app/contact-screen/contact-us.screen';
import PaymentStatusScreen from '../../screens/app/payments/top-up/top-up-complete/payment-status.screen';
import JackpotListScreen from '../../screens/app/jackpot-look-up/jackpot-list.screen';
import FilterHeader from '../../components/headers/filter-header';
import HotSlotPredictionsScreen from '../../screens/app/jackpot-look-up/hot-slot-predictions.screen';
import AvailableCarWashesScreen from '../../screens/app/car-wash/available-car-washes/available-car-washes.screen';
import CarWashHomeScreen from '../../screens/app/car-wash/home/car-wash-home.screen';
import RedeemedCarWashesScreen from '../../screens/app/car-wash/history/redeemed-car-washes.screen';
import CarWashSuccessScreen from '../../screens/app/car-wash/final-states/car-wash-success.screen';
import CarWashFailureScreen from '../../screens/app/car-wash/final-states/car-wash-failure.screen';
import ScannerSelectScreen from '../../screens/app/car-wash/scanner/scanner-select.screen';
import ScannerScreen from '../../screens/app/car-wash/scanner/scanner.screen';
import CarDetailsScreen from '../../screens/app/car-wash/car-details/car-details.screen';

const AppStack = createStackNavigator();
const Drawer = createDrawerNavigator();

const AppNavigator = () => (
  <AppStack.Navigator
    screenOptions={{ ...globalScreenOptions, headerLeft: (props) => <BackHeader {...props} /> }}
  >
    <AppStack.Screen
      name="App Home"
      component={DrawerNavigation}
      options={{ headerShown: false }}
    />
    <AppStack.Screen
      name="TermsAndConditions"
      component={TermsAndConditionsScreen}
      options={{ headerShown: true, title: '' }}
    />
    <AppStack.Screen
      name="PrivacyPolicy"
      component={PrivacyPolicyScreen}
      options={{ headerShown: true, title: '' }}
    />
    <AppStack.Screen
      name="PalaceBet"
      component={PalaceBetScreen}
      options={{ headerShown: true, title: '' }}
    />
    <AppStack.Screen
      name="Transactions"
      component={TransactionsScreen}
      options={{ headerShown: true, title: '' }}
    />
    <AppStack.Screen
      name="Notifications"
      component={NotificationsScreen}
      options={{ headerShown: true, title: '' }}
    />
    <AppStack.Screen
      name="AddCreditCard"
      component={AddCreditCardScreen}
      options={{ headerShown: true, title: '' }}
    />
    <AppStack.Screen
      name="AddBankAccount"
      component={AddBankAccountScreen}
      options={{ headerShown: true, title: '' }}
    />
    <AppStack.Screen
      name="UploadBankAccountDocument"
      component={UploadBankAccountDocumentScreen}
      options={{ headerShown: true, title: '' }}
    />
    <AppStack.Screen
      name="DailyTopUpLimit"
      component={DailyTopUpLimitScreen}
      options={{ headerShown: true, title: '' }}
    />
    <AppStack.Screen
      name="UploadProfileDocument"
      component={UploadProfileDocumentsScreen}
      options={{ headerShown: true, title: '' }}
    />
    <AppStack.Screen
      name="UpdateMobileOtp"
      component={UpdateMobileOtpScreen}
      options={{ headerShown: true, title: '' }}
    />
    <AppStack.Screen
      name="UpdateMobileSelectCard"
      component={UpdateMobileSelectCardScreen}
      options={{ headerShown: true, title: '' }}
    />
    <AppStack.Screen
      name="AddMembershipCard"
      component={AddMembershipCardScreen}
      options={{ headerShown: true, title: '' }}
    />
    <AppStack.Screen
      name="HealthSurvey"
      component={HealthSurveyScreen}
      options={{ headerShown: true, title: '' }}
    />
    <AppStack.Screen
      name="EnterMembershipCardPin"
      component={MembershipCardPinScreen}
      options={{ headerShown: true, title: '' }}
    />
    <AppStack.Screen
      name="MembershipCardDetail"
      component={MembershipCardDetailScreen}
      options={{ headerShown: true, title: '' }}
    />
    <AppStack.Screen
      name="PayOut"
      component={PayOutScreen}
      options={{ headerShown: true, title: '' }}
    />

    <AppStack.Screen
      name="PaymentOtp"
      component={PaymentOtpScreen}
      options={{ headerShown: true, title: '' }}
    />
    <AppStack.Screen
      name="TopUp"
      component={TopUpScreen}
      options={{ headerShown: true, title: '' }}
    />
    <AppStack.Screen
      name="TopUpComplete"
      component={TopUpCompleteScreen}
      options={{ headerShown: true, title: '' }}
    />
    <AppStack.Screen
      name="PayOutComplete"
      component={PayOutCompleteScreen}
      options={{ headerShown: true, title: '' }}
    />
    <AppStack.Screen
      name="ContactUs"
      component={ContactUsScreen}
      options={{ headerShown: true, title: '' }}
    />
    <AppStack.Screen
      name="PaymentStatus"
      component={PaymentStatusScreen}
      options={{ headerShown: true, title: '' }}
    />
    <AppStack.Screen
      name="JackpotList"
      component={JackpotListScreen}
      options={{ headerShown: true, title: '', headerRight: () => <FilterHeader /> }}
    />
    <AppStack.Screen
      name="HotSlotPredictions"
      component={HotSlotPredictionsScreen}
      options={{ headerShown: true, title: '' }}
    />
    <AppStack.Screen
      name="AvailableCarWashes"
      component={AvailableCarWashesScreen}
      options={{ headerShown: true, title: '' }}
    />
    <AppStack.Screen
      name="CarWashHome"
      component={CarWashHomeScreen}
      options={{ headerShown: true, title: '' }}
    />
    <AppStack.Screen
      name="RedeemedCarWashes"
      component={RedeemedCarWashesScreen}
      options={{ headerShown: true, title: '' }}
    />
    <AppStack.Screen
      name="CarWashSuccess"
      component={CarWashSuccessScreen}
      options={{ headerShown: true, title: '' }}
    />
    <AppStack.Screen
      name="CarWashFailure"
      component={CarWashFailureScreen}
      options={{ headerShown: true, title: '' }}
    />
    <AppStack.Screen
      name="ScannerSelect"
      component={ScannerSelectScreen}
      options={{ headerShown: true, title: '' }}
    />
    <AppStack.Screen
      name="Scanner"
      component={ScannerScreen}
      options={{ headerShown: true, title: '' }}
    />
    <AppStack.Screen
      name="CarDetails"
      component={CarDetailsScreen}
      options={{ headerShown: true, title: '' }}
    />
  </AppStack.Navigator>
);

function DrawerNavigation() {
  return (
    <Drawer.Navigator
      screenOptions={{
        ...globalScreenOptions,
        headerLeft: (props) => <BurgerHeader {...props} />,
      }}
      drawerStyle={drawerStyle}
      drawerContent={(props) => <DrawerComponent {...props} />}
    >
      <Drawer.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: '',
          headerShown: true,
          headerRight: () => <NotificationHeader />,
        }}
      />
      <Drawer.Screen
        name="MyAccount"
        component={MyAccountScreen}
        options={{
          title: '',
          headerShown: true,
        }}
      />
      <Drawer.Screen
        name="MyProfile"
        component={MyProfileScreen}
        options={{
          title: '',
          headerShown: true,
        }}
      />
    </Drawer.Navigator>
  );
}

export default AppNavigator;
