import './carset-list.css';
import React, {useEffect} from 'react';
import {Button} from 'react-bootstrap';
import {Link} from 'react-router5';
import CarSetCard from '../../components/carset-card';

import {ROUTE_CARSET_VIEW} from '../../router/route-names';

import useStoreon from 'storeon/react';
import {CARSET_STATE_NAME} from '../../store/carset/state-name';
import {CARSET_LIST_FETCH} from '../../store/carset/action-names';

function renderCarSet(carSetState) {
	const isAvailable = Boolean(carSetState)
		&& Boolean(carSetState.list)
		&& Boolean(carSetState.list.length);

	if (!isAvailable) {
		return null;
	}

	return carSetState.list.map((carset) => (
		<Link routeName={ROUTE_CARSET_VIEW}
					routeParams={{id: carset.id}}
					key={carset.id.toString()}
					className="carset-list__card">
			<CarSetCard carset={carset} />
		</Link>
	));
}

export default function CarSetList() {
	const {dispatch, [CARSET_STATE_NAME]: carSetState} = useStoreon(CARSET_STATE_NAME);

	useEffect(() => {
		dispatch(CARSET_LIST_FETCH);
	}, [dispatch]);

	return (
		<div className="carset-list">

			<div className="carset-list__header">
				<h1>Автомобили</h1>
				<Link routeName="main.carsets.create">
					<Button variant="primary" as="span">Создать список</Button>
				</Link>
			</div>

			<div className="carset-list__container">
				{ renderCarSet(carSetState) }
			</div>
		</div>
	);
}
