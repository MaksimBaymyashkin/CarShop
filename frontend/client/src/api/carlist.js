import api from './axios-module';
const URL = '/carlists';

export function carlistGetList() {
	return api.get(URL);
}

export function carlistGetById(id, cancelToken) {
	return api.get(`${URL}/${id}`, {cancelToken});
}

export function carlistSave(carlist, cancelToken) {
	if (Boolean(carlist.id)) {
		return api.put(`${URL}/${carlist.id}`, carlist, {cancelToken});
	}

	return api.post(URL, carlist, {cancelToken});
}

export function carlistRemove(id) {
	return api.delete(`${URL}/${id}`);
}
