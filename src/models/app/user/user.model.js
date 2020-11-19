/* eslint-disable camelcase */
import { membershipCardModel } from './membership-card/membership-card.model';

export const userModel = ({
  id,
  first_name,
  last_name,
  mobile_number,
  email,
  id_number,
  credit_cards,
  bank_accounts,
  tier,
  membership_cards,
} = {}) => ({
  id: id || '',
  firstName: first_name || '',
  lastName: last_name || '',
  mobileNumber: mobile_number || '',
  email: email || '',
  idNumber: id_number || '',
  tier: tier || '',
  membershipCards:
    (membership_cards && membership_cards.map((card) => membershipCardModel(card))) || [],
  // membershipCards: membership_cards || [],
  bankAccounts: bank_accounts || [],
  creditCards: credit_cards || [],
});

export const apiUserModel = ({ email, name } = {}) => ({
  user: {
    email: email || '',
    name: name || '',
  },
});
