module.exports = {
  preset: 'react-native',
  setupFiles: ['./jestSetup.ts'],
  testPathIgnorePatterns: ['/__mocks__/', '/utils/test-utils.tsx'],
  transformIgnorePatterns: ['node_modules/?!(@react-navigation)'],
  // transformIgnorePatterns: [
  //   'node_modules/(?!(jest-)?@?react-native|@react-navigation)',
  // ]
};
