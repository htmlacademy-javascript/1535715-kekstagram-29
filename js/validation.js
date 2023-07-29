import Pristine from 'pristinejs';

const imgUploadForm = document.querySelector('.img-upload__form');
const imgHashTags = imgUploadForm.querySelector('.text__hashtags');
const imgComment = imgUploadForm.querySelector('.text__description');

const HASHTAG_REGEX = /^#[a-zA-Zа-яА-Я0-9]{1,19}$/i;
const MAX_COMMENT_LENGTH = 140;
const MAX_HASHTAGS_LENGTH = 5;

const pristine = new Pristine(imgUploadForm, {
	classTo: 'img-upload__field-wrapper',
	errorTextParent: 'img-upload__field-wrapper'
});

const resetForm = () => {
	pristine.reset();
	imgUploadForm.reset();
};

const normalizeHashtags = (hashtagsString) => hashtagsString.trim().split(' ').filter((hashtag) => Boolean(hashtag.length));

const validateComment = (value) => value.length >= 0 && value.length <= MAX_COMMENT_LENGTH;
const checkHashtagsLength = (value) => normalizeHashtags(value).length <= MAX_HASHTAGS_LENGTH;
const areHashtagsUnique = (value) => {
	const lowerCaseHashtags = normalizeHashtags(value).map((hashtag) => hashtag.toLowerCase());
	return lowerCaseHashtags.length === new Set(lowerCaseHashtags).size;
};
const areHashtagsValid = (value) => normalizeHashtags(value).every((hashtag) => HASHTAG_REGEX.test(hashtag));

pristine.addValidator(imgComment, validateComment, 'Длина комментария не должна превышать 140 символов.');
pristine.addValidator(imgHashTags, checkHashtagsLength, 'Максимальное количество хештегов 5');
pristine.addValidator(imgHashTags, areHashtagsUnique, 'Одинаковые хештеги запрещены');
pristine.addValidator(imgHashTags, areHashtagsValid, 'Недопустимые символы');

export {pristine, resetForm, imgUploadForm};
