
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { Router, Scene } from 'react-native-router-flux';

import HealthKit from 'react-native-apple-healthkit';

import Dashboard from './components/dashboard';
import Detail from './components/detail';

let hkOptions = {
  permissions: {
    read: [ 'Height', 'Weight' ],
    write: [ 'Height', 'Weight' ]
  }
}

class App extends Component {

  constructor(props) {
    super(props);
    this.state = { hkAvailable: false };
  }

  componentDidMount() {
    let that = this;
    HealthKit.initHealthKit(hkOptions, (err, res) => {
      if (err) {
        return;
      }
      that.setState({ hkAvailable: true });
    });
  }

  render() {

    if (this.state.hkAvailable === false) {
      return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{fontSize: 30}}>Error</Text>
          <Text style={{fontSize: 20}}>HealthKit access denied!</Text>
          <Text style={{fontSize: 15}}>Give this app HealthKit permissions!</Text>
        </View>
      );
    }

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
