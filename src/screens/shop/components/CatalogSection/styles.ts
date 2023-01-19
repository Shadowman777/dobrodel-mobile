import {StyleSheet, Dimensions} from 'react-native';
import {isTablet} from 'react-native-device-info';
import {scale, moderateScale} from 'react-native-size-matters';

import constants from 'assets/styles/constants';
import appStyles from 'assets/styles/appStyles';

const {width} = Dimensions.get('window');

export default StyleSheet.create({
  catalogBlocksWrapper: {
    ...appStyles.alignCenterRow,
    flexWrap: 'wrap',
    paddingLeft: 8,
    paddingRight: 5,
    paddingBottom: 15,
  },
  catalogBlockContainer: {
    height: isTablet() ? 352 : scale(130),
    marginVertical: 5,
    width: '47.8%',
  },
  catalogBlockContainerView: {
    height: '100%',
    width: '100%',
  },
  catalogBlock: {
    backgroundColor: '#fff',
    borderRadius: 8,
    height: '100%',
    paddingBottom: 5,
  },
  catalogBlockImage: {
    borderTopLeftRadius: 8,
    borderTopEndRadius: 8,
    height: isTablet() ? 304 : scale(90),
  },
  catalogBlockText: {
    color: constants.colors.primaryText,
    fontSize: isTablet() ? 18 : moderateScale(12),
    fontWeight: '700',
    lineHeight: isTablet() ? 20 : width < 333 ? 12 : 16,
    marginLeft: 8,
    marginTop: 8,
  },
});
