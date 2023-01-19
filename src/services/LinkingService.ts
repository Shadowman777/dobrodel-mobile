import {Linking, Platform} from 'react-native';
import DropdownAlertService from 'services/DropdownAlertService';

class LinkingService {
  public static async goToUrl(
    url: string,
    showWarning: boolean = true,
  ): Promise<boolean> {
    try {
      if (await Linking.canOpenURL(url)) {
        await Linking.openURL(url);
        return true;
      }
    } catch (e) {
      if (showWarning) {
        DropdownAlertService.alert('error', 'Невозможно перейти по ссылке');
      }
    }

    return false;
  }

  static async buildRoute(
    coordinates: string | null,
    userCoordinates: string | null,
    pointAddress: string | null,
  ): Promise<void> {
    if (!coordinates) return;

    if (Platform.OS === 'android') {
      await this.goToUrl(`geo:${coordinates}`);
    } else {
      if (!userCoordinates) return;

      const splittedCoords = coordinates.split(',');
      const reversedUserCoords = userCoordinates.split(',').reverse().join(',');
      const reversedCoords = splittedCoords.reverse().join(',');

      const canGoToYandexMaps = await this.goToUrl(
        `yandexmaps://maps.yandex.ru/?rtext=${reversedUserCoords}~${coordinates}&rtt=pd&z=12`,
        false,
      );
      if (canGoToYandexMaps) return;

      const canGoToYandexNavigator = await this.goToUrl(
        `yandexnavi://build_route_on_map?lat_to=${splittedCoords?.[1]}&lon_to=${splittedCoords?.[0]}`,
        false,
      );
      if (canGoToYandexNavigator) return;

      const canGoToTwoGis = await this.goToUrl(
        `dgis://2gis.ru/routeSearch/rsType/car/to/${reversedCoords}`,
        false,
      );
      if (canGoToTwoGis) return;

      const canGoToAppleMaps = await this.goToUrl(
        `maps://?daddr="${pointAddress}"&dirflg=d`,
        false,
      );
      if (canGoToAppleMaps) return;

      DropdownAlertService.alert('error', 'Невозможно построить маршрут');
    }
  }
}

export default LinkingService;
