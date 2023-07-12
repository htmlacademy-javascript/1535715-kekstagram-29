const imgUploadForm = document.querySelector('.img-upload__form');
const imgHashTags = imgUploadForm.querySelector('.text__hashtags');
const imgComment = imgUploadForm.querySelector('.text__description');

const HASHTAG_REGEX = /^#[a-z0-9]{1,19}$/i;

export const pristine = new Pristine(imgUploadForm, {
	classTo: 'img-upload__field-wrapper',
	errorTextParent: 'img-upload__field-wrapper'
}, false);

const normalizeHashtags = (hashtagsString) => hashtagsString.trim().split(' ').filter((hashtag) => Boolean(hashtag.length));

const validateComment = (value) => value.length >= 0 && value.length <= 140;
const checkHashtagsLength = (value) => normalizeHashtags(value).length <= 5;
const areHashtagsUnique = (value) => {
	const lowerCaseHashtags = normalizeHashtags(value).map((hashtag) => hashtag.toLowerCase());
	return lowerCaseHashtags.length === new Set(lowerCaseHashtags).size;
};
const areHashtagsValid = (value) => normalizeHashtags(value).every((hashtag) => HASHTAG_REGEX.test(hashtag));

pristine.addValidator(imgComment, validateComment, 'Длина комментария не должна превышать 140 символов.');
pristine.addValidator(imgHashTags, checkHashtagsLength, 'Максимальное количество хештегов 5');
pristine.addValidator(imgHashTags, areHashtagsUnique, 'Одинаковые хештеги запрещены');
pristine.addValidator(imgHashTags, areHashtagsValid, 'Недопустимые символы');


imgUploadForm.addEventListener('submit', (evt) => {
	evt.preventDefault();
	pristine.validate();
});
