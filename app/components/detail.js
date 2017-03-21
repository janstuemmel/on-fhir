import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, RefreshControl, TouchableOpacity } from 'react-native';

import globalStyles from '../styles';

import Item from './item';

class Detail extends Component {

  constructor(props) {
    super(props);
    this.state = { refreshing: false };
  }

  _onRefresh() {
    this.setState({ refreshing: true });
    const that = this;
    setTimeout(() => { that.setState({ refreshing: false }); }, 1000);
  }

  _refreshControl() {
    return (
      <RefreshControl
        refreshing={this.state.refreshing}
        onRefresh={this._onRefresh.bind(this)}
      />
    );
  }

  render() {
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
            <Item label="12/12/2017" value="123.2" />
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
