import api from './axios-module';

export async function typeGetList() {
	return api.get('/types');
}
