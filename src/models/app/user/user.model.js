import _ from 'lodash';
import { constructUserMembershipCardModels } from './user-membership-card/user-membership-card.model';
import { constructUserBankAccountModels } from './user-bank-account/user-bank-account.model';
import { constructUserCreditCardModels } from './user-credit-card/user-credit-card.model';

export const userModel = (_userModel = {}) => ({
  id: _.get(_userModel, 'id', ''),
  firstName: _.get(_userModel, 'first_name', ''),
  lastName: _.get(_userModel, 'last_name', ''),
  mobileNumber: _.get(_userModel, 'mobile_number', ''),
  email: _.get(_userModel, 'email', ''),
  idNumber: _.get(_userModel, 'id_number', ''),
  tierName: _.get(_userModel, 'tier_name', ''),
  membershipCards: constructUserMembershipCardModels(_.get(_userModel, 'membership_cards')),
  bankAccounts: constructUserBankAccountModels(_.get(_userModel, 'bank_accounts')),
  creditCards: constructUserCreditCardModels(_.get(_userModel, 'credit_cards')),
  proofOfId: _.get(_userModel, 'proof_of_id', ''),
  proofOfAddress: _.get(_userModel, 'proof_of_address', ''),
  proofOfIdStatus: _.get(_userModel, 'proof_of_id_status', ''),
  proofOfAddressStatus: _.get(_userModel, 'proof_of_address_status', ''),
  optInSms: _.get(_userModel, 'opt_in_sms', undefined),
  optInNotifications: _.get(_userModel, 'opt_in_push_notifications', undefined),
  callingCode: _.get(_userModel, 'callingCode', '27'),
  country: _.get(_userModel, 'country', 'ZA'),
  dailyTopUpLimit: _.get(_userModel, 'daily_top_up_limit', 0),
  unconfirmedDailyTopUpLimit: _.get(_userModel, 'unconfirmed_daily_top_up_limit', 0),
  emailConfirmed: _.get(_userModel, 'email_confirmed', false),
  pendingEmail: _.get(_userModel, 'unconfirmed_email', ''),
  cmpAccountNumber: _.get(_userModel, 'cmp_account_number', ''),
});
