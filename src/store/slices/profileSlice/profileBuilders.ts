import {ActionReducerMapBuilder} from '@reduxjs/toolkit';

import {IProfileState} from 'store/slices/profileSlice/profileSlice';
import {
  finishOrder,
  getOrder,
  getOrderUrl,
  getOrders,
  getOrdersInfo,
  getOrderEvaluationQuestions,
  getRoute,
  getInviteCode,
  startOrder,
  evaluateOrder,
} from 'store/slices/profileSlice/profileThunks';

export default function profileBuilders(
  builder: ActionReducerMapBuilder<IProfileState>,
) {
  builder.addCase(startOrder.fulfilled, (state, action) => {
    state.isOrderStarted = action.payload;
  });
  builder.addCase(finishOrder.fulfilled, (state, action) => {
    state.paymentUrl = action.payload ? action.payload.payment_url : '';
    state.lastOrderId = action.payload ? action.payload.order_id : '';
    state.isOrderStarted = false;
  });
  builder.addCase(evaluateOrder.fulfilled, (state, action) => {
    state.evaluationFinished = action.payload || false;
  });
  builder.addCase(getOrders.fulfilled, (state, action) => {
    state.orders = action.payload || [];
  });
  builder.addCase(getOrdersInfo.fulfilled, (state, action) => {
    state.isDeliveryOrders = action.payload
      ? action.payload.delivery_orders
      : false;
    state.isPayOrders = action.payload ? action.payload.pay_orders : false;
    state.payOrdersInfo = action.payload ? action.payload.pay_orders_info : '';
  });
  builder.addCase(getOrderEvaluationQuestions.fulfilled, (state, action) => {
    state.evaluationQuestions = action.payload || [];
  });
  builder.addCase(getOrder.fulfilled, (state, action) => {
    state.order = action.payload || null;
  });
  builder.addCase(getInviteCode.fulfilled, (state, action) => {
    state.inviteData = action.payload || null;
  });
  builder.addCase(getOrderUrl.fulfilled, (state, action) => {
    state.paymentUrl = action.payload || '';
  });
  builder.addCase(getRoute.fulfilled, (state, action) => {
    state.routeGeometry = action.payload || null;
  });
}
