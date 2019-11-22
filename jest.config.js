module.exports = {
  displayName: 'PharmLoc',
  verbose: true,
  testMatch: ['**/?(*.)+(spec|test).js'],
  collectCoverage: true,
  clearMocks: true,
  collectCoverageFrom: [
    'api/**/*.js',
    '!**/coverage/**',
    '!**/node_modules/**',
    '!**/jest.config.js'
  ],
  coverageThreshold: {
    global: {
      branches: 45,
      functions: 45,
      lines: 45,
      statements: 45
    }
  },
};
