import React, { Component } from 'react';
import { ScrollView, Text, TouchableOpacity } from 'react-native';

import { Actions } from 'react-native-router-flux';

import globalStyles from '../styles';

import ListItem from './item';

class Dashboard extends Component {

  _getItems() {
    return healthData.map(function(item, i) {
      return (
        <DashboardItem
          key={'dashboardHealthItem_' + i}
          label={item.label}
          onPress={() => Actions.Detail({
            label: item.label,
            identifier: item.identifier,
            unit: item.unit,
            normalize: item.normalize
          })}
        />
      )
    });
  }

  render() {
    return (
      <ScrollView style={[globalStyles.sceneContainer]}>
        {this._getItems()}
      </ScrollView>
    )
  }
}

module.exports = Dashboard;

const DashboardItem = (props) =>
  <TouchableOpacity
    activeOpacity={0.8}
    onPress={props.onPress}
    style={{padding: 20, borderBottomWidth: 1, borderBottomColor: '#e0e0e0'}}
  >
    <Text style={{fontSize: 20, fontWeight: 'bold'}}>{props.label}</Text>
  </TouchableOpacity>;

const healthData = [
  {
    label: 'Weight',
    identifier: 'weight',
    unit: 'gram',
    normalize: (val) => (val/1000).toFixed(2).toString() + ' kg'
  },
  {
    label: 'Height',
    identifier: 'height',
    unit: 'meter',
    normalize: (val) => val.toFixed(2).toString() + ' m'
  },
]
