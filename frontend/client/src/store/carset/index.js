import {carsetGetList, carsetGetById} from '../../api/carset';
import {CARSET_STATE_NAME} from './state-name';
import {
	CARSET_LIST_FETCH,
	CARSET_LIST_SET,
	CARSET_ITEM_FETCH,
	CARSET_ITEM_SET
} from './action-names';

const initialState = {
	[CARSET_STATE_NAME]: {
		list: [],
		item: null
	}
};

export default (store) => {
	store.on('@init', () => initialState);

	store.on(CARSET_LIST_SET, (state, carsets) => {
		return {
			[CARSET_STATE_NAME]: {...state[CARSET_STATE_NAME], list: carsets}
		};
	});

	store.on(CARSET_ITEM_SET, (state, carset) => {
		return {
			[CARSET_STATE_NAME]: {...state[CARSET_STATE_NAME], item: carset}
		};
	});

	store.on(CARSET_LIST_FETCH, async () => {
		try {
			const {data: carsets} = await carsetGetList();
			store.dispatch(CARSET_LIST_SET, carsets);
		} catch (err) {
			console.error(err);
		}
	});

	store.on(CARSET_ITEM_FETCH, async (_, carSetId) => {
		try {
			const {data: carset} = await carsetGetById(carSetId);
			store.dispatch(CARSET_ITEM_SET, carset);
		} catch (err) {
			console.error(err);
		}
	});
};
