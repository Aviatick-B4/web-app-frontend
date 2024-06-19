import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { thunk } from "redux-thunk";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import searchFlightReducers from "./reducers/searchFlightReducers";
import promoReducers from "./reducers/promoReducers";
import favoriteDestination from "./reducers/favoriteDestinationReducers";
import authReducers from "./reducers/authReducers";
import historyReducers from "./reducers/historyReducers";
import notifReducers from "./reducers/notifReducers";

const rootReducer = combineReducers({
  auth: authReducers,
  search: searchFlightReducers,
  promo: promoReducers,
  favDestination: favoriteDestination,
  history: historyReducers,
  notif: notifReducers
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV === "development",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(thunk),
});

export const persistor = persistStore(store);
