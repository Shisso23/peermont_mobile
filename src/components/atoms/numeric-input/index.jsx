import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-elements';
import PropTypes from 'prop-types';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
  isLastFilledCell,
  MaskSymbol,
} from 'react-native-confirmation-code-field';

import colors from '../../../../theme/theme.colors';

const NumericInput = ({ value, onChange, cellCount, handleSubmit, ...rest }) => {
  const ref = useBlurOnFulfill({ value, cellCount });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue: onChange,
  });

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

          if (symbol) {
            textChild = (
              <MaskSymbol maskSymbol="*" isLastFilledCell={isLastFilledCell({ index, value })}>
                {symbol}
              </MaskSymbol>
            );
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
};

export default NumericInput;
