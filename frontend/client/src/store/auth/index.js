import {signIn, signOut} from '../../api/security';
import {AUTH_STATE_NAME} from './state-name';
import {AUTH_STATE_SET_USER, AUTH_STATE_SIGN_IN, AUTH_STATE_SIGN_OUT} from './action-names';

const initialState = {
	[AUTH_STATE_NAME]: {
		user: null
	}
};

export default (store) => {
	store.on('@init', () => initialState);

	store.on(AUTH_STATE_SET_USER, (state, user) => {
		return {
			[AUTH_STATE_NAME]: {...state[AUTH_STATE_NAME], user}
		};
	});

	store.on(AUTH_STATE_SIGN_IN, async (_, payload) => {
		try {
			const {data: user} = await signIn(payload);
			store.dispatch(AUTH_STATE_SET_USER, user);
		} catch (err) {
			console.error(err);
		}
	});

	store.on(AUTH_STATE_SIGN_OUT, async () => {
		try {
			await signOut();
			store.dispatch(AUTH_STATE_SET_USER, null);
		} catch (err) {
			console.error(err);
		}
	});
};
