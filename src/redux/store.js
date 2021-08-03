import AsyncStorage from "@react-native-async-storage/async-storage"
import { createStore, applyMiddleware } from "redux"
import { persistStore, persistReducer } from "redux-persist"
import thunk from "redux-thunk"
import reducer from "./reducer"

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    whitelist: ['students']
}

const persistedReducer = persistReducer(persistConfig, reducer)

const Store = createStore(persistedReducer, applyMiddleware(thunk))
const Persistor = persistStore(Store)

export { Store, Persistor }