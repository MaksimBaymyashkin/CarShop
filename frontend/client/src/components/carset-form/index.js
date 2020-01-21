import React from 'react';
import {Form} from "react-bootstrap";

const renderOptions = (types) => Boolean(types)
	? types.map((g) => <option key={g.id} value={g.id}>{g.name}</option>)
	: null;

export default function CarSetForm({carset, types, change}) {
	const form = Boolean(carset) ? carset : {};
	const name = Boolean(carset) ? carset.name : '';
	const typeId = Boolean(carset) ? carset.typeId : '';

	return (
		<Form>
			<Form.Group controlId="editCarSetForm.name">
				<Form.Label>Название</Form.Label>
				<Form.Control as="textarea"
											rows="2"
											value={name}
											onChange={(e) => change({...form, name: e.target.value})}/>
			</Form.Group>
			<Form.Group controlId="editCarSetForm.type">
				<Form.Label>Тип</Form.Label>
				<Form.Control as="select"
											value={typeId}
											onChange={(e) => change({...form, typeId: parseInt(e.target.value, 10)})}>
					{renderOptions(types)}
				</Form.Control>
			</Form.Group>
		</Form>
	);
}
