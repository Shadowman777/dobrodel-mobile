import React from 'react';
import {View, ScrollView, Text, StyleSheet} from 'react-native';

import ActionItem from './components/ActionItem/ActionItem';

import {Action} from 'types/actions/actionsTypes';

import appStyles from 'assets/styles/appStyles';

const ActionsSection: React.FC<{actions: Action[]}> = ({actions}) => {
  if (!actions || actions.length === 0) {
    return null;
  }

  return (
    <View>
      <View style={appStyles.appSectionHeader}>
        <Text style={appStyles.appSectionTitle}>Акции</Text>
      </View>
      <ScrollView
        horizontal
        bounces={false}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.actionsContainer}>
        {actions.map(action => (
          <ActionItem action={action} key={action.id.toString()} />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  actionsContainer: {
    ...appStyles.row,
    flexWrap: 'wrap',
    paddingLeft: 6,
    paddingBottom: 12,
  },
});

export default React.memo(ActionsSection);
