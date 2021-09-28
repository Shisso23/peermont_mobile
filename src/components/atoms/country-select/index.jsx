import React, { useState } from 'react';
import PropTypes from 'prop-types';
import CountryPicker from 'react-native-country-picker-modal';

const CountrySelect = ({ onChange, initialCountry }) => {
  const [country, setCountry] = useState([initialCountry]);
  return (
    <CountryPicker
      withFlag
      withCallingCode
      withFilter
      filterProps={{
        placeholder: 'Enter country/region name',
      }}
      countryCode={country}
      preferredCountries={['ZA']}
      onSelect={(c) => {
        setCountry(c.cca2);
        onChange({
          abbreviation: c.cca2,
          callingCode: c.callingCode[0],
        });
      }}
    />
  );
};

CountrySelect.propTypes = {
  onChange: PropTypes.func.isRequired,
  initialCountry: PropTypes.string.isRequired,
};

CountrySelect.defaultProps = {};

export default CountrySelect;
