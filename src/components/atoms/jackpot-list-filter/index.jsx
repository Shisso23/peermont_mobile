import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Modal from 'react-native-modal';
import PropTypes from 'prop-types';
import { Dimensions, StyleSheet, View, TouchableOpacity } from 'react-native';
import { Divider, Text, Button } from 'react-native-elements';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import { useDispatch } from 'react-redux';

import { PaddedContainer } from '../../containers';
import colors from '../../../../theme/theme.colors';
import { custom } from '../../../../theme/theme.styles';
import {
  getJackpotsByLargestAction,
  getJackpotsBySmallestAction,
  getJackpotsByRangeAction,
} from '../../../reducers/jackpot-list-reducer/jackpot-list.actions';

const { width: screenWidth } = Dimensions.get('window');

const JackpotListFilter = ({ visible, closeModal }) => {
  const dispatch = useDispatch();
  const [display, setDisplay] = useState(visible);
  const [range, setRange] = useState([0, 5000000]);

  const _closeModal = () => {
    closeModal();
    setDisplay(false);
  };

  const jackpotsLargest = () => {
    dispatch(getJackpotsByLargestAction());
    closeModal();
    setDisplay(false);
  };

  const jackpotsSmallest = () => {
    dispatch(getJackpotsBySmallestAction());
    closeModal();
    setDisplay(false);
  };

  const submitModal = () => {
    dispatch(getJackpotsByRangeAction(range[0], range[1]));
    closeModal();
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
        style={styles.positionBottom}
      >
        <View style={custom.centeredView}>
          <View style={styles.modalView}>
            <TouchableOpacity
              onPress={_closeModal}
              style={custom.leftCloseIconContainer}
              hitSlop={custom.hitSlop}
            >
              <Icon name="times" color={colors.gold} size={22} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={submitModal}
              style={custom.closeIconContainer}
              hitSlop={custom.hitSlop}
            >
              <Icon name="check" color={colors.gold} size={22} />
            </TouchableOpacity>
            <Text style={custom.modalCenterTitle}>Filter by Value</Text>
            <Divider />
            <Divider />
            <PaddedContainer>
              <MultiSlider
                values={range}
                min={0}
                max={5000000}
                step={100000}
                enableLabel
                snapped
                onValuesChangeFinish={(value) => {
                  setRange(value);
                }}
              />
            </PaddedContainer>
            <PaddedContainer>
              <Button
                title="Largest to Smallest"
                onPress={jackpotsLargest}
                style={custom.buttonWidth}
              />
              <Divider />
              <Button
                title="Smallest to Largest"
                onPress={jackpotsSmallest}
                style={custom.buttonWidth}
              />
            </PaddedContainer>
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  modalView: {
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: 20,
    elevation: 5,
    marginTop: '150%',
    paddingBottom: '100%',
    paddingTop: 50,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    width: screenWidth,
  },
});

JackpotListFilter.propTypes = {
  visible: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
};

JackpotListFilter.defaultProps = {};

export default JackpotListFilter;
