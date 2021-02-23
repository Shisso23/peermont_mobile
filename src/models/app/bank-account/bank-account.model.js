/* eslint-disable camelcase */
export const bankAccountModel = ({ account_holder, account_number, bank_id } = {}) => ({
  accountHolder: account_holder || '',
  accountNumber: account_number || '',
  bankId: bank_id || '',
});

export const bankAccountDocumentModel = ({ proof_of_bank } = {}) => ({
  proofOfBankDocument: proof_of_bank || '',
});

export const apiBankAccountModel = ({ accountHolder, accountNumber, bankId } = {}) => ({
  bank_account: {
    account_holder: accountHolder || '',
    account_number: accountNumber || '',
    bank_id: bankId || '',
  },
});
