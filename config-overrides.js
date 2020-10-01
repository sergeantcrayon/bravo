const path = require('path');

module.exports = function override(config) {
  config.resolve = {
    ...config.resolve,
    alias: {
      ...config.alias,
      '@core': path.resolve(__dirname, 'src/core'),
      '@shared': path.resolve(__dirname, 'src/shared'),
      '@environments': path.resolve(__dirname, 'src/environments'),
      '@services': path.resolve(__dirname, 'src/services'),
      '@dashboard': path.resolve(__dirname, 'src/features/dashboard'),
      '@lfg-room': path.resolve(__dirname, 'src/features/lfg-room'),
    },
  };

  return config;
};
