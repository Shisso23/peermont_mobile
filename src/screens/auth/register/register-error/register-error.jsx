import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-elements';
import { useRoute } from '@react-navigation/native';
import _ from 'lodash';

import { PageContainer } from '../../../../components/containers';

const RegisterErrorScreen = () => {
  const route = useRoute();

  const errorMessage = _.get(route, 'params.errorMessage');

  return (
    <PageContainer>
      <Text h4>ERROR</Text>
      <Text>{errorMessage} Please contact our customer care for more information.</Text>
      <View>
        <Text>Email: customercare@peermont.com</Text>
        <Text>Black Card Members:</Text>
        <Text>Please contact your host for assistance.</Text>
      </View>
    </PageContainer>
  );
};

RegisterErrorScreen.propTypes = {};

RegisterErrorScreen.defaultProps = {};

export default RegisterErrorScreen;
