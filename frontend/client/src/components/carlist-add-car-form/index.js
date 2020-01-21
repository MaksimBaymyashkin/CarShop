import React, {Fragment, useCallback, useEffect, useState} from 'react';
import {Button, Form, Modal} from "react-bootstrap";

const initialState = {id: 'null', carlist: null, isValid: false};

export default function CarlistAddCarForm({car, carlists, isShow, onClose}) {
	const [state, setState] = useState({...initialState});

	const handleChange = useCallback((e) => {
		const id = parseInt(e.target.value, 10) || null;

		if (!Boolean(id)) {
			return setState({...initialState});
		}

		const carlist = carlists.find((p) => p.id === id);
		setState({id, carlist, isValid: true});
	}, [carlists]);

	/** Сбросить состояние на начальное при закрытии формы */
	useEffect(() => { !isShow && setState({...initialState}) }, [isShow]);

	return (
		<Fragment>
			<Modal show={isShow} onHide={() => onClose(null)}>
				<Modal.Header closeButton>
					<Modal.Title>Добавить в корзину</Modal.Title>
				</Modal.Header>

				<Modal.Body>
					<p>{Boolean(car) && car.name}</p>
					<Form>
						<Form.Group controlId="addCarToCarlistForm.carlist">
							<Form.Label>Корзина</Form.Label>
							<Form.Control as="select"
														name="carlist"
														required
														value={state.id}
														onChange={handleChange}>
								<option disabled={true} value={'null'}>Выбрать список покупок</option>
								{ Boolean(carlists) && carlists.map((p) => <option key={p.id} value={p.id}>{p.name}</option>) }
							</Form.Control>
						</Form.Group>
					</Form>
				</Modal.Body>

				<Modal.Footer>
					<Button variant="primary" disabled={!state.isValid} onClick={() => onClose(state.carlist)}>Сохранить</Button>
					<Button variant="outline-danger" onClick={() => onClose(null)}>Отмена</Button>
				</Modal.Footer>
			</Modal>
		</Fragment>
	);
}
