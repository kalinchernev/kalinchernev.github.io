const { defaults } = require('jest-config');

module.exports = {
  verbose: true,
  testPathIgnorePatterns: [...defaults.testPathIgnorePatterns, '.cache'],
};
