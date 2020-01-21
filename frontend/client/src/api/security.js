import api from './axios-module';
const URL = '/auth';
/**
 * Авторизовать пользователя
 */
export function signIn(payload) {
	if (Boolean(payload)) {
		const token = btoa(`${payload.login}:${payload.password}`);

		return api.get(`${URL}/info`, {
			headers: {
				Authorization: `Basic ${token}`
			}
		});
	}

	return api.get(`${URL}/info`);
}

export function signOut() {
	return api.get('/logout', {baseURL: ''})
		.then(() => {
			api.headers = {...api.headers, Authorization: undefined};
		});
}
