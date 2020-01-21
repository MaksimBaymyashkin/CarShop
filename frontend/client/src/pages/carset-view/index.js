import './carset-view.css';
import React, {useState, useCallback, useEffect} from 'react';
import {useRoute} from 'react-router5';
import {useGetCarset, useGetCarList} from '../../effects';
import CarSetEditHeader from '../../components/carset-edit-header';
import CarList from '../../components/car-list';
import CarlistAddCarForm from '../../components/carlist-add-car-form';
import {carlistSave} from '../../api/carlist';

import useStoreon from 'storeon/react';
import {TYPE_STATE_NAME} from '../../store/type/state-name';
import {CARLIST_STATE_NAME} from '../../store/carlist/state-name';
import {CARLIST_LIST_FETCH} from '../../store/carlist/action-names';

export default function CarSetView() {
	const {route} = useRoute();
	const carset = useGetCarset(route.params.id);
	const cars = useGetCarList(route.params.id);
	const {
		dispatch,
		[TYPE_STATE_NAME]: types,
		[CARLIST_STATE_NAME]: carlists
	} = useStoreon(TYPE_STATE_NAME, CARLIST_STATE_NAME);

	// Inner state
	const [state, setState] = useState({
		car: null,
		loadCarlists: 1
	});

	const addCarToCarlist = useCallback((carlist) => {
		if (!Boolean(state.car) || !Boolean(carlist)) {
			return setState({...state, car: null});
		}

		(carlist.carIds.indexOf(state.car.id) < 0
				? carlistSave({...carlist, carIds: [...carlist.carIds, state.car.id]})
				: Promise.resolve()
		).finally(() => setState({car: null, loadCarlists: state.loadCarlists + 1}));
	}, [state]);

	/** Загрузить список авто при старте экрана */
	useEffect(() => { dispatch(CARLIST_LIST_FETCH) }, [state.loadCarlists]);

	return (
		<div className='carset-view'>
			<CarSetEditHeader routeName={route.name} carset={carset} types={types}/>

			<div className='carset-view__container'>
				<CarList className='carset-view__car-list'
						 cars={cars}
						 likeCar={(t) => setState({...state, car: t})}/>
			</div>

			<CarlistAddCarForm car={state.car}
							   carlists={carlists.list}
							   isShow={Boolean(state.car)}
							   onClose={addCarToCarlist}/>
		</div>
	);
}
