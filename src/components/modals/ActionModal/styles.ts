import {StyleSheet, Dimensions, Platform} from 'react-native';

import appStyles from 'assets/styles/appStyles';
import constants from 'assets/styles/constants';

const {height, width} = Dimensions.get('window');

const imageHeight = (height * 0.75 * 35) / 100;

export default StyleSheet.create({
  container: {
    ...appStyles.modalContent,
    ...appStyles.alignCenter,
    ...appStyles.flexBlock,
  },
  actionContent: {
    ...appStyles.justifyCenter,
    maxHeight: height * 0.55,
    flexDirection: 'row',
    width: width * 0.95,
  },
  actionTopContainer: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  actionImage: {
    borderRadius: 6,
    height: imageHeight,
    width: '100%',
  },
  actionInfoWrapper: {
    borderBottomWidth: 2,
    borderBottomColor: '#f3f3f3',
    paddingBottom: 18,
  },
  actionTitleWrapper: {
    marginVertical: 14,
  },
  actionTitle: {
    color: constants.colors.primaryText,
    fontSize: 24,
    fontWeight: '700',
    lineHeight: 32,
  },
  actionDescriptionWrapper: {
    paddingBottom: 25,
  },
  actionDescription: {
    color: constants.colors.primaryText,
    fontSize: 12,
    lineHeight: 16,
  },
  actionButtonWrapper: {
    marginBottom: 25,
    marginLeft: 'auto',
    marginTop: 15,
    marginRight: 'auto',
    width: width * 0.8,
  },
  actionBottomContainer: {
    backgroundColor: '#fff',
    height: Platform.OS === 'ios' ? 130 : 124,
    padding: 15,
    paddingTop: 13,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: Platform.OS === 'ios' ? -5 : -8,
    },
    shadowOpacity: 0.19,
    shadowRadius: 7.62,
    width: width,
  },
});
