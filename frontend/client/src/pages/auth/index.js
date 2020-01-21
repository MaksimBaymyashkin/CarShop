import React, {useCallback, useState, useEffect} from 'react';
import {Button, Container, Row, Col, Form, Image} from 'react-bootstrap';
import './auth.css';

import {useRouter} from "react-router5";
import useStoreon from 'storeon/react';
import {AUTH_STATE_NAME} from '../../store/auth/state-name';
import {AUTH_STATE_SIGN_IN} from '../../store/auth/action-names';

export default function Auth() {
	const [authForm, setAuthForm] = useState({login: '', password: ''});
	const {[AUTH_STATE_NAME]: authState, dispatch} = useStoreon(AUTH_STATE_NAME);
	const router = useRouter();

	const updateAuthForm = useCallback((e) => {
		const {name, value} = e.target;
		setAuthForm({...authForm, [name]: value});
	}, [authForm]);

	const submit = useCallback(() => {
	  dispatch(AUTH_STATE_SIGN_IN, authForm);
	}, [dispatch, authForm]);

	useEffect(() => {
		if (Boolean(authState.user)) {
			router.navigate('main');
		}
	}, [authState, router]);

	return (
		<div className="auth">
			<Container>
				<Row>
					<Col>
						<div className="auth__logo-container">
							<Image src="/icons/android-icon-192x192.png" />
						</div>
						<h1 className="auth__header">Car Shop</h1>
					</Col>
				</Row>
				<Row>
					<Col md={{span: 4, offset: 4}} sm={{span: 6, offset: 3}}>
						<Form>
							<Form.Group controlId="login">
								<Form.Label>Login</Form.Label>
								<Form.Control type="text"
															name="login"
															placeholder="Enter login"
															value={authForm.login}
															onChange={updateAuthForm} />
							</Form.Group>

							<Form.Group controlId="password">
								<Form.Label>Password</Form.Label>
								<Form.Control type="password"
															name="password"
															placeholder="Password"
															value={authForm.password}
															onChange={updateAuthForm} />
							</Form.Group>

							<Button variant="primary"
											onClick={submit}
											disabled={!authForm.login || !authForm.password}>Login</Button>
						</Form>
					</Col>
				</Row>
			</Container>
		</div>
	);
}
