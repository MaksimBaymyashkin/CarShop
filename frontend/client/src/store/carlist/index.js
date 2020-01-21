import {carlistGetList, carlistSave, carlistGetById, carlistRemove} from '../../api/carlist';
import {CARLIST_STATE_NAME} from './state-name';
import {
	CARLIST_LIST_FETCH,
	CARLIST_LIST_SET,
	CARLIST_ITEM_SAVE,
	CARLIST_ITEM_SET,
	CARLIST_ITEM_FETCH,
	CARLIST_ITEM_REMOVE
} from './action-names';

const initialState = {
	[CARLIST_STATE_NAME]: {
		list: [],
		item: null
	}
};

export default (store) => {
	store.on('@init', () => initialState);

	store.on(CARLIST_LIST_SET, (state, carlists) => {
		return {
			[CARLIST_STATE_NAME]: {...state[CARLIST_STATE_NAME], list: carlists}
		};
	});

	store.on(CARLIST_ITEM_SET, (state, carlist) => {
		return {
			[CARLIST_STATE_NAME]: {...state[CARLIST_STATE_NAME], item: carlist}
		};
	});

	store.on(CARLIST_LIST_FETCH, async () => {
		try {
			const {data: carlists} = await carlistGetList();
			store.dispatch(CARLIST_LIST_SET, carlists);
		} catch (err) {
			console.error(err);
		}
	});

	store.on(CARLIST_ITEM_SAVE, async (_, carlist) => {
		try {
			const {data: updated} = await carlistSave(carlist);
			store.dispatch(CARLIST_ITEM_SET, updated);
		} catch (err) {
			console.error(err);
		}
	});

	store.on(CARLIST_ITEM_FETCH, async (_, id) => {
		try {
			const {data: carlist} = await carlistGetById(id);
			store.dispatch(CARLIST_ITEM_SET, carlist);
		} catch (err) {
			console.error(err);
		}
	});

	store.on(CARLIST_ITEM_REMOVE, async (_, id) => {
		try {
			await carlistRemove(id);
			store.dispatch(CARLIST_ITEM_SET, null);
		} catch (err) {
			console.error(err);
		}
	});
};
