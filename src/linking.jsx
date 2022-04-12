const config = {
  screens: {
    APP: {
      screens: {
        PaymentStatus: 'payment-status/:success',
      },
    },
  },
};

const linking = {
  prefixes: ['winnerscircle://'],
  config,
};

export default linking;
