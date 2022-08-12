import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Icon, Text } from 'react-native-elements';
import PropTypes from 'prop-types';
import { useNavigation } from '@react-navigation/native';

import { custom } from '../../../../theme/theme.styles';

const CarWash = () => {
  const voucherCount = 1;
  const navigation = useNavigation();

  const onCarWashPress = () => {
    navigation.navigate('Notifications');
  };

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

  return (
    <CarWashViewContainer>
      <Icon name="car" type="font-awesome-5" size={35} />
      <View style={custom.headerContainerText}>
        <Text style={[custom.headerContainerTitle, custom.centerCarWashText]}>Car wash</Text>
        <Text style={[custom.headerContainerSubText, custom.centerCarWashText]}>
          ${voucherCount} Vouchers Available
        </Text>
      </View>
    </CarWashViewContainer>
  );
};

CarWash.propTypes = {};
CarWash.defaultProps = {};

export default CarWash;
