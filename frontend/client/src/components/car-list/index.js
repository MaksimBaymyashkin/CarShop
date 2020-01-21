import './car-list.css';
import React from 'react';
import {Button} from 'react-bootstrap';
import CarCard from '../car-card';

export default function CarList({cars, isEditMode, offsetNumber, removeCar, likeCar}) {
	const offset = typeof offsetNumber === 'number' ? offsetNumber : 0;
	const remove = typeof removeCar === 'function' ? removeCar : () => {};
	const like = typeof likeCar === 'function' ? likeCar : () => {};

	return (
		<div className="car-list">
			{
				cars.map(
					(t, i) => (
						<div key={i} className="car-list__row">
							<CarCard car={t} number={offset + i + 1}/>
							{
								isEditMode
									? (
										<Button className="car-list__button"
														variant="outline-danger"
														size="sm"
														onClick={() => remove(t, i)}
										>Удалить</Button>
									)
									: (
										<Button className="car-list__button"
														variant="outline-success"
														size="sm"
														onClick={() => like(t, i)}
										>В корзину</Button>
									)
							}
						</div>
					)
				)
			}
		</div>
	);
}
