import axios from "axios";

let cancelCallback = () => {};

let signal = axios.CancelToken.source();

const { protocol, hostname } = window.location;

const api = axios.create({
	baseURL: `${protocol}//${hostname}:3001/api/`,
	timeout: 20000,
	withCredentials: true,
});

api.interceptors.request.use((request) => {
	request.cancelToken = signal.token;
	return request;
});

api.interceptors.response.use(
	(response) => response,
	(error) => {
		if (axios.isCancel(error)) {
			return Promise.reject();
		}

		if (
			error.response &&
			"status" in error.response &&
			error.response.status === 401
		) {
			signal.cancel({ isCanceled: true, message: "Requests canceled" });
			signal = axios.CancelToken.source();
			cancelCallback();
			return Promise.reject();
		}

		return Promise.reject(error);
	}
);

export const setCancelCallback = (cb) => {
	cancelCallback = cb;
};

export default api;
