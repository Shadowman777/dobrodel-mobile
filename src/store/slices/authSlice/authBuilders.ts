import {ActionReducerMapBuilder} from '@reduxjs/toolkit';
import {mmkvStorage} from 'utils/localStorage';

import {IAuthState} from 'store/slices/authSlice/authSlice';
import {
  getInitToken,
  getUser,
  linkTelegram,
  sendAuthSmsCode,
  unlinkTelegram,
} from 'store/slices/authSlice/authThunks';
import axios from 'axios';

export default function extraAuthBuilders(
  builder: ActionReducerMapBuilder<IAuthState>,
) {
  builder.addCase(getInitToken.fulfilled, (state, action) => {
    axios.defaults.headers.common['Application-token'] = action.payload;
    state.initToken = action.payload;
  });
  builder.addCase(sendAuthSmsCode.fulfilled, (state, action) => {
    state.user = {
      id: action.payload.id,
      phone: action.payload.phone,
      first_name: action.payload.first_name,
      last_name: action.payload.last_name,
      email: action.payload.email,
      status: action.payload.status,
      notifications_news: action.payload.notifications_news,
      notifications_order: action.payload.notifications_order,
    };

    if (action.payload?.show_telegram_popup === false) {
      state.isLogged = true;
    }

    const {token} = action.payload;

    if (token) {
      axios.defaults.headers.common.Authorization = `Bearer ${token}`;
      state.authToken = token;
      mmkvStorage.set('Authorization', token);
    }
  });
  builder.addCase(getUser.fulfilled, (state, action) => {
    state.user = action.payload;
    state.telegramLinked =
      action.payload?.telegram_linked ?? state.telegramLinked;
  });
  builder.addCase(linkTelegram.fulfilled, (state, action) => {
    state.telegramLink = action.payload;
  });
  builder.addCase(unlinkTelegram.fulfilled, (state, action) => {
    if (action.payload !== undefined && action.payload !== null) {
      state.telegramLinked = !action.payload;
    } else {
      state.telegramLinked = false;
    }
  });
}
