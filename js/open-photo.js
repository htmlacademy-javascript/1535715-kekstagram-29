import { isEscapeKey } from './util.js';
import { addComments, resetComments } from './render-comments.js';

const bigPicture = document.querySelector('.big-picture');
const mainPicture = bigPicture.querySelector('.big-picture__img img');
const likesCount = bigPicture.querySelector('.likes-count');
const commentsCount = bigPicture.querySelector('.comments-count');
const pictureCaption = bigPicture.querySelector('.social__caption');
const closeButton = document.querySelector('.big-picture__cancel');
const commentsButton = bigPicture.querySelector('.comments-loader');

let comments;


const closePhoto = () => {
	commentsButton.classList.remove('hidden');
	bigPicture.classList.add('hidden');
	document.body.classList.remove('modal-open');
	commentsButton.classList.remove('hidden');
	document.removeEventListener('keydown', documentEscapeHandler);
	commentsButton.removeEventListener('click', commentsButtonClickHandler);
};

function documentEscapeHandler(evt) {
	if (isEscapeKey(evt)) {
		closePhoto();
	}
}
function buttonCommentClickHandler () {
	addComments();
}

function commentsButtonClickHandler(){
	comments();
}

closeButton.addEventListener('click', () => closePhoto());

export const showFullPhoto = (photo) => {
	bigPicture.classList.remove('hidden');
	mainPicture.src = photo.url;
	likesCount.textContent = photo.likes;
	commentsCount.textContent = photo.comments.length;
	pictureCaption.textContent = photo.description;

	comments = addComments(photo.comments);

	resetComments();
	comments();

	document.body.classList.add('modal-open');
	commentsButton.addEventListener('click', commentsButtonClickHandler);
	document.addEventListener('keydown', documentEscapeHandler);
};
