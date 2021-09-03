import _ from 'lodash';

export const membershipCardModel = (_model = {}) => ({
  cardNumber: _.get(_model, 'card_number'),
  pin: _.get(_model, 'card_pin'),
});

export const membershipCardPinModel = (_model = {}) => ({
  numeric: _.get(_model, 'card_pin'),
});

export const apiMembershipCardModel = (_model = {}) => ({
  membership_card: {
    card_number: _.get(_model, 'cardNumber'),
    card_pin: _.get(_model, 'encryptedPin'),
  },
});

export const apiMembershipCardModelPatronEnquiry = (_model = {}) => ({
  membership_card: {
    card_number: _.get(_model, 'cardNumber'),
    card_pin: _.get(_model, 'encryptedPin'),
    unconfirmed_mobile_number: _.get(_model, 'unconfirmedMobileNumberForQuery'),
  },
});
