import React, { useState, useImperativeHandle } from 'react';
import { StyleSheet, View } from 'react-native';
import { CheckBox } from 'react-native-elements';
import PropTypes from 'prop-types';

const YesNo = React.forwardRef(({ setFormValue }, ref) => {
  const [yesChecked, setYesChecked] = useState(false);
  const [noChecked, setNoChecked] = useState(false);

  useImperativeHandle(ref, () => ({
    changeToNo: _handleNo,
  }));

  const _handleYes = () => {
    setNoChecked(false);
    setYesChecked(true);
    setFormValue(true);
  };

  const _handleNo = () => {
    setYesChecked(false);
    setNoChecked(true);
    setFormValue(false);
  };

  return (
    <View style={styles.wrapper}>
      <CheckBox
        ref={ref}
        onPress={_handleYes}
        checked={yesChecked}
        containerStyle={styles.containerStyle}
      />
      <CheckBox onPress={_handleNo} checked={noChecked} containerStyle={styles.containerStyle} />
    </View>
  );
});

const styles = StyleSheet.create({
  containerStyle: {
    padding: 0,
  },
  wrapper: {
    flex: 1,
    flexGrow: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

YesNo.propTypes = {
  setFormValue: PropTypes.func.isRequired,
};

YesNo.defaultProps = {};

export default YesNo;
