
const PHOTOS_SERVER_URL = 'https://29.javascript.pages.academy/kekstagram';

const Method = {
	GET: 'GET',
	POST: 'POST'
};

const Path = {
	GET_DATA: '/data',
	POST_DATA: '/'
};

const ErrorText = {
	GET_ERROR: 'Ошибка загрузки данных, обновите страницу',
	POST_ERROR: 'Ошибка отправки данных, попробуйте еще раз'
};

const loadData = (path, errorText, method = Method.GET, body = null) =>
	fetch(`${PHOTOS_SERVER_URL}${path}`, { method, body })
		.then((response) => {
			if (!response.ok) {
				throw new Error();
			}
			return response.json();
		})
		.catch(() => {
			throw new Error(errorText);
		});

const getData = () => loadData(Path.GET_DATA, ErrorText.GET_ERROR);

const sendData = (body) => loadData(Path.POST_DATA, ErrorText.POST_ERROR, Method.POST, body);

export { sendData, getData};
