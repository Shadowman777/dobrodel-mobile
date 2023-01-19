import React from 'react';
import {View, Text, Dimensions, StyleSheet, StatusBar} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import EditProfileForm from 'components/form/EditProfileForm/EditProfileForm';

import {useAppSelector} from 'hooks/appHooks';

import {formatPhoneNumber} from 'utils/helpers';

import appStyles from 'assets/styles/appStyles';
import constants from 'assets/styles/constants';

const {width} = Dimensions.get('window');

const ProfileEditForm = () => {
  const settings = useAppSelector(state => state.main.settings);
  const user = useAppSelector(state => state.auth.user);

  if (!settings || !user) {
    return null;
  }

  return (
    <View style={appStyles.alignCenter}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />

      <View style={{width: width * 0.9, marginTop: 30}}>
        <View style={[appStyles.justifyBetweenRow, appStyles.alignCenter]}>
          <Text style={styles.phoneText}>{formatPhoneNumber(user.phone)}</Text>
          <Ionicons
            name="ios-checkmark-sharp"
            size={22}
            color={constants.colors.primaryText}
          />
        </View>
        <EditProfileForm settings={settings} user={user} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  phoneText: {
    color: constants.colors.primaryText,
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 17,
  },
});

export default ProfileEditForm;
