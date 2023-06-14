const PHOTO_COUNT = 25;
const MIN_LIKES = 15;
const MAX_LIKES = 200;
const MAX_COMMENTS = 30;
const MAX_COMMENT_ID = 100;
const COMMENTS = [
	"Всё отлично!",
	"В целом всё неплохо. Но не всё.",
	"Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.",
	"Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.",
	"Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.",
	"Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!"
]
const NAMES = ["Артем", "Глеб", "Максим", "Анна", "Дарья", "Егор", "Даниил", "Антон", "Мария", "Алиса"];

const createIdNumber = () =>{
	let lastGeneratedId = 0;

	return function(){
		lastGeneratedId += 1;
		return lastGeneratedId;
	}
}

const generateRandomInteger = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const createUnrepeatedId = (min, max) => {
	let previousIds = [];

	return function(){
		let currentId = generateRandomInteger(min, max);
		while(previousIds.includes(currentId)){
			currentId = generateRandomInteger(min, max)
		}
		previousIds.push(currentId);
		return currentId;
	}
}

const createMessage = () => {
	let message = '';
	if(generateRandomInteger(0, 1)){
		message += COMMENTS[generateRandomInteger(0, COMMENTS.length - 1)] + ' ';
	}
	return message += COMMENTS[generateRandomInteger(0, COMMENTS.length - 1)];
}

const getPhotoId = createIdNumber();
const getPhotoUrl = createIdNumber();
const getCommentId = createUnrepeatedId(0, MAX_COMMENT_ID);

const createComment = () =>({
	id: getCommentId(),
	avatar: `img/avatar-${generateRandomInteger(1, 6)}`,
	message: createMessage(),
	name: NAMES[generateRandomInteger(0, NAMES.length - 1)]
});

const createPhoto = () =>({
	id: getPhotoId(),
	url: `photos/${getPhotoUrl()}.jpg`,
	description: 'Заглушка для задания',
	likes: generateRandomInteger(MIN_LIKES, MAX_LIKES),
	comments: Array.from({length: generateRandomInteger(0, MAX_COMMENTS)}, createComment) // это убивает страницу
});

const photos = Array.from({length: PHOTO_COUNT}, createPhoto);

