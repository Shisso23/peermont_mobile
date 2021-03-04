import React from 'react';
import { StyleSheet } from 'react-native';
import { Button, Icon } from 'react-native-elements';

import colors from '../../../../theme/theme.colors';

const BackHeader = (props) => {
  const burgerIcon = () => (
    <Icon
      type="font-awesome-5"
      name="caret-left"
      size={30}
      color={colors.white}
      containerStyle={styles.iconContainerStyle}
    />
  );

  return <Button icon={burgerIcon} type="clear" {...props} />;
};

const styles = StyleSheet.create({
  iconContainerStyle: {
    backgroundColor: colors.gold,
    borderRadius: 50,
    height: 30,
    justifyContent: 'center',
    marginLeft: 10,
    paddingRight: 4,
    width: 30,
  },
});

BackHeader.propTypes = {};

BackHeader.defaultProps = {};

export default BackHeader;
