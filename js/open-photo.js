import { photos } from './mock.js';
import { isEscapeKey } from './util.js';

const picturesBlock = document.querySelector('.pictures');
const bigPicture = document.querySelector('.big-picture');
const closeButton = document.querySelector('.big-picture__cancel');
const commentTemplate = document.querySelector('#comment').content.querySelector('.social__comment');
const mainPicture = bigPicture.querySelector('.big-picture__img img');
const likesCount = bigPicture.querySelector('.likes-count');
const commentsBlock = bigPicture.querySelector('.social__comments');
const commentsCount = bigPicture.querySelector('.comments-count');
const commentsCurrentCount = bigPicture.querySelector('.comments-current-count');
const pictureCaption = bigPicture.querySelector('.social__caption');
const commentsButton = bigPicture.querySelector('.comments-loader');

let addComments;

const closePhoto = () => {
	commentsButton.classList.remove('hidden');
	bigPicture.classList.add('hidden');
	document.body.classList.remove('modal-open');
	commentsBlock.textContent = '';
	document.removeEventListener('keydown', documentEscapeHandler);
	commentsButton.removeEventListener('click', buttonCommentClickHandler);
};

function documentEscapeHandler(evt) {
	if (isEscapeKey(evt)) {
		closePhoto();
	}
}
function buttonCommentClickHandler () {
	addComments();
}

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

const showFullPhoto = (evt) => {
	if (evt.target.tagName === 'IMG') {
		bigPicture.classList.remove('hidden');
		const chosenPhoto = photos[evt.target.parentNode.dataset.id - 1];
		mainPicture.src = chosenPhoto.url;
		likesCount.textContent = chosenPhoto.likes;
		commentsCount.textContent = chosenPhoto.comments.length;
		pictureCaption.textContent = chosenPhoto.description;
		commentsBlock.textContent = '';
		const photoComments = chosenPhoto.comments;

		let shownComments = 0;
		addComments = () =>{
			const remainingComments = photoComments.length - shownComments;
			const newComments = Math.min(remainingComments, 5);
			const commentsToShow = photoComments.slice(shownComments, shownComments + newComments);
			showComments(commentsToShow);
			shownComments += newComments;
			commentsCurrentCount.textContent = shownComments;
			if(shownComments >= photoComments.length){
				commentsButton.classList.add('hidden');
			}
		};
		addComments();

		document.body.classList.add('modal-open');
		commentsButton.addEventListener('click', buttonCommentClickHandler);
		document.addEventListener('keydown', documentEscapeHandler);
	}
};

closeButton.addEventListener('click', () => closePhoto());
picturesBlock.addEventListener('click', (evt) => showFullPhoto(evt));
