import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';

const BarsComponent = () => {
  const navigation = useNavigation();
  const openDrawer = React.useCallback(() => {
    navigation.openDrawer();
  });
  return <Icon.Button name="bars" size={20} padding={10} onPress={openDrawer} />;
};

BarsComponent.displayName = 'BarsComponent';
export default BarsComponent;
