import {StyleSheet, Dimensions} from 'react-native';

import appStyles from 'assets/styles/appStyles';
import constants from "assets/styles/constants";
export default StyleSheet.create({
  container: {
    ...appStyles.flexBlock,
  },
  instructionsTitle: {
    ...appStyles.appTitle,
    marginHorizontal: 13,
    marginTop: 15,
    lineHeight: 20,
    fontSize: 18,
  },
  promoCode: {
    ...appStyles.appTitle,
    color: '#333',
    margin: 10,
    marginTop: 15,
    marginHorizontal: 5,
    lineHeight: 25,
    fontSize: 20,
    flex: 6,
    borderRightWidth: 2,
    textAlign: 'center',
  },
  promoIcon: {
    ...appStyles.appTitle,
    color: '#333',
    marginTop: 10,
    marginRight: 10,
    lineHeight: 35,
    fontSize: 35,
    flex: 1,
    textAlign: 'center',
  },
  button: {
    ...appStyles.justifyBetweenRow,
    margin: 15,
    marginTop: 5,
    borderRadius: 100,
    backgroundColor: '#f8cb16',
    width: constants.screen.width - 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.16,
    shadowRadius: 4,
    elevation: 4,
  },
  descriptionText: {
    color: '#000',
    fontSize: 17,
    lineHeight: 18,
    marginTop: 10,
    marginBottom: 5,
    marginHorizontal: 15,
  },
});
