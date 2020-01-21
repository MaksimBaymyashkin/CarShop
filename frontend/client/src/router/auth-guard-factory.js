import {AUTH_STATE_NAME} from '../store/auth/state-name';

export default function authGuardFactory(_, {store}) {
	return () => {
		const {[AUTH_STATE_NAME]: authState} = store.get();

		if (Boolean(authState.user)) {
			return Promise.resolve();
		}

		return Promise.reject({redirect: {name: 'auth'}});
	}
}
