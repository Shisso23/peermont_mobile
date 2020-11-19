/* eslint-disable camelcase */
import { constructUserMembershipCardModels } from './user-membership-card/user-membership-card.model';
import { constructUserBankAccountModels } from './user-bank-account/user-bank-account.model';
import { constructUserCreditCardModels } from './user-credit-card/user-credit-card.model';

export const userModel = ({
  id,
  first_name,
  last_name,
  mobile_number,
  email,
  id_number,
  credit_cards,
  bank_accounts,
  tier_name,
  membership_cards,
} = {}) => ({
  id: id || '',
  firstName: first_name || '',
  lastName: last_name || '',
  mobileNumber: mobile_number || '',
  email: email || '',
  idNumber: id_number || '',
  tierName: tier_name || '',
  membershipCards: constructUserMembershipCardModels(membership_cards),
  bankAccounts: constructUserBankAccountModels(bank_accounts),
  creditCards: constructUserCreditCardModels(credit_cards),
});
