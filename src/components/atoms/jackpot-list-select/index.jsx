import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Modal from 'react-native-modal';
import PropTypes from 'prop-types';
import { Dimensions, StyleSheet, View, TouchableOpacity } from 'react-native';
import { Divider, Text, Button } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';

import colors from '../../../../theme/theme.colors';
import { custom } from '../../../../theme/theme.styles';

const { width: screenWidth } = Dimensions.get('window');

const JackpotListSelect = ({ visible, closeModal }) => {
  const navigation = useNavigation();
  const [display, setDisplay] = useState(visible);

  const _closeModal = () => {
    closeModal();
    setDisplay(false);
  };

  const navigateJackpotList = () => {
    navigation.navigate('JackpotList');
    setDisplay(false);
  };

  return (
    <>
      <Modal
        avoidKeyboard
        isVisible={display}
        hasBackdrop
        backdropOpacity={0.7}
        backdropColor={colors.primary}
        animationIn="pulse"
        animationOut="pulse"
      >
        <View style={custom.centeredView}>
          <View style={styles.modalView}>
            <TouchableOpacity
              onPress={_closeModal}
              style={custom.closeIconContainer}
              hitSlop={custom.hitSlop}
            >
              <Icon name="times" color={colors.gold} size={22} />
            </TouchableOpacity>
            <Text style={custom.modalCenterTitle}>Jackpot Look Up</Text>
            <Divider />
            <View style={styles.buttonWidth}>
              <Button title="Jackpot List" onPress={navigateJackpotList} />
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  buttonWidth: {
    padding: 10,
    width: screenWidth * 0.9,
  },
  modalView: {
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: 20,
    elevation: 5,
    margin: 20,
    padding: 30,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    width: screenWidth * 0.9,
  },
});

JackpotListSelect.propTypes = {
  visible: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
};

JackpotListSelect.defaultProps = {};

export default JackpotListSelect;
