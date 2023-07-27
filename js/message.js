import { isEscapeKey } from './util.js';

const MODAL_CHECK_REGEX = /(success|error)__/;

const successMessage = document.querySelector('#success').content.querySelector('.success');
const errorMessage = document.querySelector('#error').content.querySelector('.error');

const closeMessageWindow = () => {
	const messageWindow = document.querySelector('.success') || document.querySelector('.error');
	messageWindow.remove();
	document.removeEventListener('keydown', documentEscapeHandler, true);
	document.removeEventListener('click', documentClickHandler);
};

function documentEscapeHandler (evt){
	if (isEscapeKey(evt)) {
		evt.stopPropagation();
		closeMessageWindow();
	}
}

function documentClickHandler(evt){
	if(!MODAL_CHECK_REGEX.test(evt.target.className)){
		closeMessageWindow();
	}
}

const showMessageWindow = (messageElement, buttonClass) => {
	document.body.append(messageElement);
	document.addEventListener('keydown', documentEscapeHandler, true);
	document.addEventListener('click', documentClickHandler);
	messageElement.querySelector(buttonClass).addEventListener('click', () => closeMessageWindow());
};

const showSuccessWindow = () => showMessageWindow(successMessage, '.success__button');
const showErrorWindow = () => showMessageWindow(errorMessage, '.error__button');

export { showSuccessWindow, showErrorWindow };
