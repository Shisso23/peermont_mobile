import _ from 'lodash';

export const bankModel = (_model = {}) => ({
  id: _.get(_model, 'id'),
  name: _.get(_model, 'name'),
  branchCode: _.get(_model, 'branch_code'),
  iconUrl: _.get(_model, 'icon_url'),
});

export const constructBankModels = (banks) => {
  return (banks && banks.map((bank) => bankModel(bank))) || [];
};
