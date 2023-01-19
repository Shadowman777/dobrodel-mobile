import {StyleSheet, Platform} from 'react-native';

export default StyleSheet.create({
  headerIconContainer: {
    backgroundColor: '#fff',
    width: 36,
    height: 36,
    borderRadius: 18,
    marginBottom: Platform.OS === 'ios' ? 5 : 0,
  },
  headerShadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  carContainer: {
    position: 'absolute',
    top: -7,
    right: -12,
  },
});
