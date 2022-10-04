import React, { useEffect } from 'react';
import { Button, Divider, Text } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { View } from 'react-native';
import { useDispatch } from 'react-redux';

import { KeyboardScrollContainer, PaddedContainer } from '../../../../components/containers';
import { custom } from '../../../../../theme/theme.styles';
import SuccessComponent from '../../../../components/molecules/success';
import { resetCarSuccess } from '../../../../reducers/car-wash-reducer/car-wash.actions';

const CarWashSuccessScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(resetCarSuccess());
  }, []);

  return (
    <KeyboardScrollContainer>
      <View style={custom.carWashSuccessMargin}>
        <SuccessComponent />
      </View>
      <PaddedContainer>
        <Text style={custom.centerTitleBlack}>Congratulations</Text>
        <Divider />
        <Text style={custom.centerSubtitle}>
          You have succesfully claimed your car wash membership benefit
        </Text>
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

CarWashSuccessScreen.propTypes = {};

CarWashSuccessScreen.defaultProps = {};

export default CarWashSuccessScreen;
