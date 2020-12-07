export const topUpModel = ({ amount, creditCardId, isEft } = {}) => ({
  amount: amount || '',
  creditCardId: creditCardId || '',
  isEft: isEft || false,
});
