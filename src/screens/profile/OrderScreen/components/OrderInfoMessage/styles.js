import {StyleSheet} from 'react-native';

import appStyles from 'assets/styles/appStyles';

export default StyleSheet.create({
  orderInfoMessageBlock: {
    ...appStyles.justifyCenter,
    borderRadius: 8,
    height: 57,
    flexWrap: 'wrap',
    marginVertical: 12,
    paddingLeft: 12,
  },
  orderInfoMessageText: {
    fontSize: 12,
    fontWeight: '700',
    lineHeight: 16,
    marginLeft: 5,
  },
});
