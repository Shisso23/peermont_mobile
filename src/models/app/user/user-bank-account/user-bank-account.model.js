import _ from 'lodash';

export const userBankAccountModel = (_model = {}) => ({
  id: _.get(_model, 'id'),
  userId: _.get(_model, 'user_id'),
  bankId: _.get(_model, 'bank_id'),
  accountHolder: _.get(_model, 'account_holder'),
  accountNumber: _.get(_model, 'account_number'),
  accountType: _.get(_model, 'account_type'),
  status: _.get(_model, 'status'),
  proofOfBankingStatus: _.get(_model, 'proof_of_banking_status'),
});

export const constructUserBankAccountModels = (bankAccounts) => {
  return (bankAccounts && bankAccounts.map((card) => userBankAccountModel(card))) || [];
};
