import axios from 'axios';
import {useState, useEffect} from 'react';
import {carGetList} from '../api/car';

export function useGetCarList(carSetId) {
	const [carList, setCarList] = useState([]);

	useEffect(() => {
		let source = null;

		if (typeof carSetId !== 'undefined') {
			source = axios.CancelToken.source();

			carGetList({carset_id: carSetId}, source.token)
				.then(({data}) => {
					setCarList(data);
				})
				.catch((err) => {
					console.error(err);
					setCarList([]);
				});
		}

		return () => {
			if (Boolean(source) && typeof source.cancel === 'function') {
				source.cancel('Cancel CAR_LIST request');
			}
		};
	}, [carSetId]);

	return carList;
}
