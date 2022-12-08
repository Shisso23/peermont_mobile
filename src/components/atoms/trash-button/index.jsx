import React from 'react';
import { StyleSheet, ActivityIndicator, Pressable } from 'react-native';
import { ViewPropTypes } from 'deprecated-react-native-prop-types';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/FontAwesome5';
import colors from '../../../../theme/theme.colors';

const TrashButton = ({ onPress, loading, containerStyle }) => {
  return !loading ? (
    <Pressable onPress={onPress} style={containerStyle}>
      <Icon
        name="trash"
        backgroundColor="transparent"
        color={colors.grey}
        size={20}
        loading={loading}
      />
    </Pressable>
  ) : (
    <ActivityIndicator size="small" style={styles.loaderStyle} color={colors.danger} />
  );
};

const styles = StyleSheet.create({
  loaderStyle: {
    marginRight: 0,
    marginTop: 2,
  },
});

TrashButton.propTypes = {
  onPress: PropTypes.func.isRequired,
  containerStyle: ViewPropTypes.style,
  loading: PropTypes.bool.isRequired,
};

TrashButton.defaultProps = {
  containerStyle: {},
};

export default TrashButton;
