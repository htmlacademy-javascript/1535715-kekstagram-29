const DEFAULT_SCALE = 100;
const SCALE_STEP = 25;
const MIN_SCALE = 25;
const MAX_SCALE = 100;

const uploadImage = document.querySelector('.img-upload__preview img');
const scaleSmaller = document.querySelector('.scale__control--smaller');
const scaleBigger = document.querySelector('.scale__control--bigger');
const scaleValue = document.querySelector('.scale__control--value');

const scaleImage = (scale) => {
	uploadImage.style.transform = `scale(${scale / 100})`;
	scaleValue.value = `${scale}%`;
};

const makeImageSmaller = () => {
	scaleImage(Math.max(parseInt(scaleValue.value, 10) - SCALE_STEP, MIN_SCALE));
};

const makeImageBigger = () => {
	scaleImage(Math.min(parseInt(scaleValue.value, 10) + SCALE_STEP, MAX_SCALE));
};


scaleSmaller.addEventListener('click', () => makeImageSmaller());
scaleBigger.addEventListener('click', () => makeImageBigger());

export const resetScale = () => scaleImage(DEFAULT_SCALE);
