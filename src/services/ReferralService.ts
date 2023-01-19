import {Platform} from 'react-native';
import {Dispatch} from 'redux';
import {PlayInstallReferrer} from 'react-native-play-install-referrer';
import AppsFlyer from 'react-native-appsflyer';

import {setReferrer} from 'store/slices/authSlice/authSlice';

class ReferralService {
  static getReferrer(dispatch: Dispatch): void {
    Platform.OS === 'android'
      ? this.getAndroidReferrer(dispatch)
      : this.getIosReferrer(dispatch);
  }

  private static getAndroidReferrer(dispatch: Dispatch): void {
    PlayInstallReferrer.getInstallReferrerInfo((installReferrerInfo, error) => {
      if (!error) {
        dispatch(setReferrer(installReferrerInfo?.installReferrer ?? ''));
      }
    });
  }

  private static getIosReferrer(dispatch: Dispatch): void {
    let referrer = '';

    AppsFlyer.onAppOpenAttribution(data => {
      if (data.status === 'success' && data.type === 'onAppOpenAttribution') {
        const attributionData = data.data;
        if (attributionData.campaign.length > 0) {
          referrer += `?utm_campaign=${attributionData.campaign}`;
        }
        if (attributionData.media_source.length > 0) {
          referrer += `${referrer.length > 0 ? '&' : '?'}utm_source=${
            attributionData.media_source
          }`;
        }
      }
    });

    dispatch(setReferrer(referrer));
  }
}

export default ReferralService;
