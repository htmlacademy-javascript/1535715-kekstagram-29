import { photos } from './mock.js';
import { isEscapeKey, findElement } from './util.js';

const picturesBlock = document.querySelector('.pictures');
const bigPicture = document.querySelector('.big-picture');
const closeButton = document.querySelector('.big-picture__cancel');
const commentsBlock = document.querySelector('.social__comments');
const commentTemplate = document.querySelector('#comment').content.querySelector('.social__comment');

const closePhoto = () => {
	bigPicture.classList.add('hidden');
	document.body.classList.remove('modal-open');
	document.querySelector('.social__comments').textContent = '';
	document.removeEventListener('keydown', documentEscapeHandler);
};

const documentEscapeHandler = (evt) => {
	if (isEscapeKey(evt)) {
		closePhoto();
	}
};

const showComments = (comments) => {
	const commentFragment = document.createDocumentFragment();

	comments.forEach((comment) => {
		const commentElement = commentTemplate.cloneNode(true);
		const commentAvatar = commentElement.querySelector('.social__picture');
		commentAvatar.src = comment.avatar;
		commentAvatar.alt = comment.name;
		commentElement.querySelector('.social__text').textContent = comment.message;
		commentFragment.append(commentElement);
	});
	commentsBlock.append(commentFragment);
};

closeButton.addEventListener('click', () => closePhoto());

const showFullPhoto = (evt) => {
	if (evt.target.tagName === 'IMG') {
		bigPicture.classList.remove('hidden');
		const chosenPhoto = photos[evt.target.parentNode.dataset.id - 1];

		findElement('.big-picture__img img').src = chosenPhoto.url;
		findElement('.likes-count').textContent = chosenPhoto.likes;
		findElement('.comments-count').textContent = chosenPhoto.comments.length;
		findElement('.social__caption').textContent = chosenPhoto.description;
		findElement('.social__comment-count').classList.add('hidden');
		findElement('.comments-loader').classList.add('hidden');

		showComments(chosenPhoto.comments);

		document.body.classList.add('modal-open');
		document.addEventListener('keydown', documentEscapeHandler);
	}
};

picturesBlock.addEventListener('click', showFullPhoto);
