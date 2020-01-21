import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import StoreContext from 'storeon/react/context';
import store from './store';

import {RouterProvider} from 'react-router5';
import createRouter from './router/create-router';

const router = createRouter();
const appWrapper = (
	<StoreContext.Provider value={store}>
		<RouterProvider router={router}>
			<App />
		</RouterProvider>
	</StoreContext.Provider>
);

router.start(() => {
	ReactDOM.render(appWrapper, document.getElementById('root'));
});

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
process.env.NODE_ENV === 'production'
	? serviceWorker.register()
	: serviceWorker.unregister();
