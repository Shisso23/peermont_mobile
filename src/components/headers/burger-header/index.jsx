import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Icon } from '@rneui/themed';
import { useNavigation } from '@react-navigation/native';

import colors from '../../../../theme/theme.colors';

const BurgerHeader = (props) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity onPress={() => navigation.openDrawer()} {...props}>
      <Icon
        type="font-awesome-5"
        name="bars"
        size={15}
        color={colors.white}
        containerStyle={styles.iconContainerStyle}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  iconContainerStyle: {
    backgroundColor: colors.gold,
    borderRadius: 50,
    height: 30,
    justifyContent: 'center',
    marginLeft: 20,
    width: 30,
  },
});

BurgerHeader.propTypes = {};

BurgerHeader.defaultProps = {};

export default BurgerHeader;
