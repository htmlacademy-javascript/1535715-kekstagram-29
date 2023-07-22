import { isEscapeKey } from './util.js';
import { pristine, resetForm, imgUploadForm } from './validation.js';
import { resetScale } from './scale.js';
import { resetEffects } from './effects.js';
import { sendData } from './fetch.js';
import { showErrorWindow, showSuccessWindow } from './message.js';

const imgUploadInput = document.querySelector('.img-upload__input');
const imgUploadOverlay = document.querySelector('.img-upload__overlay');
const imgUploadCancel = document.querySelector('.img-upload__cancel');
const imgUploadSubmit = document.querySelector('.img-upload__submit');
const imgHashTags = document.querySelector('.text__hashtags');
const imgComment = document.querySelector('.text__description');

const documentEscapeHandler = (evt) => {
	if (isEscapeKey(evt)) {
		closeImgUploadWindow();
	}
};

const blockUploadButton = () =>{
	imgUploadSubmit.disabled = true;
	imgUploadSubmit.textContent = 'Отправляем...';
};

const unblockUploadButton = () =>{
	imgUploadSubmit.disabled = false;
	imgUploadSubmit.textContent = 'Опубликовать';
};

function closeImgUploadWindow() {
	imgUploadOverlay.classList.add('hidden');
	document.body.classList.remove('modal-open');
	document.removeEventListener('keydown', documentEscapeHandler);
	resetForm();
	resetScale();
	resetEffects();
	pristine.validate();
}

imgUploadInput.addEventListener('change', () => {
	imgUploadOverlay.classList.remove('hidden');
	document.body.classList.add('modal-open');
	document.addEventListener('keydown', documentEscapeHandler);
});

imgUploadCancel.addEventListener('click', () => closeImgUploadWindow());
imgComment.addEventListener('keydown', (evt) => evt.stopPropagation());
imgHashTags.addEventListener('keydown', (evt) => evt.stopPropagation());

imgUploadForm.addEventListener('submit', (evt) => {
	evt.preventDefault();
	if(pristine.validate()){
		blockUploadButton();
		sendData(new FormData(imgUploadForm))
			.then(() =>{
				closeImgUploadWindow();
				showSuccessWindow();
			})
			.catch(() => {
				showErrorWindow();
			})
			.finally(() => {
				unblockUploadButton();
			});
	}
});
