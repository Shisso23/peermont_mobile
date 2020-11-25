import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from '../../screens/app/home/home.screen';
import MyAccountScreen from '../../screens/app/my-account/my-account.screen';

import AddCreditCardScreen from '../../screens/app/my-account/add-account/add-credit-card/add-credit-card.screen';

import { DrawerComponent } from '../../components/molecules';
import { globalScreenOptions } from '../../../theme/theme.styles';
import AddBankAccountScreen from '../../screens/app/my-account/add-account/add-bank-account/add-bank-account.screen';
import AddMembershipCardScreen from '../../screens/app/my-account/add-account/add-membership-card/add-membership-card.screen';

import HealthSurveyScreen from '../../screens/app/health-survey/health-survey.screen';

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
      name="AddMembershipCard"
      component={AddMembershipCardScreen}
      options={{ headerShown: true, title: 'Add Membership card' }}
    />
    <AppStack.Screen
      name="HealthSurvey"
      component={HealthSurveyScreen}
      options={{ headerShown: true, title: 'Health Survey' }}
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
