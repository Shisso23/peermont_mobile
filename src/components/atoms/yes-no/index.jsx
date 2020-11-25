import React, { useState, useImperativeHandle } from 'react';
import { StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';
import { CheckBox } from 'react-native-elements';

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
    <View style={styles.wapper}>
      <CheckBox title="yes" ref={ref} onPress={_handleYes} checked={yesChecked} />
      <CheckBox title="no" onPress={_handleNo} checked={noChecked} />
    </View>
  );
});

const styles = StyleSheet.create({
  wapper: {
    flexDirection: 'row',
  },
});

YesNo.propTypes = {
  setFormValue: PropTypes.func.isRequired,
};

YesNo.defaultProps = {};

export default YesNo;
