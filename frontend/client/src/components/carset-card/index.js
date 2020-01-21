import React from 'react';
import {Card} from 'react-bootstrap';

export default function CarSetCard({carset}) {
	return (
		<Card style={{ width: '280px' }}>
			<Card.Img variant="top" src="https://via.placeholder.com/280x180" />
			<Card.Body>
				<Card.Title>{carset.name}</Card.Title>
			</Card.Body>
		</Card>
	);
}
