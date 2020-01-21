import api from './axios-module';
const URL = '/cars';

export function carGetList(params = {}, cancelToken) {
	return api.get(URL, {params, cancelToken});
}

export function carSave(car, cancelToken) {
	if (Boolean(car.id)) {
		return api.put(`${URL}/${car.id}`, car, {cancelToken});
	}

	return api.post(URL, car, {cancelToken});
}

export function carRemove(id) {
	return api.delete(`${URL}/${id}`);
}
