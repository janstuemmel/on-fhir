
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { Router, Scene } from 'react-native-router-flux';

import Dashboard from './components/dashboard';
import Detail from './components/detail';

class App extends Component {

  render() {
    return (
      <Router
        navigationBarStyle={styles.navBar}
        titleStyle={styles.navBarTitle}
        barButtonTextStyle={styles.barButtonTextStyle}
        barButtonIconStyle={styles.barButtonIconStyle}
      >
        <Scene key="root" unmountScenes>
          <Scene key="Dashboard" component={Dashboard} title="OnFhir" initial={true}></Scene>
          <Scene key="Detail" component={Detail} title="OnFhir"></Scene>
        </Scene>
      </Router>
    )
  }
}

module.exports = App;

const styles = StyleSheet.create({
  navBar: {
    backgroundColor: '#D81B60',
    borderBottomColor: '#AD1457'
  },
  navBarTitle: {
    color: '#FFFFFF'
  },
  barButtonTextStyle:{
    color:'#FFFFFF'
  },
  barButtonIconStyle:{
    tintColor:'#FFFFFF'
  },
});
