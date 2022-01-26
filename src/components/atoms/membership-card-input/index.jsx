import _ from 'lodash';
import React, { useRef, useState } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Modal from 'react-native-modal';
import PropTypes from 'prop-types';
import { Dimensions, StyleSheet, View, TouchableOpacity } from 'react-native';
import { Divider, Text } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

import ModalLoader from '../modal-loader';
import colors from '../../../../theme/theme.colors';
import { custom } from '../../../../theme/theme.styles';
import { NumericalInputForm } from '../../forms';
import {
  getMembershipCardBalanceAction,
  rememberCardPin,
  queryPatronEnquiryAction,
} from '../../../reducers/membership-card-reducer/membership-card.actions';
import { membershipCardSelector } from '../../../reducers/membership-card-reducer/membership-card.reducer';
import { membershipCardPinModel } from '../../../models';

const { width: screenWidth } = Dimensions.get('window');

const MembershipCardInput = ({
  visible,
  closeModal,
  cardPin,
  unconfirmedMobileNumber,
  succesfulInput,
}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { currentMembershipCard, isLoading } = useSelector(membershipCardSelector);
  const formRef = useRef(null);
  const initialValues = membershipCardPinModel({ card_pin: cardPin });
  const [successLoader, setSuccessLoader] = useState(false);

  const _handleFormSubmission = (formData) => {
    if (!_.isEmpty(unconfirmedMobileNumber)) {
      return dispatch(
        queryPatronEnquiryAction({
          cardNumber: currentMembershipCard.cardNumber,
          pin: formData.numeric,
          unconfirmedMobileNumberForQuery: unconfirmedMobileNumber,
        }),
      );
    }

    return dispatch(getMembershipCardBalanceAction(formData)).then(() => {});
  };

  const _handleFormSuccess = (formData) => {
    if (!_.isEmpty(unconfirmedMobileNumber)) {
      succesfulInput();
    } else {
      setSuccessLoader(true);
      _closeModal();
      const pin = _.get(formData, 'numeric');
      dispatch(rememberCardPin(pin));
      return navigation.navigate('MembershipCardDetail');
    }
    return null;
  };

  const _closeModal = () => {
    closeModal(false);
  };

  const triggerAutoFill = () => {
    const { current } = formRef;
    if (!_.isNull(current) && _.isEqual(cardPin.length, 4)) {
      _closeModal();
      current.handleSubmit();
    }
  };

  return isLoading && successLoader ? (
    <ModalLoader isLoading={isLoading} />
  ) : (
    <>
      <Modal
        isVisible={visible}
        hasBackdrop
        backdropOpacity={0.7}
        backdropColor={colors.primary}
        animationIn="pulse"
        animationOut="pulse"
        onModalWillShow={triggerAutoFill}
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
            <Text style={custom.modalCenterTitle}>Card PIN</Text>
            <Text style={custom.modalCenterSubtitle}>
              Please enter your 4 digit PIN for Peermont Winners Circle card number
            </Text>
            <Divider />
            <NumericalInputForm
              submitForm={_handleFormSubmission}
              initialValues={initialValues}
              onSuccess={_handleFormSuccess}
              ref={formRef}
            />
            <ModalLoader isLoading={isLoading} />
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

MembershipCardInput.propTypes = {
  visible: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  cardPin: PropTypes.string,
  unconfirmedMobileNumber: PropTypes.string,
  succesfulInput: PropTypes.func,
};

MembershipCardInput.defaultProps = {
  cardPin: '',
  unconfirmedMobileNumber: '',
  succesfulInput: () => null,
};

export default MembershipCardInput;
