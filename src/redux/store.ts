import { configureStore } from '@reduxjs/toolkit';
import dashboardReducer from './slices/dashboard';
import gameReducer from './slices/game';

const store = configureStore({
    reducer: {
        dashboard: dashboardReducer,
        game: gameReducer
    }
})

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;