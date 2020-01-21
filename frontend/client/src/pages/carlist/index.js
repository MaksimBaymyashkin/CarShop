import './carlist.css';
import React, {useCallback, useEffect, useState} from 'react';
import {Link} from "react-router5";
import {Button} from "react-bootstrap";
import CarSetCard from '../../components/carset-card';
import CarlistCreateForm from '../../components/carlist-create-form';
import {carlistSave} from '../../api/carlist';

import {ROUTE_CARLISTS_VIEW} from '../../router/route-names';

import useStoreon from 'storeon/react';
import {CARLIST_STATE_NAME} from '../../store/carlist/state-name';
import {CARLIST_LIST_FETCH} from '../../store/carlist/action-names';

function renderCards(carlistState) {
	const isAvailable = Boolean(carlistState)
		&& Boolean(carlistState.list)
		&& Boolean(carlistState.list.length);

	if (!isAvailable) {
		return null;
	}

	return carlistState.list.map((carlist) => (
		<Link routeName={ROUTE_CARLISTS_VIEW}
					routeParams={{id: carlist.id}}
					key={carlist.id.toString()}
					className="carlist__card">
			<CarSetCard carset={carlist} />
		</Link>
	));
}

export default function Carlist() {
	const {dispatch, [CARLIST_STATE_NAME]: carlistState} = useStoreon(CARLIST_STATE_NAME);
	const [state, setState] = useState({
		showModal: false,
		loadCarlist: 1
	});

	const createCarlist = useCallback((name) => {
		if (Boolean(name)) {
			return carlistSave({name, carIds: []})
				.finally(() => setState({showModal: false, loadCarlist: state.loadCarlist + 1}))
		}

		setState({...state, showModal: false});
	}, [state]);

	/** Загрузить список авто */
	useEffect(() => { dispatch(CARLIST_LIST_FETCH) }, [state.loadCarlist]);

	return (
		<div className="carlist">

			<div className="carlist__header">
				<h1>Корзина</h1>
				<Button variant="primary" onClick={() => setState({...state, showModal: true})}>Список покупок</Button>
			</div>

			<div className="carlist__container">
				{ renderCards(carlistState) }
			</div>

			<CarlistCreateForm isShow={state.showModal} onClose={createCarlist} />
		</div>
	);
}
