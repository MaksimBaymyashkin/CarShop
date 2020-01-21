import './carset-edit.css';
import React, {useCallback, useEffect, useState} from 'react';
import {useRoute} from 'react-router5';
import {Button} from 'react-bootstrap';
import {carsetSave} from '../../api/carset';
import {carSave, carRemove} from '../../api/car';
import {useGetCarset, useGetCarList} from '../../effects';
import CarList from '../../components/car-list';
import CarSetForm from '../../components/carset-form';
import CarModalForm from '../../components/car-modal-form';
import CarSetEditHeader from '../../components/carset-edit-header';

import {
	ROUTE_CARSET,
	ROUTE_CARSET_VIEW,
	ROUTE_CARSET_EDIT,
	ROUTE_CARSET_CREATE
} from '../../router/route-names';

import useStoreon from 'storeon/react';
import {TYPE_STATE_NAME} from '../../store/type/state-name';

const saveCarSet = (carset, newCars, carsForRemove) => {
	return carsetSave(carset)
		.then(({data: a}) => {
			return Promise.all(newCars.map((t) => (t.carSetId = a.id, carSave(t))));
		})
		.then(() => {
			return Promise.all(carsForRemove.map((t) => carRemove(t.id)));
		});
};

export default function CarSetEdit() {
	const {route, router} = useRoute();
	const carset = useGetCarset(route.params.id);
	const fetchedCars = useGetCarList(route.params.id);
	const {[TYPE_STATE_NAME]: types} = useStoreon(TYPE_STATE_NAME);

	// Inner State
	const [state, setState] = useState({
		isSubmittingForm: false,
		isShowModal: false,
		form: Boolean(carset) ? {...carset} : null,
		cars: [...fetchedCars],
		newCars: [],
		removingCars: []
	});

	/** Перейти к предыдущему экрану */
	const goBack = useCallback(() => {
		if (route.name === ROUTE_CARSET_EDIT) {
			router.navigate(ROUTE_CARSET_VIEW, {id: route.params.id});
		} else if (route.name === ROUTE_CARSET_CREATE) {
			router.navigate(ROUTE_CARSET);
		}
	}, [route, router]);

	/** Инициировать эффект сохранения альбома */
	const onSave = useCallback(() => {
		setState({...state, isSubmittingForm: !state.isSubmittingForm});
	}, [state]);

	/** Добавить в массив новых авто новый */
	const onCloseModal = useCallback((newCar) => {
		setState({
			...state,
			isShowModal: !state.isShowModal,
			newCars: Boolean(newCar) ? [...state.newCars, newCar] : state.newCars
		});
	}, [state]);

	/** Удаление авто */
	const onRemoveCar = useCallback((cars, index) => {
		if (!Boolean(cars.id)) {
			state.newCars.splice(index, 1);
			setState({...state, newCars: [...state.newCars]});
		} else {
			setState({
				...state,
				removingCars: [...state.removingCars, ...state.cars.splice(index, 1)],
				cars: [...state.cars]
			});
		}
	}, [state]);

	/** Обновить состояние формы при изменении авто */ //eslint-disable-next-line
	useEffect(() => { setState({...state, form: Boolean(carset) ? {...carset} : null}) }, [carset]);
	/** Обновить состояние списка авто в зависимости от загруженных */ //eslint-disable-next-line
	useEffect(() => { setState({...state, cars: [...fetchedCars]}) }, [fetchedCars]);
	/** Сохранить изменения и перейти на предыдущий экран */
	useEffect(() => {
		if (state.isSubmittingForm) {
			const {form, newCars, removingCars} = state;

			saveCarSet(form, newCars, removingCars)
				.catch(console.error)
				.finally(goBack);
		}
	}, [state.isSubmittingForm]);

	return (
		<div className="carset-edit">

			<CarSetEditHeader routeName={route.name} carset={carset} types={types}/>

			<div className="carset-edit__container">
				<CarSetForm carset={state.form} types={types} change={(f) => setState({...state, form: f})}/>
				<CarList className="carset-edit__car-list"
						 cars={state.cars}
						 isEditMode={true}
						 removeCar={onRemoveCar}
				/>
				<CarList className="carset-edit__car-list"
						 cars={state.newCars}
						 offsetNumber={state.cars.length}
						 isEditMode={true}
						 removeCar={onRemoveCar}
				/>
			</div>

			<div className="carset-edit__controls-row">
				<Button className="carset-edit__control"
								variant="outline-primary"
								onClick={() => setState({...state, isShowModal: true})}>Добавить авто</Button>
				<Button className="carset-edit__control" variant="primary" onClick={onSave}>Сохранить</Button>
				<Button className="carset-edit__control" variant="outline-danger" onClick={goBack}>Отмена</Button>
			</div>

			<CarModalForm isShow={state.isShowModal} onClose={onCloseModal}/>

		</div>
	);
}
