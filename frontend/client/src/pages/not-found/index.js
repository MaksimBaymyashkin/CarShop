import React from 'react';
import {Image, Container, Row, Col, Button} from 'react-bootstrap';
import './not-found.css';

export default function NotFound() {
	return (
		<div className="not-found">
			<Container>
				<Row>
					<Col>
						<h1 className="not-found__header">Page not found!</h1>
					</Col>
				</Row>
				<Row>
					<Col className="not-found__img">
						<Image src="/images/error-404.svg" />
					</Col>
				</Row>
				<Row>
					<Col className="not-found__button">
						<Button variant="outline-primary" href="/">Go to main</Button>
					</Col>
				</Row>
			</Container>
		</div>
	);
}
