const ALERT_SHOW_TIME = 5000;
const DEBOUNCE_TIMEOUT = 500;

export const createIdNumber = () => {
	let lastGeneratedId = 0;

	return function () {
		lastGeneratedId += 1;
		return lastGeneratedId;
	};
};

export const generateRandomInteger = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

export const createUnrepeatedId = (min, max) => {
	const previousIds = [];

	return function () {
		let currentId = generateRandomInteger(min, max);
		while (previousIds.includes(currentId)) {
			currentId = generateRandomInteger(min, max);
		}
		previousIds.push(currentId);
		return currentId;
	};
};

export const getRandomArrayElement = (elements) => elements[generateRandomInteger(0, elements.length - 1)];

export const isEscapeKey = (evt) => evt.key === 'Escape';

export const showAlert = (message) => {
	const alertContainer = document.createElement('div');
	alertContainer.style.zIndex = '100';
	alertContainer.style.position = 'absolute';
	alertContainer.style.left = '0';
	alertContainer.style.top = '0';
	alertContainer.style.right = '0';
	alertContainer.style.padding = '10px 3px';
	alertContainer.style.fontSize = '30px';
	alertContainer.style.textAlign = 'center';
	alertContainer.style.backgroundColor = 'red';

	alertContainer.textContent = message;

	document.body.append(alertContainer);

	setTimeout(() => {
		alertContainer.remove();
	}, ALERT_SHOW_TIME);
};

export const debounce = (callback, timeout = DEBOUNCE_TIMEOUT) =>{
	let timeoutId;
	return (...rest) =>{
		clearTimeout(timeoutId);
		timeoutId = setTimeout(() => callback.apply(this, rest), timeout);
	};
};
