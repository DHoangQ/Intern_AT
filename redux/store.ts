import { configureStore } from '@reduxjs/toolkit';
import {persistStore, persistReducer,FLUSH,REHYDRATE,PAUSE,PERSIST,PURGE,REGISTER} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import accountReducer from './accountSlice';
import caseStudyReducer from './caseStudySlice';
export const store = configureStore({
    reducer: {
        account: accountReducer,
        caseStudy: caseStudyReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

const persistConfig = {
    key: 'root',
    version: 1,
    storage: AsyncStorage,
    whitelist: ['caseStudy', 'comments']
};
const persistedReducer = persistReducer(persistConfig, caseStudyReducer);
export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;