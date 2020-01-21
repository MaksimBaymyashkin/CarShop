import React, {Fragment, useState} from 'react';
import {Button, Form, Modal} from 'react-bootstrap';

const initialState = {name: '', color: '',  price: 0};

export default function TrackModalForm({isShow, onClose}) {
	const [form, setForm] = useState(initialState);

	const onChange = (e) =>{
		const {name, value} = e.target;
		const preparedValue = name === 'price'
			? (parseInt(value, 10) || 0)
			: value;

		setForm({...form, [name]: preparedValue});
	};

	const resetForm = () => {
		setForm(initialState);
	};

	const close = (value = null) => () => {
		onClose(value);
		resetForm();
	};

	return (
		<Fragment>
			<Modal show={isShow} onHide={close()}>
				<Modal.Header closeButton>
					<Modal.Title>Выбрать автомобиль</Modal.Title>
				</Modal.Header>

				<Modal.Body>
					<Form>
						<Form.Group controlId="editCarForm.name">
							<Form.Label>Модель</Form.Label>
							<Form.Control as="input"
														type="text"
														name="name"
														required
														value={form.name}
														onChange={onChange}/>
						</Form.Group>
						<Form.Group controlId="editCarForm.color">
							<Form.Label>Цвет</Form.Label>
							<Form.Control as="input"
														type="text"
														name="color"
														required
														value={form.color}
														onChange={onChange} />
						</Form.Group>
						<Form.Group controlId="editCarForm.price">
							<Form.Label>Цена</Form.Label>
							<Form.Control as="input"
										  type="number"
										  name="price"
										  min={0}
										  required
										  value={form.price}
										  onChange={onChange} />
						</Form.Group>
					</Form>
				</Modal.Body>

				<Modal.Footer>
					<Button variant="primary" onClick={close(form)}>Сохранить</Button>
					<Button variant="outline-danger" onClick={close()}>Отмена</Button>
				</Modal.Footer>
			</Modal>
		</Fragment>
	);
}


/*<Form.Group controlId="editCarForm.color">
							<Form.Label>Color</Form.Label>
							<Form.Control as="input"
										  type="text"
										  name="color"
										  required
										  value={form.color}
										  onChange={onChange} />
						</Form.Group>
						<Form.Group controlId="editCarForm.regnumber">
							<Form.Label>Regnumber</Form.Label>
							<Form.Control as="input"
										  type="text"
										  name="regnumber"
										  required
										  value={form.regnumber}
										  onChange={onChange} />
						</Form.Group>
						<Form.Group controlId="editCarForm.year">
							<Form.Label>Year</Form.Label>
							<Form.Control as="input"
														type="number"
														name="year"
														min={0}
														required
														value={form.year}
														onChange={onChange} />
						</Form.Group>*/