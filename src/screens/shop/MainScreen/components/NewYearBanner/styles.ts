import {StyleSheet} from 'react-native';

import appStyles from 'assets/styles/appStyles';

export default StyleSheet.create({
  newYearBanner: {
    backgroundColor: '#00a079',
    borderRadius: 8,
    marginHorizontal: 8,
    marginTop: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  newYearBannerCloseButton: {
    ...appStyles.flexCenter,
    height: 22,
    width: 22,
    zIndex: 999,
  },
  newYearBannerContent: {
    top: -10,
  },
  newYearBannerTitle: {
    color: '#fff',
    fontSize: 16,
    lineHeight: 22,
    fontWeight: '700',
  },
  newYearBannerSubtitle: {
    color: '#fff',
    fontSize: 14,
    lineHeight: 18,
    paddingTop: 8,
    maxWidth: '75%',
  },
});
