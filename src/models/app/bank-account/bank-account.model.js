import _ from 'lodash';

export const bankAccountModel = (_model = {}) => ({
  accountHolder: _.get(_model, 'account_holder'),
  accountNumber: _.get(_model, 'account_number'),
  bankId: _.get(_model, 'bank_id'),
});

export const bankAccountDocumentModel = (_model = {}) => ({
  proofOfBankDocument: _.get(_model, 'proof_of_bank'),
});

export const apiBankAccountModel = (_model = {}) => ({
  bank_account: {
    account_holder: _.get(_model, 'accountHolder'),
    account_number: _.get(_model, 'accountNumber'),
    bank_id: _.get(_model, 'bankId'),
  },
});
