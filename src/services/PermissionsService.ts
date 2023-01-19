import {Platform} from 'react-native';
import {check, request, PERMISSIONS} from 'react-native-permissions';

import DropdownAlertService from 'services/DropdownAlertService';

export default class PermissionsService {
  static async checkLocationPermissions(): Promise<string> {
    const permissions =
      Platform.OS === 'ios'
        ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
        : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION;
    return await check(permissions);
  }
  static async requestLocationPermissions(): Promise<string | undefined> {
    const permissions =
      Platform.OS === 'ios'
        ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
        : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION;
    try {
      return await request(permissions);
    } catch (error) {
      DropdownAlertService.alert('error', error);
    }
  }
}
