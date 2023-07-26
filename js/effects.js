import noUiSlider from 'nouislider';
import 'nouislider/dist/nouislider.css';

const EFFECTS = {
	none: {
		style: 'none',
		min: 0,
		max: 0,
		step: 0,
		unit: '',
	},
	chrome: {
		style: 'grayscale',
		min: 0,
		max: 1,
		step: 0.1,
		unit: '',
	},
	sepia: {
		style: 'sepia',
		min: 0,
		max: 1,
		step: 0.1,
		unit: '',
	},
	marvin: {
		style: 'invert',
		min: 0,
		max: 100,
		step: 1,
		unit: '%',
	},
	phobos: {
		style: 'blur',
		min: 0,
		max: 3,
		step: 0.1,
		unit: 'px',
	},
	heat: {
		style: 'brightness',
		min: 1,
		max: 3,
		step: 0.1,
		unit: '',
	},
};

const DEFAULT_EFFECT = 'none';


const sliderContainer = document.querySelector('.img-upload__effect-level');
const sliderElement = document.querySelector('.effect-level__slider');
const imageElement = document.querySelector('.img-upload__preview img');
const effectLevel = document.querySelector('.effect-level__value');
const effectsContainer = document.querySelector('.img-upload__effects');

let chosenEffect = DEFAULT_EFFECT;

noUiSlider.create(sliderElement, {
	range: {
		min: 0,
		max: 0
	},
	start: 0,
	step: 0,
	connect: 'lower'
});

const isDefault = () => chosenEffect === DEFAULT_EFFECT;

const hideSlider = () => {
	sliderContainer.classList.add('hidden');
};

const showSlider = () => {
	sliderContainer.classList.remove('hidden');
};

const setSlider = () => {
	showSlider();
	const { min, max, step } = EFFECTS[chosenEffect];
	sliderElement.noUiSlider.updateOptions({
		range: {
			min: min,
			max: max,
		},
		step: step,
		start: max,
	});
};

const setImageEffect = () => {
	const { value } = effectLevel;
	const { style, unit } = EFFECTS[chosenEffect];
	imageElement.style.filter = `${style}(${value}${unit})`;
};

const setEffect = (effect) => {
	chosenEffect = effect;
	if (isDefault()) {
		hideSlider();
		imageElement.style.filter = null;
	} else {
		setSlider();
		setImageEffect();
	}
};

const onSliderUpdate = () => {
	effectLevel.value = sliderElement.noUiSlider.get();
	setImageEffect();
};

const resetEffects = () => {
	setEffect(DEFAULT_EFFECT);
};

hideSlider();

effectsContainer.addEventListener('change', (evt) => setEffect(evt.target.value));
sliderElement.noUiSlider.on('update', onSliderUpdate);

export { resetEffects };
