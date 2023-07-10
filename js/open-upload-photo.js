import { isEscapeKey } from './util.js';
import './validation.js';

const imgUploadInput = document.querySelector('.img-upload__input');
const imgUploadOverlay = document.querySelector('.img-upload__overlay');
const imgUploadCancel = document.querySelector('.img-upload__cancel');
const imgHashTags = document.querySelector('.text__hashtags');
const imgComment = document.querySelector('.text__description');


const documentEscapeHandler = (evt) => {
	if (isEscapeKey(evt)) {
		closeImgUploadWindow();
	}
};

function closeImgUploadWindow() {
	imgUploadOverlay.classList.add('hidden');
	document.body.classList.remove('modal-open');
	imgUploadInput.value = '';
	document.removeEventListener('keydown', documentEscapeHandler);
	imgHashTags.value = '';
	imgComment.value = '';
}

imgUploadInput.addEventListener('change', () => {
	imgUploadOverlay.classList.remove('hidden');
	document.body.classList.add('modal-open');
	document.addEventListener('keydown', documentEscapeHandler);
});

imgUploadCancel.addEventListener('click', () => closeImgUploadWindow());
imgComment.addEventListener('keydown', (evt) => evt.stopPropagation());
imgHashTags.addEventListener('keydown', (evt) => evt.stopPropagation());
