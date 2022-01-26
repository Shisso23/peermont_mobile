import _ from 'lodash';
import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Modal from 'react-native-modal';
import PropTypes from 'prop-types';
import { Dimensions, StyleSheet, View, TouchableOpacity } from 'react-native';
import { Divider, Text } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
import Carousel, { Pagination } from 'react-native-snap-carousel';

import ModalLoader from '../../atoms/modal-loader';
import OtpNumericInput from '../otp-numeric-input';
import MembershipCardCarouselItem from '../membership-card-carousel-item';
import { userUpdateProfileAction } from '../../../reducers/user-reducer/user.actions';
import { membershipCardSelector } from '../../../reducers/membership-card-reducer/membership-card.reducer';
import { ProfileForm } from '../../forms';
import { PaddedContainer } from '../../containers';
import { MembershipCardInput } from '../../atoms';
import colors from '../../../../theme/theme.colors';
import { custom } from '../../../../theme/theme.styles';

const { width: screenWidth } = Dimensions.get('window');

const STEPS = ['MethodSelect', 'Input', 'OTP', 'CardSelect', 'MembershipInput'];

const UpdateOptions = ({ currentStep, setStep, visible, setModalVisible, updateType }) => {
  if (currentStep !== STEPS[0]) {
    return null;
  }

  const _closeModal = () => {
    setModalVisible(false);
    setStep(STEPS[0]);
  };

  const nextStepEmail = () => {
    setStep(STEPS[1]);
    updateType('EMAIL');
  };

  const nextStepMobileNumber = () => {
    setStep(STEPS[1]);
    updateType('MOBILE_NUMBER');
  };

  return (
    <Modal
      isVisible={visible}
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
          <Text style={custom.modalCenterTitle}>Update Details</Text>
          <Text style={custom.modalCenterSubtitle}>
            Please select one of the following, to update your profile:
          </Text>
          <Divider />
          <TouchableOpacity style={custom.modalButton} onPress={nextStepEmail}>
            <Text style={custom.modalButtonText}>EMAIL</Text>
          </TouchableOpacity>
          <Divider />
          <TouchableOpacity style={custom.modalButton} onPress={nextStepMobileNumber}>
            <Text style={custom.modalButtonText}>MOBILE NUMBER</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

UpdateOptions.propTypes = {
  currentStep: PropTypes.string.isRequired,
  visible: PropTypes.bool.isRequired,
  setModalVisible: PropTypes.func.isRequired,
  setStep: PropTypes.func.isRequired,
  updateType: PropTypes.func.isRequired,
};

const UpdateInput = ({ currentStep, setStep, visible, setModalVisible, updateType, userData }) => {
  if (currentStep !== STEPS[1]) {
    return null;
  }
  const { user } = useSelector((reducers) => reducers.userReducer);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const _handleSubmission = (formData) => {
    setIsLoading(true);
    return dispatch(userUpdateProfileAction(formData));
  };

  const uniqueEmail = (data) => {
    return !_.isEqual(_.get(data, 'email'), _.get(data, 'unconfirmed_email'));
  };

  const uniqueNumber = (data) => {
    return !_.isEqual(_.get(data, 'unconfirmed_mobile_number'), null);
  };

  const _handleFormSuccess = (data) => {
    setIsLoading(false);
    if (_.isEqual(updateType, 'EMAIL') && uniqueEmail(data)) {
      userData(data);
      setStep(STEPS[2]);
    } else if (_.isEqual(updateType, 'MOBILE_NUMBER') && uniqueNumber(data)) {
      userData(data);
      setStep(STEPS[3]);
    } else {
      _closeModal();
    }
  };

  const _closeModal = () => {
    setModalVisible(false);
    setStep(STEPS[0]);
  };

  const initialValues = {
    mobileNumber: '',
    callingCode: _.get(user, 'callingCode'),
    email: '',
    country: _.get(user, 'country'),
  };

  return isLoading ? (
    <ModalLoader isLoading={isLoading} />
  ) : (
    <Modal
      isVisible={visible}
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

          <Text style={custom.modalCenterTitle}>
            Update {_.isEqual(updateType, 'EMAIL') ? 'Email' : 'Mobile Number'}
          </Text>
          <Text style={custom.modalCenterSubtitle}>
            {`Please enter a valid ${
              _.isEqual(updateType, 'EMAIL') ? 'email address below:' : 'mobile number below:'
            }`}
          </Text>

          <ProfileForm
            submitForm={_handleSubmission}
            onSuccess={_handleFormSuccess}
            initialValues={initialValues}
            updateEmail={_.isEqual(updateType, 'EMAIL')}
          />
        </View>
      </View>
    </Modal>
  );
};

UpdateInput.propTypes = {
  currentStep: PropTypes.string.isRequired,
  visible: PropTypes.bool.isRequired,
  setModalVisible: PropTypes.func.isRequired,
  setStep: PropTypes.func.isRequired,
  updateType: PropTypes.string.isRequired,
  userData: PropTypes.func.isRequired,
};

const UpdateOtp = ({ currentStep, setStep, visible, setModalVisible, userData }) => {
  if (currentStep !== STEPS[2]) {
    return null;
  }

  const _closeModal = () => {
    setModalVisible(false);
    setStep(STEPS[0]);
  };

  return (
    <OtpNumericInput
      visible={visible}
      setModalVisible={_closeModal}
      userData={userData}
      verificationType="UPDATE_PROFILE"
    />
  );
};

UpdateOtp.propTypes = {
  currentStep: PropTypes.string.isRequired,
  visible: PropTypes.bool.isRequired,
  setModalVisible: PropTypes.func.isRequired,
  setStep: PropTypes.func.isRequired,
  userData: PropTypes.object.isRequired,
};

const CardSelect = ({ currentStep, setStep, visible, setModalVisible, userData, setIndex }) => {
  if (currentStep !== STEPS[3]) {
    return null;
  }

  const unconfirmedMobileNumber = _.get(userData, 'unconfirmed_mobile_number');
  const { membershipCards } = useSelector(membershipCardSelector);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const _keyExtractor = (item) => _.get(item, 'id', '').toString();
  const _setActiveSlideIndex = (index) => {
    setActiveSlideIndex(index);
  };

  const _closeModal = () => {
    setModalVisible(false);
    setStep(STEPS[0]);
  };

  const _switchToInput = (index) => {
    setIndex(index);
    setStep(STEPS[4]);
  };

  const RenderCard = () => {
    return !_.isEmpty(membershipCards) ? (
      <PaddedContainer>
        <View style={styles.carouselContainer}>
          <Carousel
            data={membershipCards}
            extraData={membershipCards}
            renderItem={({ item, index }) => (
              <MembershipCardCarouselItem
                item={item}
                index={index}
                cardSelected={_switchToInput}
                unconfirmedMobileNumber={unconfirmedMobileNumber}
                closeModal={_closeModal}
              />
            )}
            sliderWidth={500}
            itemWidth={250}
            onSnapToItem={_setActiveSlideIndex}
            removeClippedSubviews={false}
            keyExtractor={_keyExtractor}
            layout="tinder"
            layoutCardOffset={0}
          />
          <Pagination
            dotsLength={membershipCards.length}
            activeDotIndex={activeSlideIndex}
            dotStyle={styles.activePagination}
            inactiveDotStyle={styles.inactivePagination}
            containerStyle={styles.containerStyle}
            inactiveDotOpacity={0.4}
            inactiveDotScale={1}
          />
        </View>
      </PaddedContainer>
    ) : (
      <PaddedContainer>
        <Text style={custom.modalCenterTitle}>Select Card</Text>
        <Text style={custom.modalCenterSubtitle}>No Card Avaliable</Text>
      </PaddedContainer>
    );
  };

  return (
    <Modal
      isVisible={visible}
      hasBackdrop
      backdropOpacity={0.7}
      backdropColor={colors.primary}
      animationIn="pulse"
      animationOut="pulse"
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <TouchableOpacity
            onPress={_closeModal}
            style={custom.closeIconContainer}
            hitSlop={custom.hitSlop}
          >
            <Icon name="times" color={colors.gold} size={22} />
          </TouchableOpacity>
          <Text style={custom.modalCenterTitle}>Select Card</Text>
          <Text style={custom.modalCenterSubtitle}>
            Please select one of your cards by swiping below:
          </Text>
          {RenderCard()}
        </View>
      </View>
    </Modal>
  );
};

CardSelect.propTypes = {
  currentStep: PropTypes.string.isRequired,
  visible: PropTypes.bool.isRequired,
  setModalVisible: PropTypes.func.isRequired,
  setStep: PropTypes.func.isRequired,
  userData: PropTypes.object.isRequired,
  setIndex: PropTypes.func.isRequired,
};

const UpdateMembershipInput = ({
  currentStep,
  setStep,
  visible,
  setModalVisible,
  userData,
  cardIndex,
}) => {
  if (currentStep !== STEPS[4]) {
    return null;
  }
  const unconfirmedMobileNumber = _.get(userData, 'unconfirmed_mobile_number');
  const { membershipCardPins } = useSelector(membershipCardSelector);

  const _switchToOtp = () => {
    setStep(STEPS[2]);
  };

  const _closeModal = () => {
    setModalVisible(false);
    setStep(STEPS[0]);
  };

  return (
    <MembershipCardInput
      visible={visible}
      closeModal={_closeModal}
      cardPin={_.get(membershipCardPins[cardIndex], 'card_pin')}
      unconfirmedMobileNumber={unconfirmedMobileNumber}
      succesfulInput={_switchToOtp}
    />
  );
};

UpdateMembershipInput.propTypes = {
  currentStep: PropTypes.string.isRequired,
  visible: PropTypes.bool.isRequired,
  setModalVisible: PropTypes.func.isRequired,
  setStep: PropTypes.func.isRequired,
  userData: PropTypes.object.isRequired,
  cardIndex: PropTypes.number.isRequired,
};

const UpdateProfile = ({ visible, setModalVisible }) => {
  const [step, setStep] = useState(STEPS[0]);
  const [updateType, setUpdateType] = useState('');
  const [userData, setUserData] = useState({});
  const [cardIndex, setCardIndex] = useState(0);

  return (
    <View>
      <UpdateOptions
        currentStep={step}
        setStep={setStep}
        visible={visible}
        setModalVisible={setModalVisible}
        updateType={setUpdateType}
      />
      <UpdateInput
        currentStep={step}
        setStep={setStep}
        visible={visible}
        setModalVisible={setModalVisible}
        updateType={updateType}
        userData={setUserData}
      />
      <UpdateOtp
        currentStep={step}
        setStep={setStep}
        visible={visible}
        setModalVisible={setModalVisible}
        userData={userData}
      />
      <CardSelect
        currentStep={step}
        setStep={setStep}
        visible={visible}
        setModalVisible={setModalVisible}
        setIndex={setCardIndex}
        userData={userData}
      />
      <UpdateMembershipInput
        currentStep={step}
        setStep={setStep}
        visible={visible}
        setModalVisible={setModalVisible}
        cardIndex={cardIndex}
        userData={userData}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  carouselContainer: {
    alignItems: 'center',
    bottom: 20,
  },
  centeredView: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    marginBottom: 120,
    marginTop: 180,
  },
  modalView: {
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: 20,
    elevation: 5,
    margin: 15,
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

UpdateProfile.propTypes = {
  visible: PropTypes.bool.isRequired,
  setModalVisible: PropTypes.func.isRequired,
};

UpdateProfile.defaultProps = {};

export default UpdateProfile;
