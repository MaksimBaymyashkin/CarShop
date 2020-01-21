import authGuardFactory from './auth-guard-factory';
import {
	ROUTE_AUTH,
	ROUTE_NOT_FOUND,
	ROUTE_MAIN,
	ROUTE_CARSET,
	ROUTE_CARSET_VIEW,
	ROUTE_CARSET_EDIT,
	ROUTE_CARSET_CREATE,
	ROUTE_CARLISTS,
	ROUTE_CARLISTS_VIEW
} from './route-names';

export default [
	// Auth
	{
		name: ROUTE_AUTH,
		path: '/auth',
		loadComponent: () => import('../pages/auth')
	},

	// Not found
	{
		name: ROUTE_NOT_FOUND,
		path: '/not-found',
		loadComponent: () => import('../pages/not-found')
	},

	// App container for authorized users
	{
		name: ROUTE_MAIN,
		path: '/',
		forwardTo: ROUTE_CARSET,
		canActivate: authGuardFactory,
		loadComponent: () => import('../pages/main')
	},

	// CarSet module
	{name: ROUTE_CARSET, path: 'carsets'},
	{name: ROUTE_CARSET_VIEW, path: '/view/:id'},
	{name: ROUTE_CARSET_EDIT, path: '/edit/:id'},
	{name: ROUTE_CARSET_CREATE, path: '/create'},

	// Carlists module
	{name: ROUTE_CARLISTS, path: 'carlists'},
	{name: ROUTE_CARLISTS_VIEW, path: '/view/:id'}
];
