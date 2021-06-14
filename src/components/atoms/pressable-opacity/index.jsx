import React, { useCallback } from 'react';
import { Pressable } from 'react-native';
import PropTypes from 'prop-types';

const PressableOpacity = (props) => {
  const { style, disabled, disabledOpacity, ...passThroughProps } = props;

  const getOpacity = useCallback(
    (pressed) => {
      if (disabled) {
        return disabledOpacity ?? 0.4;
      }
      return pressed ? 0.4 : 1;
    },
    [disabled, disabledOpacity],
  );
  const _style = useCallback(
    ({ pressed }) => [style, { opacity: getOpacity(pressed) }],
    [getOpacity, style],
  );

  return <Pressable style={_style} disabled={disabled} {...passThroughProps} />;
};

PressableOpacity.propTypes = {
  style: PropTypes.object,
  disabled: PropTypes.bool,
  disabledOpacity: PropTypes.number,
};

PressableOpacity.defaultProps = {
  style: {},
  disabled: false,
  disabledOpacity: null,
};

export default PressableOpacity;
