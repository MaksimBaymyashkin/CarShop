import React from 'react';
import './car-card.css';


export default function CarCard({car, number}) {
	return (
		<div className="car-card">
			<div className="car-card__col">
				<span className="car-card__number">{number}.</span>
			</div>
			<div className="car-card__col">
				<a className="car-card__name">{car.name}</a>
			</div>
			<div className="car-card__col">
				<a className="car-card__color">{car.color}</a>
			</div>
			<div className="car-card__col">
				<span className="car-card__price">{car.price}</span>
			</div>
		</div>
	);
}


/*const prepare = (num) => num > 9 ? num : `0${num}`;

const convertYear = (seconds) => {
	const rest = seconds % 60;
	const minutes = (seconds - rest) / 60;

	return `${prepare(minutes)}:${prepare(rest)}`;
};*/


/*<div className="car-card__col">
            <a href={car.color} target="_blank" rel="noopener noreferrer" className="car-card__color">{car.name}</a>
        </div>
        <div className="car-card__col">
            <a href={car.regnumber} target="_blank" rel="noopener noreferrer" className="car-card__regnumber">{car.name}</a>
        </div>
        <div className="car-card__col">
            <span className="car-card__year"/>
        </div>
        <div className="car-card__col">
            <span className="car-card__price"/>
        </div>*/