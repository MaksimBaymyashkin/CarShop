import React from 'react';
import {Button} from "react-bootstrap";
import {Link} from 'react-router5';
import './carset-edit-header.css';

import {
	ROUTE_CARSET_VIEW,
	ROUTE_CARSET_EDIT,
	ROUTE_CARSET_CREATE
} from '../../router/route-names';

const getTitle = (routeName, carset) => {
	switch (routeName) {
		case ROUTE_CARSET_VIEW:
			return Boolean(carset) ? carset.name : '';
		case ROUTE_CARSET_EDIT:
			return 'Изменить';
		case ROUTE_CARSET_CREATE:
			return 'Создать список';
		default:
			return '';
	}
};

const renderType = (routeName, carset, types) => {
	const isAvailable = routeName === ROUTE_CARSET_VIEW
		&& Boolean(carset)
		&& Boolean(carset.typeId)
		&& Boolean(types)
		&& Boolean(types.length);

	if (!isAvailable) {
		return null;
	}

	const type = types.find((g) => g.id === carset.typeId);

	return (
		<span className="carset-edit-header__type">({
			Boolean(type) ? type.name : 'Type name'
		})</span>
	);
};

const renderEditBtn = (routeName, carset) => {
	if (routeName !== ROUTE_CARSET_VIEW || !Boolean(carset) || !Boolean(carset.id)) {
		return null;
	}

	return (
		<Link routeName={ROUTE_CARSET_EDIT}
					routeParams={{id: carset.id}}
					className="carset-edit-header__edit-btn">
			<Button variant="primary" as="span">Изменить</Button>
		</Link>
	);
};

export default function CarSetEditHeader({routeName, carset, types}) {
	return (
		<div className="carset-edit-header">
			<h1>{ getTitle(routeName, carset) }</h1>
			{ renderType(routeName, carset, types) }
			{ renderEditBtn(routeName, carset) }
		</div>
	);
}
