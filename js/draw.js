import {photos} from './mock.js';

const photosElement = document.querySelector('.pictures');
const photoTemplate = document.querySelector('#picture').content.querySelector('.picture');
const fragment = document.createDocumentFragment();

photos.forEach(({id, url, description, likes, comments})=>{
	const photoElement = photoTemplate.cloneNode(true);
	const imageElement = photoElement.querySelector('.picture__img');
	imageElement.src = url;
	imageElement.alt = description;
	photoElement.querySelector('.picture__likes').textContent = likes;
	photoElement.querySelector('.picture__comments').textContent = comments.length;
	photoElement.dataset.id = id;
	fragment.append(photoElement);
});

photosElement.append(fragment);
