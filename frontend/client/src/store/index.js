import createStore from 'storeon';
import auth from './auth';
import profile from './profile';
import type from './type';
import carset from './carset';
import carlist from './carlist';
import car from './car';

export default createStore([
	auth,
	profile,
	type,
	carset,
	carlist,
	car,
	process.env.NODE_ENV !== 'production' && require('storeon/devtools')
]);
