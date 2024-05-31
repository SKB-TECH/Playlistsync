import { configureStore } from "@reduxjs/toolkit";
import userReducer from "@/settings/slices/user/index"
import sessionReducer from "@/settings/slices/session/index"
export function makeStore() {
    return configureStore({
        reducer: {
            userInfo: userReducer,
            session:sessionReducer
        },
    });
}

export const store = makeStore();
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;