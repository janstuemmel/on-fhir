import React from 'react';
import { View, Text, StyleSheet, ScrollView, RefreshControl, TouchableOpacity } from 'react-native';
import { Component } from 'reflux';

import moment from 'moment';
import HealthKit from 'react-native-apple-healthkit';

import globalStyles from '../styles';
import Item from './item';
import DeviceStore from '../stores/device';
import DeviceActions from '../actions/device';

class Detail extends Component {

  constructor(props) {
    super(props);
    this.store = DeviceStore;
  }

  componentDidMount() {
    this._getData();
  }

  _getData() {
    this.setState({ fetching: true });
    DeviceActions.get(this.props.identifier, new Date(2016,1,1).toISOString(), this.props.unit);
  }

  _getSamples() {
    const that = this;
    return this.state.samples.map((item, i) => {
      return (
        <Item
          key={'sample_' + i}
          label={moment(item.startDate).format('ll')}
          value={that.props.normalize(item.value)}
        />
      );
    });
  }

  _refreshControl() {
    return (
      <RefreshControl
        refreshing={this.state.fetching}
        onRefresh={this._getData.bind(this)}
      />
    );
  }

  render() {

    if (this.state.err) {
      return (
        <View style={[globalStyles.sceneContainer]}>
          <Text>Error getting Data!</Text>
        </View>
      );
    }

    if (this.state.samples.length < 1) {
      return (
        <View style={[globalStyles.sceneContainer]}>
          <Text>No data available!</Text>
        </View>
      );
    }

    return (
      <View style={[globalStyles.sceneContainer]}>
        <View style={styles.container}>
          <View style={styles.header}>
            <View style={styles.headerLabelContainer}>
              <Text style={styles.headerTextLabel}>{this.props.label}</Text>
            </View>
            <View style={styles.headerButtonContainer}>
              <Button name="Send to server" style={{ flex: 0.5 }} />
              <Button name="Sync with server" style={{ flex: 0.5 }} />
            </View>
          </View>
          <ScrollView style={styles.list} refreshControl={this._refreshControl()}>
            {this._getSamples()}
          </ScrollView>
        </View>
      </View>
    );
  }
}

module.exports = Detail;

const Button = (props) =>
  <TouchableOpacity
    activeOpacity={0.7}
    onPress={props.onPress}
    style={[{
      backgroundColor: '#880E4F',
      margin: 10,
      padding: 10,
      borderRadius: 3,
      borderWidth: 1,
      borderColor: '#80024f'
    }, props.style]}>
      <Text style={{
        fontSize: 15,
        color: '#FFFFFF',
        textAlign: 'center'
      }}>{props.name}</Text>
  </TouchableOpacity>;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  headerLabelContainer: {
    flex: 0.5,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  headerButtonContainer: {
    flex: 0.5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  header: {
    flex: 0.4,
    backgroundColor: '#AD1457'
  },
  headerTextLabel: {
    fontSize: 30,
    color: '#FFFFFF',
  },
  list: {
    flex: 0.6,
    backgroundColor: '#FFFFFF'
  }
});
