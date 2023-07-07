import { isEscapeKey } from './util.js';
import { createCommentRenderer, resetComments } from './render-comments.js';

const bigPicture = document.querySelector('.big-picture');
const mainPicture = bigPicture.querySelector('.big-picture__img img');
const likesCount = bigPicture.querySelector('.likes-count');
const commentsCount = bigPicture.querySelector('.comments-count');
const pictureCaption = bigPicture.querySelector('.social__caption');
const closeButton = document.querySelector('.big-picture__cancel');
const commentsButton = bigPicture.querySelector('.comments-loader');

let commentsButtonClickHandler;

const closePhoto = () => {
	bigPicture.classList.add('hidden');
	document.body.classList.remove('modal-open');
	commentsButton.classList.remove('hidden');
	resetComments();
	document.removeEventListener('keydown', documentEscapeHandler);
	commentsButton.removeEventListener('click', commentsButtonClickHandler);
};

function documentEscapeHandler(evt) {
	if (isEscapeKey(evt)) {
		closePhoto();
	}
}

closeButton.addEventListener('click', () => closePhoto());

export const showFullPhoto = (photo) => {
	bigPicture.classList.remove('hidden');
	mainPicture.src = photo.url;
	likesCount.textContent = photo.likes;
	commentsCount.textContent = photo.comments.length;
	pictureCaption.textContent = photo.description;

	commentsButtonClickHandler = createCommentRenderer(photo.comments);

	document.body.classList.add('modal-open');
	commentsButton.addEventListener('click', commentsButtonClickHandler);
	commentsButton.click();
	document.addEventListener('keydown', documentEscapeHandler);
};
