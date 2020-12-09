import { LOGIN } from "./types";

export const login = (user) => ({
	type: LOGIN,
	CallAPI: "profile",
	methodAPI: "get",
	paramsAPI: {
		params: user,
	},
});

/* window.M.toast({ html, classes: 'info' }); */
/* window.axios = axios; */
/* axios.get('profile', { params: { name: 'admin24' }}).then(({ data }) => console.log(data)) */
/* axios.post('profile', { id: 1, name: '1', password: '123' }) */
/* axios.put('profile/1', { name: '1', password: '123121212' }) */
/* http://zetcode.com/javascript/jsonserver/ */
