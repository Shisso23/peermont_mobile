import React from 'react';
import { View } from 'react-native';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { Text, Button } from 'react-native-elements';

import { KeyboardScrollContainer, PaddedContainer } from '../../../../components/containers';
import { custom } from '../../../../../theme/theme.styles';
import { useDisableBackButtonWhileLoading } from '../../../../hooks';

const RegisterEmailCompleteScreen = () => {
  const navigation = useNavigation();
  const { isLoading, unconfirmedEmail } = useSelector((reducer) => reducer.userAuthReducer);

  useDisableBackButtonWhileLoading(isLoading);

  const _handleClose = () => {
    navigation.navigate('SignIn');
  };

  return (
    <KeyboardScrollContainer>
      <PaddedContainer>
        <Text style={custom.centerTitle}>Registration Complete</Text>
        <Text style={custom.centerSubtitle}>
          A verification email has been sent to {unconfirmedEmail}
        </Text>
        <View style={custom.bottomRegistration}>
          <Button title="Close" onPress={_handleClose} />
        </View>
      </PaddedContainer>
    </KeyboardScrollContainer>
  );
};

RegisterEmailCompleteScreen.propTypes = {};
RegisterEmailCompleteScreen.defaultProps = {};

export default RegisterEmailCompleteScreen;
