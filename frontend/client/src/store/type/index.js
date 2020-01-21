import {TYPE_STATE_NAME} from './state-name';
import {TYPE_FETCH, TYPE_SET} from './action-names';
import {typeGetList} from '../../api/type';

const initialState = {
	[TYPE_STATE_NAME]: []
};

export default (store) => {
	store.on('@init', () => initialState);

	store.on(TYPE_SET, (_, types) => {
		return {[TYPE_STATE_NAME]: types};
	});

	store.on(TYPE_FETCH, async () => {
		try {
			const {data: types} = await typeGetList();
			store.dispatch(TYPE_SET, types);
		} catch (err) {
			console.error(err);
		}
	});
};
