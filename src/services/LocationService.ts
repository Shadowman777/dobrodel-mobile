import {Alert} from 'react-native';
import {openSettings, RESULTS} from 'react-native-permissions';

import PermissionsService from 'services/PermissionsService';

export default class LocationService {
  static async followUserLocation(getCurrentLocation: any): Promise<void> {
    const permissionsStatus =
      await PermissionsService.checkLocationPermissions();
    if (permissionsStatus === RESULTS.GRANTED) {
      getCurrentLocation();
    } else if (permissionsStatus === RESULTS.DENIED) {
      const request = await PermissionsService.requestLocationPermissions();
      if (request && request === RESULTS.GRANTED) {
        getCurrentLocation();
      }
    } else if (permissionsStatus === RESULTS.BLOCKED) {
      Alert.alert(
        'Нет разрешения на использование геолокации',
        'Хотите перейти в настройки и дать разрешение?',
        [
          {text: 'Да', onPress: async () => await openSettings()},
          {text: 'Нет', onPress: () => console.log('...')},
        ],
      );
    }
  }
}
