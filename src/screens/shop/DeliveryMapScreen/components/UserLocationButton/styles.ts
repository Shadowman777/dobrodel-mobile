import {StyleSheet, Dimensions} from 'react-native';

import appStyles from 'assets/styles/appStyles';

const {height} = Dimensions.get('window');

export default StyleSheet.create({
  buttonContainer: {
    ...appStyles.flexCenter,
    backgroundColor: '#fff',
    borderRadius: 100,
    height: 40,
    right: 25,
    top: height * 0.11,
    position: 'absolute',
    width: 40,
  },
});
