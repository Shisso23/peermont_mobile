import React from 'react';
import { StyleSheet, TouchableOpacity, View, ViewPropTypes } from 'react-native';
import { Text } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';

const RegisterLink = ({ containerStyle }) => {
  const navigation = useNavigation();
  return (
    <View style={containerStyle}>
      <TouchableOpacity
        style={styles.alignCenter}
        delayPressIn={0}
        onPress={() => navigation.push('Register')}
      >
        <Text>Register</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  alignCenter: {
    alignSelf: 'center',
    justifyContent: 'center',
  },
});

RegisterLink.propTypes = {
  containerStyle: ViewPropTypes.style,
};

RegisterLink.defaultProps = {
  containerStyle: {},
};

export default RegisterLink;
