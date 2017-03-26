
// ref: https://github.com/facebook/jest/issues/2208#issuecomment-264733133
jest.mock('Linking', () => {
  return {
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    openURL: jest.fn(),
    canOpenURL: jest.fn(),
    getInitialURL: jest.fn(),
  }
})

// DOM api for nodjs
const jsdom = require('jsdom').jsdom;
global.document = jsdom('');
global.window = document.defaultView;
Object.keys(document.defaultView).forEach((property) => {
  if (typeof global[property] === 'undefined') {
    global[property] = document.defaultView[property];
  }
});

// mock react native
jest.mock('react-native', () => {
  return require('react-native-mock-render');
})
