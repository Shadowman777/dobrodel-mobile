import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import HeaderRightDemo from 'components/headers/HeaderRightDemo/HeaderRightDemo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {useAppSelector} from 'hooks/appHooks';

import Search from 'assets/icons/search.svg';

import appStyles from 'assets/styles/appStyles';
import styles from './styles';

const HeaderRight: React.FC<{feedbackShown?: boolean}> = ({feedbackShown}) => {
  const settings = useAppSelector(state => state.main.settings);

  const navigation = useNavigation();

  return (
    <View style={[appStyles.row, appStyles.alignCenter]}>
      {settings && settings.demo_mode ? <HeaderRightDemo /> : null}
      {feedbackShown ? (
        <TouchableOpacity
          onPress={() => navigation.navigate('Feedback')}
          style={styles.headerRightButton}>
          <MaterialCommunityIcons name="face-agent" size={28} />
        </TouchableOpacity>
      ) : null}
      <TouchableOpacity
        onPress={() => navigation.navigate('Search')}
        style={styles.headerRightButton}>
        <Search height={28} width={28} />
      </TouchableOpacity>
    </View>
  );
};

export default HeaderRight;
