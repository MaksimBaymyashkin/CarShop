import {constants} from "router5";
import transitionPath from 'router5-transition-path';

export default function lazyLoadMiddleware(routes) {
	return (router) => (toState, fromState, done) => {
		const {toActivate} = transitionPath(toState, fromState);
		const moduleName = toActivate[0] !== constants.UNKNOWN_ROUTE ? toActivate[0] : 'not-found';
		const route = routes.find((r) => r.name === moduleName);

		if (Boolean(route) && typeof route.loadComponent === 'function') {
			return route.loadComponent();
		}

		done();
	};
}
