import React from 'react';
import { Text, Divider } from 'react-native-elements';
import { useRoute } from '@react-navigation/native';
import _ from 'lodash';

import { ScrollContainer, PaddedContainer } from '../../../../components/containers';
import { Contact } from '../../../../components/atoms';
import { custom } from '../../../../../theme/theme.styles';

const RegisterErrorScreen = () => {
  const route = useRoute();

  const errorMessage = _.get(route, 'params.errorMessage');

  return (
    <ScrollContainer>
      <PaddedContainer>
        <Text style={custom.centerTitle}>Registration Error</Text>
        <Text style={custom.centerSubtitle}>
          {errorMessage} Please contact our customer care for more information.
        </Text>
      </PaddedContainer>
      <Divider />
      <PaddedContainer>
        <Text h4>Need help?</Text>
      </PaddedContainer>
      <Contact />
    </ScrollContainer>
  );
};

RegisterErrorScreen.propTypes = {};

RegisterErrorScreen.defaultProps = {};

export default RegisterErrorScreen;
