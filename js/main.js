import constants from './data.js';
import {createIdNumber, createUnrepeatedId, generateRandomInteger} from './util.js';

const getPhotoId = createIdNumber();
const getPhotoUrl = createIdNumber();
const getCommentId = createUnrepeatedId(0, constants.MAX_COMMENT_ID);

const createMessage = () => {
	let message = '';
	if(generateRandomInteger(0, 1)){
		message += `${constants.COMMENTS[generateRandomInteger(0, constants.COMMENTS.length - 1)] } `;
	}
	message += constants.COMMENTS[generateRandomInteger(0, constants.COMMENTS.length - 1)];
	return message;
};

const createComment = () =>({
	id: getCommentId(),
	avatar: `img/avatar-${generateRandomInteger(1, 6)}`,
	message: createMessage(),
	name: constants.NAMES[generateRandomInteger(0, constants.NAMES.length - 1)]
});

const createPhoto = () =>({
	id: getPhotoId(),
	url: `photos/${getPhotoUrl()}.jpg`,
	description: 'Заглушка для задания',
	likes: generateRandomInteger(constants.MIN_LIKES, constants.MAX_LIKES),
	comments: Array.from({length: generateRandomInteger(0, constants.MAX_COMMENTS)}, createComment)
});

const photos = Array.from({length: constants.PHOTO_COUNT}, createPhoto);
