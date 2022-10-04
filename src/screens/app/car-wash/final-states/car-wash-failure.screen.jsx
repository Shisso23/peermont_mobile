import React, { useEffect } from 'react';
import { Button, Divider, Text } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { View } from 'react-native';
import { useDispatch } from 'react-redux';

import { KeyboardScrollContainer, PaddedContainer } from '../../../../components/containers';
import { custom } from '../../../../../theme/theme.styles';
import { FailureComponent } from '../../../../components';
import { resetCarSuccess } from '../../../../reducers/car-wash-reducer/car-wash.actions';

const CarWashFailureScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(resetCarSuccess());
  }, []);

  return (
    <KeyboardScrollContainer>
      <View style={custom.carWashSuccessMargin}>
        <FailureComponent />
      </View>
      <PaddedContainer>
        <Text style={custom.centerTitleBlack}>Failed</Text>
        <Divider />
        <Text style={custom.centerSubtitle}>Failed to claim your car wash membership benefit</Text>
      </PaddedContainer>
      <View style={custom.carWashDoneMargin}>
        <Button
          title="Done"
          buttonStyle={custom.carWashHomeButtonBlue}
          onPress={() => navigation.navigate('App Home')}
        />
      </View>
    </KeyboardScrollContainer>
  );
};

CarWashFailureScreen.propTypes = {};

CarWashFailureScreen.defaultProps = {};

export default CarWashFailureScreen;
