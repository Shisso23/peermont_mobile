import React from 'react';
import { StyleSheet, ActivityIndicator, ViewPropTypes } from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { TouchableOpacity } from 'react-native-gesture-handler';
import colors from '../../../../theme/theme.colors';

const TrashButton = ({ onPress, loading, containerStyle }) => {
  return !loading ? (
    <TouchableOpacity onPress={onPress} containerStyle={containerStyle}>
      <Icon
        name="trash"
        backgroundColor="transparent"
        color={colors.danger}
        size={20}
        onPress={onPress}
        loading={loading}
      />
    </TouchableOpacity>
  ) : (
    <ActivityIndicator size="small" style={styles.loaderStyle} color={colors.danger} />
  );
};

const styles = StyleSheet.create({
  loaderStyle: {
    marginRight: 15,
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
