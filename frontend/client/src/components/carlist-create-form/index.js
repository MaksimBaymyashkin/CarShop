import React, {Fragment, useCallback, useEffect, useState} from 'react';
import {Button, Form, Modal} from "react-bootstrap";

const initialState = {name: '', isValid: false};

export default function CarlistCreateForm({isShow, onClose}) {
	const [state, setState] = useState({...initialState});

	const handleChange = useCallback((e) => {
		setState({
			name: e.target.value,
			isValid: e.target.value.length > 0
		});
	}, []);

	/** Сбросить состояние на начальное при закрытии формы */
	useEffect(() => { !isShow && setState({...initialState}) }, [isShow]);

	return (
		<Fragment>
			<Modal show={isShow} onHide={() => onClose(null)}>
				<Modal.Header closeButton>
					<Modal.Title>Список покупок</Modal.Title>
				</Modal.Header>

				<Modal.Body>
					<Form>
						<Form.Group controlId="CarlistCreateForm.name">
							<Form.Label>Название</Form.Label>
							<Form.Control as="input"
														name="name"
														type="text"
														required
														value={state.name}
														onChange={handleChange}/>
						</Form.Group>
					</Form>
				</Modal.Body>

				<Modal.Footer>
					<Button variant="primary" disabled={!state.isValid} onClick={() => onClose(state.name)}>Сохранить</Button>
					<Button variant="outline-danger" onClick={() => onClose(null)}>Отмена</Button>
				</Modal.Footer>
			</Modal>
		</Fragment>
	);
}
