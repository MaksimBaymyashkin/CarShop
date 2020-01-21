import {PROFILE_STATE_NAME} from './state-name';

const initialState = {
	[PROFILE_STATE_NAME]: {name: 'admin'}
};

export default (store) => {
	store.on('@init', () => initialState);
};
