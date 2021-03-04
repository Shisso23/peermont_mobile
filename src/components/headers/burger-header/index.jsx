import React from 'react';
import { StyleSheet } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';

import colors from '../../../../theme/theme.colors';

const BurgerHeader = () => {
  const navigation = useNavigation();

  const burgerIcon = () => (
    <Icon
      type="font-awesome-5"
      name="bars"
      size={14}
      color={colors.white}
      containerStyle={styles.iconContainerStyle}
    />
  );

  return <Button type="clear" icon={burgerIcon} onPress={() => navigation.openDrawer()} />;
};

const styles = StyleSheet.create({
  iconContainerStyle: {
    backgroundColor: colors.gold,
    borderRadius: 50,
    height: 30,
    justifyContent: 'center',
    marginLeft: 10,
    width: 30,
  },
});

BurgerHeader.propTypes = {};

BurgerHeader.defaultProps = {};

export default BurgerHeader;
