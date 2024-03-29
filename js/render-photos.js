import { showFullPhoto } from './open-photo.js';

const photosElement = document.querySelector('.pictures');
const photoTemplate = document.querySelector('#picture').content.querySelector('.picture');
const fragment = document.createDocumentFragment();

const renderPhotos = (photosData) => {
	photosElement.querySelectorAll('.picture').forEach((picture) => picture.remove());

	photosData.forEach((photo) => {
		const { id, url, description, likes, comments } = photo;
		const photoElement = photoTemplate.cloneNode(true);
		const imageElement = photoElement.querySelector('.picture__img');

		imageElement.src = url;
		imageElement.alt = description;
		photoElement.querySelector('.picture__likes').textContent = likes;
		photoElement.querySelector('.picture__comments').textContent = comments.length;
		photoElement.dataset.id = id;
		photoElement.addEventListener('click', (evt) => {
			evt.preventDefault();
			showFullPhoto(photo);
		});
		fragment.append(photoElement);
	});

	photosElement.append(fragment);
};

export { renderPhotos };
