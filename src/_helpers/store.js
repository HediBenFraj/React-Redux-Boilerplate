import { createStore,compose, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import rootReducer from '../_reducers';
import { composeWithDevTools } from  'redux-devtools-extension'
import storage from 'redux-persist/lib/storage';
import { persistStore, persistReducer } from 'redux-persist';

const loggerMiddleware = createLogger();

/**
 * This is the store creator helper 
 * where we assign the reducers that access the redux store and the middlewares called in every action
  * @exports Helpers__Store-Creator
 */

const persistConfig = {
    key: 'root',
    storage: storage
  };
 
  const pReducer = persistReducer(persistConfig, rootReducer);
  
const store = createStore(
    pReducer,
    compose(applyMiddleware(thunkMiddleware),applyMiddleware(loggerMiddleware),composeWithDevTools())

);

//test


const persistor = persistStore(store);

export  {store,persistor}
