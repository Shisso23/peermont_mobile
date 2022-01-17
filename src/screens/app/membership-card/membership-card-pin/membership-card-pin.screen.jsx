import React, { useEffect, useRef, useState } from 'react';
import { Text } from 'react-native-elements';
import { ActivityIndicator, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation, useRoute } from '@react-navigation/native';
import _ from 'lodash';

import { NumericalInputForm } from '../../../../components/forms';
import { KeyboardScrollContainer, PaddedContainer } from '../../../../components/containers';
import {
  getMembershipCardBalanceAction,
  rememberCardPin,
  queryPatronEnquiryAction,
} from '../../../../reducers/membership-card-reducer/membership-card.actions';
import { membershipCardSelector } from '../../../../reducers/membership-card-reducer/membership-card.reducer';
import { membershipCardPinModel } from '../../../../models';
import { useDisableBackButtonWhileLoading } from '../../../../hooks';
import { Modal } from '../../../../components/atoms';
import { OtpNumericInput } from '../../../../components/molecules';
import colors from '../../../../../theme/theme.colors';
import { custom } from '../../../../../theme/theme.styles';

const MembershipCardPinScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const route = useRoute();
  const formRef = useRef(null);
  const { currentMembershipCard, isLoading } = useSelector(membershipCardSelector);

  const [showOtpModal, setShowOtpModal] = useState(false);
  const userData = {
    unconfirmed_mobile_number: _.get(route.params, 'unconfirmedMobileNumberForQuery'),
  };

  const unconfirmedMobileNumber = _.get(route.params, 'unconfirmedMobileNumberForQuery');

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
      setShowOtpModal(true);
    } else {
      const pin = _.get(formData, 'numeric');
      dispatch(rememberCardPin(pin));
      navigation.replace('MembershipCardDetail');
    }
  };

  const { cardPin = '' } = route.params;

  const initialValues = membershipCardPinModel({ card_pin: cardPin });

  useDisableBackButtonWhileLoading(isLoading);

  const _closeModal = (close) => {
    setShowOtpModal(close);
  };

  useEffect(() => {
    const { current } = formRef;
    if (!_.isNull(current) && cardPin.length === 4) {
      current.handleSubmit();
    }
  }, [cardPin]);

  return (
    <KeyboardScrollContainer>
      <PaddedContainer>
        <Text style={custom.centerTitle}>Card PIN</Text>
        <Text style={custom.centerSubtitle}>
          Please enter your 4 digit PIN for Peermont Winners Circle card number{' '}
          {currentMembershipCard.cardNumber}.
        </Text>
      </PaddedContainer>
      <PaddedContainer>
        <NumericalInputForm
          submitForm={_handleFormSubmission}
          initialValues={initialValues}
          onSuccess={_handleFormSuccess}
          ref={formRef}
        />
      </PaddedContainer>
      <Modal
        visible={isLoading}
        transparent
        backgroundFade
        backgroundFadeColor={colors.whiteTransparent}
      >
        <View>
          <ActivityIndicator animating size="large" color={colors.gold} />
        </View>
      </Modal>
      <OtpNumericInput
        visible={showOtpModal}
        setModalVisible={_closeModal}
        userData={userData}
        verificationType="UPDATE_MOBILE_NUMBER"
      />
    </KeyboardScrollContainer>
  );
};

MembershipCardPinScreen.propTypes = {};

MembershipCardPinScreen.defaultProps = {};

export default MembershipCardPinScreen;
