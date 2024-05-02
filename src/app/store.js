import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';

import { homeSlice } from './redux/home.slice';

export const store = configureStore({
  reducer: { [homeSlice.reducerPath]: homeSlice.reducer },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(homeSlice.middleware),
  devTools: 'development',
});

setupListeners(store.dispatch);
