import { getData } from './fetch.js';
import { renderPhotos } from './render-photos.js';
import { showAlert, debounce } from './util.js';

const RANDOM_COUNT = 10;

const imageSortContainer = document.querySelector('.img-filters');
const imageFilters = document.querySelector('.img-filters');

const Filter = {
	DEFAULT: 'filter-default',
	RANDOM: 'filter-random',
	DISCUSSED: 'filter-discussed'
};

let currentFilter = Filter.DEFAULT;
let receivedImages;

const debounceRendering = debounce(renderPhotos);

const sortImagesRandomly = () => Math.random() - Math.random();

const sortImagesByComments = (imageA, imageB) => imageB.comments.length - imageA.comments.length;

const getSortedImages = () => {
	switch(currentFilter){
		case Filter.DEFAULT:
			return [...receivedImages];
		case Filter.RANDOM:
			return [...receivedImages].sort(sortImagesRandomly).slice(0, RANDOM_COUNT);
		case Filter.DISCUSSED:
			return [...receivedImages].sort(sortImagesByComments);
	}
};

imageSortContainer.addEventListener('click', (evt) => {
	if (!evt.target.classList.contains('img-filters__button')) {
		return;
	}

	const clickedButton = evt.target;

	if (clickedButton.id === currentFilter) {
		return;
	}

	imageSortContainer.querySelector('.img-filters__button--active').classList.remove('img-filters__button--active');
	clickedButton.classList.add('img-filters__button--active');
	currentFilter = clickedButton.id;
	debounceRendering(getSortedImages());
});

try {
	receivedImages = await getData();
	renderPhotos(receivedImages);
	imageFilters.classList.remove('img-filters--inactive');
} catch(err){
	showAlert(err);
}
