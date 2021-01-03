import React from 'react';
import ReactDOM from 'react-dom';
import { createBrowserHistory } from "history";

/* redux module */
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import LikeLoveReducer from './store/reducers/reducers';
/* redux persist */
import { persistStore, persistReducer } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import storage from 'redux-persist/lib/storage';

import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

/* redux store */

const persistConfig = {
  key: 'root',
  storage,
}

const rootReducer = combineReducers({
	llr: LikeLoveReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(persistedReducer);

const persistor = persistStore(store);

/* Make histroy.push to re-render */
const history = createBrowserHistory({ forceRefresh: true })

ReactDOM.render(
	<React.StrictMode>
    	<Provider store={store}>
			<PersistGate loading={null} persistor={persistor} >
				<App history={history}/>
			</PersistGate>
		</Provider>
	</React.StrictMode>,
	document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
