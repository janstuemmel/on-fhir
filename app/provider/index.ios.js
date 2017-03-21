import HK from 'react-native-apple-healthkit';

module.exports = {
  weight: HK.getWeightSamples,
  height: HK.getHeightSamples,
}
