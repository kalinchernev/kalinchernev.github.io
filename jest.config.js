const { defaults } = require('jest-config');

module.exports = {
  preset: 'jest-puppeteer',
  testPathIgnorePatterns: [...defaults.testPathIgnorePatterns, '.cache'],
  verbose: true,
};
