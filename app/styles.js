import { StyleSheet, Platform } from 'react-native';

module.exports = StyleSheet.create({
  sceneContainer: {
    marginTop: (Platform.OS === 'ios') ? 64 : 54,
    flexDirection: 'column',
    flex: 1,
  }
});
