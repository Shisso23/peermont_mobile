import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from '../../screens/app/home/home.screen';
import MyAccountScreen from '../../screens/app/my-account/my-account.screen';

import AddCreditCardScreen from '../../screens/app/my-account/add-account/add-credit-card/add-credit-card.screen';

import { DrawerComponent } from '../../components/molecules';
import { globalScreenOptions } from '../../../theme/theme.styles';

import AddBankAccountScreen from '../../screens/app/my-account/add-account/add-bank-account/add-bank-account.screen';
import UploadBankAccountDocumentScreen from '../../screens/app/my-account/add-account/add-bank-account-document/upload-bank-account-document.screen';
import EditBankAccountScreen from '../../screens/app/my-account/edit-account/edit-bank-account/edit-bank-account.screen';

import AddMembershipCardScreen from '../../screens/app/my-account/add-account/add-membership-card/add-membership-card.screen';

import HealthSurveyScreen from '../../screens/app/health-survey/health-survey.screen';
import MembershipCardPinScreen from '../../screens/app/membership-card-pin/membership-card-pin.screen';
import MembershipCardDetailScreen from '../../screens/app/membership-card-detail/membership-card-detail.screen';
import TopUpScreen from '../../screens/app/payments/top-up/top-up.screen';
import PayOutScreen from '../../screens/app/payments/pay-out/pay-out.screen';
import PaymentOtpScreen from '../../screens/app/payments/payment-otp/payment-otp.screen';
import TopUpCompleteScreen from '../../screens/app/payments/top-up/top-up-complete/top-up-complete.screen';
import PayOutCompleteScreen from '../../screens/app/payments/pay-out/pay-out-complete/pay-out-complete.screen';
import TermsAndConditionsScreen from '../../screens/global/terms-and-conditions/terms-and-conditions.screen';
import PrivacyPolicyScreen from '../../screens/global/privacy-policy/privacy-policy.screen';
import PalaceBetScreen from '../../screens/app/palace-bet/palace-bet';
import TransactionsScreen from '../../screens/app/transactions/transactions';

const AppStack = createStackNavigator();
const Drawer = createDrawerNavigator();

const AppNavigator = () => (
  <AppStack.Navigator screenOptions={globalScreenOptions}>
    <AppStack.Screen
      name="App Home"
      component={DrawerNavigation}
      options={{ headerShown: false }}
    />
    <AppStack.Screen
      name="TermsAndConditions"
      component={TermsAndConditionsScreen}
      options={{ headerShown: true, title: 'Terms And Conditions' }}
    />
    <AppStack.Screen
      name="PrivacyPolicy"
      component={PrivacyPolicyScreen}
      options={{ headerShown: true, title: 'Privacy Policy' }}
    />
    <AppStack.Screen
      name="PalaceBet"
      component={PalaceBetScreen}
      options={{ headerShown: true, title: 'Palace Bet' }}
    />
    <AppStack.Screen
      name="Transactions"
      component={TransactionsScreen}
      options={{ headerShown: true, title: 'Transactions' }}
    />
    <AppStack.Screen
      name="AddCreditCard"
      component={AddCreditCardScreen}
      options={{ headerShown: true, title: 'Add CreditCard' }}
    />
    <AppStack.Screen
      name="AddBankAccount"
      component={AddBankAccountScreen}
      options={{ headerShown: true, title: 'Add Bank Account' }}
    />
    <AppStack.Screen
      name="UploadBankAccountDocument"
      component={UploadBankAccountDocumentScreen}
      options={{ headerShown: true, title: 'Upload Bank Account Document' }}
    />
    <AppStack.Screen
      name="EditBankAccount"
      component={EditBankAccountScreen}
      options={{ headerShown: true, title: 'Edit Bank Account' }}
    />
    <AppStack.Screen
      name="AddMembershipCard"
      component={AddMembershipCardScreen}
      options={{ headerShown: true, title: 'Add Membership card' }}
    />
    <AppStack.Screen
      name="HealthSurvey"
      component={HealthSurveyScreen}
      options={{ headerShown: true, title: 'Health Survey' }}
    />
    <AppStack.Screen
      name="EnterMembershipCardPin"
      component={MembershipCardPinScreen}
      options={{ headerShown: true, title: 'MembershipCardPin' }}
    />
    <AppStack.Screen
      name="MembershipCardDetail"
      component={MembershipCardDetailScreen}
      options={{ headerShown: true, title: 'MembershipCardDetail' }}
    />
    <AppStack.Screen
      name="PayOut"
      component={PayOutScreen}
      options={{ headerShown: true, title: 'Payout' }}
    />

    <AppStack.Screen
      name="PaymentOtp"
      component={PaymentOtpScreen}
      options={{ headerShown: true, title: 'Payment Otp' }}
    />
    <AppStack.Screen
      name="TopUp"
      component={TopUpScreen}
      options={{ headerShown: true, title: 'TopUp' }}
    />
    <AppStack.Screen
      name="TopUpComplete"
      component={TopUpCompleteScreen}
      options={{ headerShown: true, title: 'Complete TopUp' }}
    />
    <AppStack.Screen
      name="PayOutComplete"
      component={PayOutCompleteScreen}
      options={{ headerShown: true, title: 'Complete PayOut' }}
    />
  </AppStack.Navigator>
);

function DrawerNavigation() {
  return (
    <Drawer.Navigator
      screenOptions={globalScreenOptions}
      drawerContent={(props) => <DrawerComponent {...props} />}
    >
      <Drawer.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: 'Peermont',
          headerShown: true,
        }}
      />
      <Drawer.Screen
        name="MyAccount"
        component={MyAccountScreen}
        options={{
          title: 'Account',
          headerShown: true,
        }}
      />
    </Drawer.Navigator>
  );
}

export default AppNavigator;
