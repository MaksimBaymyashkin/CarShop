import React, {useCallback, Fragment, useEffect} from 'react';
import {useRoute, Link} from 'react-router5';
import {Button, Navbar, Nav, Image} from "react-bootstrap";
import CarSetList from '../carset-list';
import CarSetEdit from '../carset-edit';
import CarSetView from '../carset-view';
import Carlist from '../carlist';
import CarlistView from '../carlist-view';
import './main.css';

import {
	ROUTE_AUTH,
	ROUTE_CARSET,
	ROUTE_CARSET_VIEW,
	ROUTE_CARSET_EDIT,
	ROUTE_CARSET_CREATE,
	ROUTE_CARLISTS, ROUTE_CARLISTS_VIEW
} from '../../router/route-names';

import useStoreon from 'storeon/react';
import {AUTH_STATE_NAME} from '../../store/auth/state-name';
import {AUTH_STATE_SIGN_OUT} from '../../store/auth/action-names';
import {TYPE_FETCH} from '../../store/type/action-names';

const renderPage = (routeName) => {
	switch (routeName) {
		case ROUTE_CARSET:
			return <CarSetList />;
		case ROUTE_CARSET_VIEW:
			return <CarSetView />;
		case ROUTE_CARSET_EDIT:
		case ROUTE_CARSET_CREATE:
			return <CarSetEdit />;
		case ROUTE_CARLISTS:
			return <Carlist />;
		case ROUTE_CARLISTS_VIEW:
			return <CarlistView />;
		default:
			return null;
	}
};

export default function Main() {
	const {router, route} = useRoute();
	const {dispatch, [AUTH_STATE_NAME]: auth} = useStoreon(AUTH_STATE_NAME);

	const logout = useCallback(() => {
		dispatch(AUTH_STATE_SIGN_OUT);
	}, [dispatch]);

	useEffect(() => {
		if (!Boolean(auth.user)) {
			router.navigate(ROUTE_AUTH);
		}
	}, [auth, router]);

	useEffect(() => {
		dispatch(TYPE_FETCH);
	}, [dispatch]);

	return (
		<Fragment>
			<Navbar bg="dark" variant="dark" style={{padding: '8px 20px'}}>
				<Navbar.Brand href="/" title="Car Shop">
					<Image src="/icons/android-icon-48x48.png" alt="Logo of Car Shop"/>
				</Navbar.Brand>
				<Nav className="mr-auto">
					<Link routeName={ROUTE_CARSET} className="nav-link">Автомобили</Link>
					<Link routeName={ROUTE_CARLISTS} className="nav-link">Корзина</Link>
				</Nav>
				<div className="nav-bar__profile">
					{/*<Image src="https://via.placeholder.com/48x48" roundedCircle/>*/}
					<span className="nav-bar__user-name">{Boolean(auth) && Boolean(auth.user) ? auth.user.name : ''}</span>

				</div>
			</Navbar>
			{
				renderPage(route.name)
			}
		</Fragment>
	);
}
/*<Button size="sm" variant="outline-light" onClick={logout}>Выход</Button>*/
