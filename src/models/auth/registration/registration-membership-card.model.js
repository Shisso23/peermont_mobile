/* eslint-disable camelcase */
export const registrationMembershipCardModel = ({
  card_number,
  pin,
  manufacturer,
  device_os,
  os_version,
  device_model,
} = {}) => ({
  cardNumber: card_number || '',
  pin: pin || '',
  manufacturer: manufacturer || '',
  device_os: device_os || '',
  os_version: os_version || '',
  device_model: device_model || '',
});

export const apiRegistrationMembershipCardModel = ({
  cardNumber,
  encryptedPin,
  manufacturer,
  device_os,
  os_version,
  device_model,
} = {}) => ({
  registration: {
    card_number: cardNumber || '',
    pin: encryptedPin || '',
    manufacturer: manufacturer || '',
    device_os: device_os || '',
    os_version: os_version || '',
    device_model: device_model || '',
  },
});
