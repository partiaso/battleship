export default {
  transform: {
    '^.+\\.js$': 'babel-jest'
  },
  testEnvironment: 'node',
  moduleNameMapper: {
    '\\.css$': '<rootDir>/jest-css-mock.js' // solo si importas CSS
  }
};