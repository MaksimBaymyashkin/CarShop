import createRouter from 'router5'
import browserPlugin from 'router5-plugin-browser';
import loggerPlugin from 'router5-plugin-logger';
import lazyLoadMiddleware from './lasy-load-middleware';
import routes from './routes';
import store from '../store';

const routerOptions = {allowNotFound: true};
const routerDependencies = {store};

export default function configureRouter() {
	const router = createRouter(
		routes,
		routerOptions,
		routerDependencies
	);

	router.usePlugin(
		loggerPlugin,
		browserPlugin({useHash: false})
	);

	router.useMiddleware(
		lazyLoadMiddleware(routes)
	);

	return router;
}
