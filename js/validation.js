const imgUploadForm = document.querySelector('.img-upload__form');
const imgHashTags = imgUploadForm.querySelector('.text__hashtags');
const imgComment = imgUploadForm.querySelector('.text__description');

const hashTagRegExp = /^#[a-z0-9]{1,19}$/i;

let hashTags

const pristine = new Pristine(imgUploadForm, {
	classTo: 'img-upload__field-wrapper',
	errorTextParent: 'img-upload__field-wrapper'
}, false)

const validateComment = (value) => value.length >= 0 && value.length <= 140;

const validateHashTags = (value) => {
	hashTags = value.split(' ');
	if (hashTags.length > 5) {
		return false;
	}
	for (let i = 0; i < hashTags.length; i++) {
		for (let j = i + 1; j < hashTags.length; j++) {
			if (hashTags[i].toLowerCase() === hashTags[j].toLowerCase()) {
				return false;
			}
		}
	}
	return hashTags[0] === '' || hashTags.every(hashTag => hashTagRegExp.test(hashTag));
}

const getHashTagErrorMessage = () => {
	if (hashTags.length > 5) {
		return 'Максимальное количество хештегов 5';
	}
	for (let i = 0; i < hashTags.length; i++) {
		for (let j = i + 1; j < hashTags.length; j++) {
			if (hashTags[i].toLowerCase() === hashTags[j].toLowerCase()) {
			return 'Повторяющиеся хештеги запрещены';
			}
		}
	}
	return 'Недопустимые символы запрещены'
};

pristine.addValidator(imgComment, validateComment, 'Длина комментария не должна превышать 140 символов.');
pristine.addValidator(imgHashTags, validateHashTags, getHashTagErrorMessage)

imgUploadForm.addEventListener('submit', (evt) => {
	evt.preventDefault();
	pristine.validate();
})
