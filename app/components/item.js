import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

class Item extends Component {

  render() {
    return (
      <TouchableOpacity activeOpacity={0.8} onPress={this.props.onPress}>
        <View style={styles.container}>
          <Text style={styles.label}>{this.props.label}</Text>
          <Text style={styles.value}>{this.props.value}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

module.exports = Item;

Item.propTypes = {
  label: React.PropTypes.string,
  value: React.PropTypes.string,
  // onPress: React.PropTypes.func,
}

Item.defaultProps = {
  onPress() {
    console.log('onPress placeholder');
  }
}

const styles = StyleSheet.create({

  label: {
    fontSize: 18,
  },

  value: {
    fontSize: 20,
    fontWeight: 'bold'
  },

  container: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    borderBottomColor: '#e0e0e0',
    borderBottomWidth: 1,
  },
});
