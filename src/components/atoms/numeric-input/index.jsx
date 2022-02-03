import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-elements';
import PropTypes from 'prop-types';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
  isLastFilledCell,
} from 'react-native-confirmation-code-field';
import { useFormikContext } from 'formik';

import colors from '../../../../theme/theme.colors';

const NumericInput = ({
  value,
  onChange,
  cellCount,
  handleSubmit,
  onlyMask,
  otpOption,
  ...rest
}) => {
  const ref = useBlurOnFulfill({ value, cellCount });
  const { submitForm } = useFormikContext();
  const [triggerOtpSend, setTriggerOtpSend] = useState(true);
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue: onChange,
  });

  const verifyOtp = () => {
    submitForm();
  };

  return (
    <>
      <CodeField
        ref={ref}
        {...props}
        {...rest}
        value={value}
        onChangeText={onChange}
        onBlur={handleSubmit}
        keyboardType="number-pad"
        renderCell={({ index, symbol, isFocused }) => {
          let textChild = null;
          if (isLastFilledCell({ index, value }) && triggerOtpSend && otpOption) {
            setTriggerOtpSend(false);
            verifyOtp();
          }

          if (symbol) {
            textChild = '*';
          } else if (isFocused) {
            textChild = <Cursor />;
          }

          return (
            <View key={index} style={styles.cellsContainer}>
              <View
                onLayout={getCellOnLayoutHandler(index)}
                style={[styles.cell, isFocused && styles.focusCell]}
              >
                <Text style={styles.cellText}>{textChild}</Text>
              </View>
            </View>
          );
        }}
      />
    </>
  );
};

const styles = StyleSheet.create({
  cell: {
    backgroundColor: colors.white,
    borderBottomWidth: 0.5,
    borderColor: colors.black,
    borderRadius: 0,
    height: 40,
    width: 42,
  },
  cellText: {
    color: colors.black,
    fontSize: 25,
    textAlign: 'center',
  },
  cellsContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});

NumericInput.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  cellCount: PropTypes.number.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
  onlyMask: PropTypes.bool,
  otpOption: PropTypes.bool,
};

NumericInput.defaultProps = {
  onlyMask: false,
  otpOption: false,
};

export default NumericInput;
