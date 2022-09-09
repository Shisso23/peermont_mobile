import React, { useEffect } from 'react';
import { View, SafeAreaView } from 'react-native';
import { Text } from 'react-native-elements';
import { useSelector, useDispatch } from 'react-redux';
import _ from 'lodash';
import { useNavigation } from '@react-navigation/native';
import { custom } from '../../../../../theme/theme.styles';

import { PaddedContainer } from '../../../../components/containers';
import { LoadingComponent } from '../../../../components';
import { carWashSelector } from '../../../../reducers/car-wash-reducer/car-wash.reducer';
import {
  getCarDetailsFormAction,
  submitCarDetailsAction,
} from '../../../../reducers/car-wash-reducer/car-wash.actions';
import { CarDetailsForm } from '../../../../components/forms';
import { carDetailsFormModel } from '../../../../models';

const CarDetailsScreen = () => {
  const dispatch = useDispatch();
  const { carDetails, isLoading, carSuccess } = useSelector(carWashSelector);
  const navigation = useNavigation();

  useEffect(() => {
    dispatch(getCarDetailsFormAction('9oxloV'));
  }, []);

  const _handleFormSubmit = (formData) => {
    dispatch(submitCarDetailsAction(formData));
  };

  useEffect(() => {
    if (!_.isEmpty(carSuccess)) {
      if (carSuccess.succeeded) {
        navigation.navigate('CarWashSuccess');
      } else {
        navigation.navigate('CarWashFailure');
      }
    }
  }, [carSuccess]);

  return isLoading ? (
    <View style={custom.loaderMargin}>
      <LoadingComponent hasBackground={false} />
    </View>
  ) : (
    <SafeAreaView>
      <PaddedContainer>
        <Text style={custom.centerTitle}>Car Details</Text>
      </PaddedContainer>
      <PaddedContainer style={custom.center}>
        <CarDetailsForm
          submitForm={_handleFormSubmit}
          initialValues={carDetailsFormModel(carDetails.data)}
        />
      </PaddedContainer>
    </SafeAreaView>
  );
};

export default CarDetailsScreen;
