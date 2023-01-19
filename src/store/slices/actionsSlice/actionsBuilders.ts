import {ActionReducerMapBuilder} from '@reduxjs/toolkit';

import {IActionsState} from 'store/slices/actionsSlice/actionsSlice';
import {
  getActions,
  getAction,
  getActionProducts,
} from 'store/slices/actionsSlice/actionsThunks';

export default function actionsBuilders(
  builder: ActionReducerMapBuilder<IActionsState>,
) {
  builder.addCase(getActions.fulfilled, (state, action) => {
    state.actions = action.payload || [];
  });
  builder.addCase(getAction.fulfilled, (state, action) => {
    state.action = action.payload || null;
  });
  builder.addCase(getActionProducts.fulfilled, (state, action) => {
    state.actionProducts = action.payload || [];
  });
}
