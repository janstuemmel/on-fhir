
import React, { Component } from 'react';
import { AppRegistry } from 'react-native';

import App from './app/app';

class onfhir extends Component {
  render() {
    return (
      <App />
    );
  }
}

AppRegistry.registerComponent('onfhir', () => onfhir);
