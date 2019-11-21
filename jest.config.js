module.exports = {
  displayName: 'PharmLoc',
  verbose: true,
  testMatch: ['**/?(*.)+(spec|test).js'],
  collectCoverage: true,
  clearMocks: true,
  collectCoverageFrom: [
    'api/**/*.{js}',
    '!**/coverage/**',
    '!**/node_modules/**',
    '!**/jest.config.js'
  ],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80
    }
  },
};
