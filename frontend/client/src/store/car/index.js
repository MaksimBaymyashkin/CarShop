import {carGetList} from '../../api/car';
import {CAR_STATE_NAME} from './state-name';
import {CAR_LIST_FETCH, CAR_LIST_SET} from './action-names';

const initialState = {
	[CAR_STATE_NAME]: {
		list: [],
		item: null
	}
};

export default (store) => {
	store.on('@init', () => initialState);

	store.on(CAR_LIST_SET, (state, cars) => {
		return {
			[CAR_STATE_NAME]: {...state[CAR_STATE_NAME], list: cars}
		};
	});

	store.on(CAR_LIST_FETCH, async (_, params) => {
		try {
			const {data: cars} = await carGetList(params);
			store.dispatch(CAR_LIST_SET, cars);
		} catch (err) {
			console.error(err);
		}
	});
};
