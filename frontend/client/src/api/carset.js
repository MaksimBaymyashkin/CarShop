import api from './axios-module';
const URL = '/carsets';

export function carsetGetList() {
	return api.get(URL);
}

export function carsetGetById(id, cancelToken) {
	return api.get(`${URL}/${id}`, {cancelToken});
}

export function carsetSave(carset, cancelToken) {
	if (Boolean(carset.id)) {
		return api.put(`${URL}/${carset.id}`, carset, {cancelToken});
	}

	return api.post(URL, carset, {cancelToken});
}
