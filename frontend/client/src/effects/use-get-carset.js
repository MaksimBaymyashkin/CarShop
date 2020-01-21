import axios from 'axios';
import {useState, useEffect} from 'react';
import {carsetGetById} from '../api/carset';

export function useGetCarset(carSetId) {
	const [carset, setCarSet] = useState(null);

	useEffect(() => {
		let source = null;

		if (typeof carSetId !== 'undefined') {
			source = axios.CancelToken.source();

			carsetGetById(carSetId, source.token)
				.then(({data}) => {
					setCarSet(data);
				})
				.catch((err) => {
					if (!axios.isCancel(err)) {
						setCarSet(null);
						console.error(err);
					}
				});
		}

		return () => {
			if (Boolean(source) && typeof source.cancel === 'function') {
				source.cancel('Cancel CARSET_GET request');
			}
		};
	}, [carSetId]);

	return carset;
}
