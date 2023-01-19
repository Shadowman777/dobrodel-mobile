import React from 'react';
import {TouchableOpacity} from 'react-native';
import {Portal} from '@gorhom/portal';

import MapArrow from 'assets/icons/mapArrow.svg';

import styles from './styles';

const UserLocationButton: React.FC<{
  followUserLocation: () => Promise<void>;
}> = ({followUserLocation}) => {
  return (
    <Portal>
      <TouchableOpacity
        onPress={followUserLocation}
        style={styles.buttonContainer}>
        <MapArrow height={30} width={30} style={{top: 2, left: -0.5}} />
      </TouchableOpacity>
    </Portal>
  );
};

export default UserLocationButton;
