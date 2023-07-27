import { isEscapeKey } from './util.js';
import { pristine, resetForm, imgUploadForm } from './validation.js';
import { resetScale } from './scale.js';
import { resetEffects } from './effects.js';
import { sendData } from './fetch.js';
import { showErrorWindow, showSuccessWindow } from './message.js';

const FILE_FORMATS = ['jpeg', 'jpg', 'png'];

const imgUploadInput = document.querySelector('.img-upload__input');
const imgUploadOverlay = document.querySelector('.img-upload__overlay');
const imgUploadImage = imgUploadOverlay.querySelector('.img-upload__preview img');
const effectPreviews = imgUploadOverlay.querySelectorAll('.effects__preview');
const imgUploadCancel = document.querySelector('.img-upload__cancel');
const imgUploadSubmit = document.querySelector('.img-upload__submit');
const imgHashTags = document.querySelector('.text__hashtags');
const imgComment = document.querySelector('.text__description');

const documentEscapeHandler = (evt) => {
	if (isEscapeKey(evt)) {
		closeImgUploadWindow();
	}
};

const checkFileFormat = (file) => {
	const fileName = file.name.toLowerCase();
	return FILE_FORMATS.some((format) => fileName.endsWith(format));
};

const blockUploadButton = () => {
	imgUploadSubmit.disabled = true;
	imgUploadSubmit.textContent = 'Отправляем...';
};

const unblockUploadButton = () => {
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
}

imgUploadInput.addEventListener('change', () => {
	const file = imgUploadInput.files[0];
	if (file && checkFileFormat(file)) {
		imgUploadImage.src = URL.createObjectURL(file);
		effectPreviews.forEach((preview) => {
			preview.style.backgroundImage = `url('${imgUploadImage.src}')`;
		});
	}
	imgUploadOverlay.classList.remove('hidden');
	document.body.classList.add('modal-open');
	document.addEventListener('keydown', documentEscapeHandler);
});

imgUploadCancel.addEventListener('click', () => closeImgUploadWindow());
imgComment.addEventListener('keydown', (evt) => evt.stopPropagation());
imgHashTags.addEventListener('keydown', (evt) => evt.stopPropagation());

imgUploadForm.addEventListener('submit', (evt) => {
	evt.preventDefault();
	if (pristine.validate()) {
		blockUploadButton();
		sendData(new FormData(imgUploadForm))
			.then(() => {
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
