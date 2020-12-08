import { useState, useEffect } from 'react';
import _ from 'lodash';
import { useSelector } from 'react-redux';

export const useBankUri = (userBankId) => {
  const { banks } = useSelector((reducers) => reducers.formDataReducer);

  const [bankUri, setBankUri] = useState(null);

  useEffect(() => {
    const bank = _.find(banks, { id: userBankId });
    setBankUri(bank.iconUrl);
  }, [userBankId]);

  return { bankUri };
};
