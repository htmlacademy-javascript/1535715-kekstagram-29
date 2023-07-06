import {photos} from './mock.js';
import { showFullPhoto } from './open-photo.js';

const photosElement = document.querySelector('.pictures');
const photoTemplate = document.querySelector('#picture').content.querySelector('.picture');
const fragment = document.createDocumentFragment();

photos.forEach((photo)=>{
	const {id, url, description, likes, comments} = photo;
	const photoElement = photoTemplate.cloneNode(true);
	const imageElement = photoElement.querySelector('.picture__img');

	imageElement.src = url;
	imageElement.alt = description;
	photoElement.querySelector('.picture__likes').textContent = likes;
	photoElement.querySelector('.picture__comments').textContent = comments.length;
	photoElement.dataset.id = id;
	photoElement.addEventListener('click', () => showFullPhoto(photo));
	fragment.append(photoElement);
});

photosElement.append(fragment);
