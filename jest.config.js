module.exports = {
  transform: {
    '^.+\\.(js|jsx)$': 'babel-jest',
  },
  collectCoverageFrom: ['./src/**/*.js'],
  coverageThreshold: {
    global: {
      lines: 90,
    },
  },
};
