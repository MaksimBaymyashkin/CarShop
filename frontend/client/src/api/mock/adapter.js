import MockAdapter from 'axios-mock-adapter';
import {TYPES} from './data/types';
import {CARSETS} from './data/carsets';
import {CARS} from './data/cars';
import {CARLISTS} from './data/carlists';

const CARSET_ID_PATTERN = /(\/carsets\/)(\d+)$/;
const CAR_ID_PATTERN = /(\/cars\/)(\d+)$/;
const CARLIST_ID_PATTERN = /(\/carlists\/)(\d+)$/;
const mock = new MockAdapter();

// Config delay
mock.delayResponse = 200;

// Types
mock.onGet('/types').reply(200, TYPES);

// CarSet
mock.onGet('/carsets').reply(200, CARSETS);
mock.onGet(CARSET_ID_PATTERN).reply((config) => {
	const matches = config.url.match(CARSET_ID_PATTERN);
	const id = Boolean(matches) ? parseInt(matches[matches.length - 1], 10) : 0;
	const carset = !isNaN(id) && id > 0 ? CARSETS[id-1] : null;

	return [200, carset];
});
mock.onPut(CARSET_ID_PATTERN).reply((config) => [200, config.data]);
mock.onPost('/carsets').reply((config) => {
	const data = typeof config.data === 'string' ? JSON.parse(config.data) : config.data;
	const carset = {...data, id: CARSETS.length + 1};
	CARSETS.push(carset);

	return [200, carset];
});

// Carlists
mock.onGet('/carlists').reply(200, CARLISTS);
mock.onGet(CARLIST_ID_PATTERN).reply((config) => {
	const matches = config.url.match(CARLIST_ID_PATTERN);
	const id = Boolean(matches) ? parseInt(matches[matches.length - 1], 10) : 0;
	const carlist = !isNaN(id) && id > 0 ? CARLISTS[id-1] : null;

	return [200, carlist];
});
mock.onPut(CARLIST_ID_PATTERN).reply((config) => {
	const data = typeof config.data === 'string' ? JSON.parse(config.data) : config.data;
	const matches = config.url.match(CARLIST_ID_PATTERN);
	const id = Boolean(matches) ? parseInt(matches[matches.length - 1], 10) : 0;

	if (!isNaN(id) && id > 0) {
		let index = CARLISTS.length;
		let flag = false;

		while (index--) {
			if (CARLISTS[index].id === id) {
				flag = true;
				break;
			}
		}

		if (flag) {
			CARLISTS.splice(index, 1, data);
		}
	}

	return [200, data];
});
mock.onDelete(CARLIST_ID_PATTERN).reply((config) => {
	const matches = config.url.match(CARLIST_ID_PATTERN);
	const id = Boolean(matches) ? parseInt(matches[matches.length - 1], 10) : 0;

	if (!isNaN(id) && id > 0) {
		let index = CARLISTS.length;
		let flag = false;

		while (index--) {
			if (CARLISTS[index].id === id) {
				flag = true;
				break;
			}
		}

		if (flag) {
			CARLISTS.splice(index, 1);
		}
	}

	return [200];
});
mock.onPost('/carlists').reply((config) => {
	const data = typeof config.data === 'string' ? JSON.parse(config.data) : config.data;
	const carlist = {...data, id: CARLISTS.length + 1};
	CARLISTS.push(carlist);

	return [200, carlist];
});

// Car
mock.onGet('/cars').reply(200, CARS);
mock.onPost('/cars').reply((config) => {
	const data = typeof config.data === 'string' ? JSON.parse(config.data) : config.data;
	const car = {...data, id: CARS.length + 1};
	CARS.push(car);

	return [200, car];
});
mock.onDelete(CAR_ID_PATTERN).reply((config) => {
	const matches = config.url.match(CAR_ID_PATTERN);
	const id = Boolean(matches) ? parseInt(matches[matches.length - 1], 10) : 0;

	if (!isNaN(id)) {
		let index = CARS.length;
		let flag = false;

		while (index--) {
			if (CARS[index].id === id) {
				flag = true;
				break;
			}
		}

		if (flag) {
			CARS.splice(index, 1);
		}
	}

	return [200];
});

export default mock.adapter();
