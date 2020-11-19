/* eslint-disable camelcase */
export const bankModel = ({ id, name, branch_code, icon_url } = {}) => ({
  id: id || '',
  name: name || '',
  branchCode: branch_code || '',
  iconUrl: icon_url || '',
});

export const constructBankModels = (banks) => {
  return (banks && banks.map((bank) => bankModel(bank))) || [];
};
