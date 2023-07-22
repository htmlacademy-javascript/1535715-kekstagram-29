import constants from './data.js';
import {createIdNumber, createUnrepeatedId, generateRandomInteger, getRandomArrayElement} from './util.js';

const getPhotoId = createIdNumber();
const getPhotoUrl = createIdNumber();
const getCommentId = createUnrepeatedId(0, constants.MAX_COMMENT_ID);

const createMessage = () => {
	let message = '';
	if(generateRandomInteger(0, 1)){
		message += `${getRandomArrayElement(constants.COMMENTS)} `;
	}
	message += getRandomArrayElement(constants.COMMENTS);
	return message;
};

const createComment = () =>({
	id: getCommentId(),
	avatar: `img/avatar-${generateRandomInteger(1, 6)}.svg`,
	message: createMessage(),
	name: getRandomArrayElement(constants.NAMES)
});

const createPhoto = () =>({
	id: getPhotoId(),
	url: `photos/${getPhotoUrl()}.jpg`,
	description: getRandomArrayElement(constants.DESCRIPTIONS),
	likes: generateRandomInteger(constants.MIN_LIKES, constants.MAX_LIKES),
	comments: Array.from({length: generateRandomInteger(0, constants.MAX_COMMENTS)}, createComment)
});

const photos = Array.from({length: constants.PHOTO_COUNT}, createPhoto);

export {photos};
