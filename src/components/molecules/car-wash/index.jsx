import React, { useEffect } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Icon, Text } from 'react-native-elements';
import PropTypes from 'prop-types';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import _ from 'lodash';

import { custom } from '../../../../theme/theme.styles';
import { getVoucherCountAction } from '../../../reducers/car-wash-reducer/car-wash.actions';
import { carWashSelector } from '../../../reducers/car-wash-reducer/car-wash.reducer';

const CarWash = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const { isLoading, voucherCount } = useSelector(carWashSelector);

  const onCarWashPress = () => {
    navigation.navigate('CarWashHome');
  };

  const validateCountPresence = () => (_.isEmpty(voucherCount) ? null : voucherCount.data[0].count);

  const CarWashViewContainer = ({ children }) => {
    return (
      <TouchableOpacity style={custom.headerButton} onPress={onCarWashPress}>
        {children}
      </TouchableOpacity>
    );
  };

  CarWashViewContainer.propTypes = {
    children: PropTypes.node.isRequired,
  };

  useEffect(() => {
    dispatch(getVoucherCountAction('10000000013', 'PLATINUM'));
  }, []);

  return (
    <CarWashViewContainer>
      <Icon name="car" type="font-awesome-5" size={35} />
      <View style={custom.headerContainerText}>
        <Text style={[custom.headerContainerTitle, custom.centerCarWashText]}>Car wash</Text>
        <Text style={[custom.headerContainerSubText, custom.centerCarWashText]}>
          {isLoading ? null : validateCountPresence()} Vouchers Available
        </Text>
      </View>
    </CarWashViewContainer>
  );
};

CarWash.propTypes = {};
CarWash.defaultProps = {};

export default CarWash;
