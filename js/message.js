import { isEscapeKey } from './util.js';

const successMessage = document.querySelector('#success').content.querySelector('.success');
const errorMessage = document.querySelector('#error').content.querySelector('.error');

const closeMessageWindow = () => {
	const messageWindow = document.querySelector('.success') || document.querySelector('.error');
	document.body.removeChild(messageWindow);
	document.removeEventListener('keydown', documentEscapeHandler);
	document.removeEventListener('click', documentClickHandler);
};

function documentEscapeHandler (evt){
	if (isEscapeKey(evt)) {
		evt.stopPropagation();
		closeMessageWindow();
	}
}

function documentClickHandler(evt){
	if(!evt.target.closest('.success__inner')){
		closeMessageWindow();
	}
}

const showMessageWindow = (messageElement, buttonClass) => {
	document.body.append(messageElement);
	document.addEventListener('keydown', documentEscapeHandler);
	document.addEventListener('click', documentClickHandler);
	messageElement.querySelector(buttonClass).addEventListener('click', closeMessageWindow);
};

const showSuccessWindow = () => showMessageWindow(successMessage, '.success__button');
const showErrorWindow = () => showMessageWindow(errorMessage, '.error__button');

export { showSuccessWindow, showErrorWindow };
