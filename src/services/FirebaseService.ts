import {Platform} from 'react-native';
import {Dispatch} from 'redux';
import messaging from '@react-native-firebase/messaging';
import {getUniqueId} from 'react-native-device-info';

import {getInitToken} from 'store/slices/authSlice/authThunks';

export default class FirebaseService {
  static async requestPermissions(dispatch: Dispatch<any>): Promise<void> {
    const permissionsStatus = await messaging().requestPermission();
    if (
      permissionsStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      permissionsStatus === messaging.AuthorizationStatus.PROVISIONAL
    ) {
      await this.getFirebaseToken(dispatch);
    } else {
      const deviceId = getUniqueId();
      const payload = {
        device_id: deviceId,
        device_token: 'test',
        device_name: 'test',
        device_type: Platform.OS,
      };

      dispatch(getInitToken(payload));
    }
  }

  public static async getFirebaseToken(dispatch: Dispatch<any>): Promise<void> {
    const deviceId = getUniqueId();
    const firebaseToken = await messaging().getToken();
    const payload = {
      device_id: deviceId,
      device_token: 'test',
      device_name: 'test',
      device_type: Platform.OS,
      ...(firebaseToken ? {firebase_token: firebaseToken} : {}),
    };

    dispatch(getInitToken(payload));
  }
}
