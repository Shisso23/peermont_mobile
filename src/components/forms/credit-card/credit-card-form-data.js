const expiryMonths = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
const cardTypes = ['VISA', 'MASTERCARD'];

export const cardTypesDropdownData = cardTypes.map((cardType) => ({
  label: cardType,
  value: cardType,
}));

export const expiryMonthsDropdownData = expiryMonths.map((month) => ({
  label: month,
  value: month,
}));

export const expiryYearsDropdownData = () => {
  const YEAR_UPPER_BOUND = 10;
  let currentYear = new Date().getFullYear();
  const years = [];
  for (let i = 0; i <= YEAR_UPPER_BOUND; i += 1) {
    years.push({
      label: currentYear.toString(),
      value: currentYear.toString(),
    });
    currentYear += 1;
  }
  return years;
};
