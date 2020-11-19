import React, { useState } from 'react';
import PropTypes from 'prop-types';
import CountryPicker from 'react-native-country-picker-modal';

const CountrySelect = ({ onChange }) => {
  const [country, setCountry] = useState(['ZA']);
  return (
    <CountryPicker
      withFlag
      withCallingCode
      withFilter
      countryCode={country}
      preferredCountries={['ZA']}
      onSelect={(c) => {
        setCountry(c.cca2);
        onChange(c);
      }}
    />
  );
};

CountrySelect.propTypes = {
  onChange: PropTypes.func.isRequired,
};

CountrySelect.defaultProps = {};

export default CountrySelect;
