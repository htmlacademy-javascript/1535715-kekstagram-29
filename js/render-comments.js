const commentsCurrentCount = document.querySelector('.comments-current-count');
const commentsButton = document.querySelector('.comments-loader');
const commentsBlock = document.querySelector('.social__comments');
const commentTemplate = document.querySelector('#comment').content.querySelector('.social__comment');

let shownComments = 0;

const renderComments = (comments) => {
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

const createCommentRenderer = (comments) => () => {
	const remainingAmount = comments.length - shownComments;
	const newAmount = shownComments + Math.min(remainingAmount, 5);
	const commentsToShow = comments.slice(shownComments, newAmount);

	renderComments(commentsToShow);

	shownComments = newAmount;
	commentsCurrentCount.textContent = shownComments;
	if (shownComments >= comments.length) {
		commentsButton.classList.add('hidden');
	}
};

const resetComments = () => {
	shownComments = 0;
	commentsBlock.innerHTML = '';
};

export { createCommentRenderer, resetComments };
