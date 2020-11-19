/* eslint-disable camelcase */
export const userBankAccountModel = ({
  id,
  user_id,
  bank_id,
  account_holder,
  account_number,
  account_type,
  default,
  status,
  proof_of_banking_status,
} = {}) => ({
  id: id || '',
  userId: user_id || '',
  bankId: bank_id || '',
  accountHolder: account_holder || '',
  accountNumber: account_number || '',
});

export const apiUserModel = ({ email, name } = {}) => ({
  user: {
    email: email || '',
    name: name || '',
  },
});

export const constructUserBankAccountModels = (bankAccounts) => {
  return (bankAccounts && bankAccounts.map((card) => userBankAccountModel(card))) || [];
};
