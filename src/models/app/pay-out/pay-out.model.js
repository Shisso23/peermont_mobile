export const payOutModel = ({ amount, bankAccountId } = {}) => ({
  amount: amount || '',
  bankAccountId: bankAccountId || '',
});
