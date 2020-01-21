import './carlist-view.css';
import React, {useCallback, useEffect, useState} from 'react';
import {Button} from "react-bootstrap";

import {useRoute} from 'react-router5';
import {ROUTE_CARLISTS} from '../../router/route-names';

import useStoreon from 'storeon/react';
import {CARLIST_STATE_NAME} from '../../store/carlist/state-name';
import {CARLIST_ITEM_FETCH, CARLIST_ITEM_SET, CARLIST_ITEM_REMOVE} from '../../store/carlist/action-names';
import {CAR_STATE_NAME} from '../../store/car/state-name';
import {CAR_LIST_FETCH, CAR_LIST_SET} from '../../store/car/action-names';
import CarCard from "../../components/car-card";

export default function CarlistView() {
	const {route, router} = useRoute();
	const [removed, setRemoved] = useState(false);
	const {
		dispatch,
		[CARLIST_STATE_NAME]: {item: carlist},
		[CAR_STATE_NAME]: {list: cars}
	} = useStoreon(CARLIST_STATE_NAME, CAR_STATE_NAME);

	/** Удалить авто */
	const removeHandler = useCallback(() => {
		dispatch(CARLIST_ITEM_REMOVE, carlist.id);
		setRemoved(true);
	}, [carlist]);

	/** Загрузить авто по id */
	useEffect(() => {
		if (Boolean(route.params.id)) {
			dispatch(CARLIST_ITEM_FETCH, route.params.id);
		}

		return () => dispatch(CARLIST_ITEM_SET, null);
	}, [route.params.id]);

	/** Загрузить авто из списка */
	useEffect(() => {
		const isAvailable = Boolean(carlist)
			&& Boolean(carlist.carIds)
			&& Boolean(carlist.carIds.length);

		if (isAvailable) {
			dispatch(CAR_LIST_FETCH, {ids: carlist.carIds.join(',')});
		}

		return () => dispatch(CAR_LIST_SET, []);
	}, [carlist]);

	/** Вернуться на предыдущий экран */
	useEffect(() => {
		if (removed && !Boolean(carlist)) {
			router.navigate(ROUTE_CARLISTS);
		}
	}, [removed, carlist]);

	return (
		<div className="carlist-view">

			<div className="carlist-view__header">
				<h1>{Boolean(carlist) && carlist.name}</h1>
				<Button className="carlist-view__header-remove-btn"
								variant="danger"
								onClick={removeHandler}>Удалить</Button>
			</div>

			<div className="carlist-view__container">
				<div className="carlist-view__car-list">
					{
						cars.map(
							(t, i) => (
								<div key={i} className="carlist-view__car-list-row">
									<CarCard car={t} number={i + 1}/>
								</div>
							)
						)
					}
				</div>
			</div>
		</div>
	);
}
