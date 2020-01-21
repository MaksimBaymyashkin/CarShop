export function getCookie(name) {
	// eslint-disable-next-line
	const pattern = new RegExp('(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)');
	const matches = document.cookie.match(pattern);

	return Boolean(matches)
		? decodeURIComponent(matches[1])
		: undefined;
}

export function setCookie(name, value, customOptions = {}) {
	const options = {
		path: '/',
		...customOptions
	};

	if (Boolean(options.expires) && typeof options.expires.toUTCString === 'function') {
		options.expires = options.expires.toUTCString();
	}

	let updatedCookie = encodeURIComponent(name) + '=' + encodeURIComponent(value);

	for (let optionKey in options) {
		let optionValue = options[optionKey];
		updatedCookie += '; ' + optionKey;

		if (optionValue !== true) {
			updatedCookie += '=' + optionValue;
		}
	}

	document.cookie = updatedCookie;
}

export function deleteCookie(name) {
	setCookie(name, '', {
		'max-age': -1
	})
}
