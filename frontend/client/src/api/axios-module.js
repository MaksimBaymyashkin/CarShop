// import axiosMockAdapter from './mock/adapter';
import axios from 'axios';
import store from '../store';
// import {AUTH_STATE_NAME} from "../store/auth/state-name";
import {AUTH_STATE_SIGN_OUT} from '../store/auth/action-names';

const axiosModule = axios.create({
	// Удалить при работе с реальным API сервисом
	// adapter: axiosMockAdapter,
	baseURL: '/api',
	headers: {
		'Accept': 'application/json'
	}
});

// axiosModule.interceptors.request.use((config) => {
// 	const {[AUTH_STATE_NAME]: authState} = store.get();
//
// 	if (!Boolean(authState) || !Boolean(authState.user)) {
// 		return config;
// 	}
//
// 	// config.headers['Authorization'] = authState.token;
// 	// config.params = {...config.params, user_id: authState.user.id};
//
// 	return config;
// });

axiosModule.interceptors.response.use(
	(res) => {
		if (res.status === 401 || res.status === 403) {
			store.dispatch(AUTH_STATE_SIGN_OUT);
		}

		return res;
	},
	(err) => {
		store.dispatch(AUTH_STATE_SIGN_OUT);

		return err;
	}
);

export default axiosModule;
