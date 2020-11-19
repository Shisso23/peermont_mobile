/* eslint-disable camelcase */
export const userBankAccountModel = ({
  id,
  user_id,
  bank_id,
  account_holder,
  account_number,
  account_type,
  status,
  proof_of_banking_status,
} = {}) => ({
  id: id || '',
  userId: user_id || '',
  bankId: bank_id || '',
  accountHolder: account_holder || '',
  accountNumber: account_number || '',
  accountType: account_type || '',
  status: status || '',
  proofOfBankingStatus: proof_of_banking_status || '',
});

export const constructUserBankAccountModels = (bankAccounts) => {
  return (bankAccounts && bankAccounts.map((card) => userBankAccountModel(card))) || [];
};
