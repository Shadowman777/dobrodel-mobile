import {StyleSheet, Dimensions} from 'react-native';
import {isTablet} from 'react-native-device-info';

const {width} = Dimensions.get('window');

export default StyleSheet.create({
  actionItemContainer: {
    marginRight: 6,
  },
  actionItem: {
    alignItems: 'stretch',
    borderRadius: 6,
    flexDirection: 'row',
  },
  actionItemWrapper: {
    borderRadius: 6,
    minHeight: isTablet() ? 164 : 104,
    width: isTablet() ? width * 0.21 : width * 0.2,
  },
  actionItemText: {
    color: '#fff',
    fontSize: isTablet() ? 16 : 12,
    fontWeight: 'bold',
    lineHeight: isTablet() ? 20 : 15,
  },
  actionItemContent: {
    borderRadius: 6,
    flex: 1,
    padding: 6,
  },
});
