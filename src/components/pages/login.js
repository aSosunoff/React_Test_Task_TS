import React, { useCallback, useMemo, useState } from "react";
import axios from "../../utils/axios";
import useForm from "../../hooks/useForm";
import BlackButton from "../UI/button/blackButton";
import Input from "../UI/input";
import Progress from "../UI/progress/Progress";

/* window.M.toast({ html, classes: 'info' }); */
/* window.axios = axios; */
/* axios.get('profile', { params: { name: 'admin24' }}).then(({ data }) => console.log(data)) */
/* axios.post('profile', { id: 1, name: '1', password: '123' }) */
/* axios.put('profile/1', { name: '1', password: '123121212' }) */
/* http://zetcode.com/javascript/jsonserver/ */

const INITIAL_VALUES = { name: "admin", password: "1234" };
const INITIAL_VALIDATE = {
	name: {
		required: true,
	},
	password: {
		required: true,
		minLength: 4,
	},
};

const Login = () => {
	const [checkForm, setCheckForm] = useState(false);

	const { values, handlers } = useForm(INITIAL_VALUES, INITIAL_VALIDATE);

	const disabledSubmit = useMemo(
		() =>
			Object.values(handlers).reduce(
				(acc, { invalid }) => acc || invalid,
				false
			),
		[handlers]
	);

	const loginHandler = useCallback(
		async (e) => {
			e.preventDefault();

			setCheckForm(true);

			/* await new Promise((resolve) => setTimeout(resolve, 20000)); */

			const {
				data: [user],
			} = await axios.get("profile", {
				params: values,
			});

			console.log(user);

			setCheckForm(false);
		},
		[setCheckForm, values]
	);

	return (
		<form
			className="card hoverable"
			style={{
				gridArea: "cc",
				margin: 0,
			}}
			onSubmit={loginHandler}
		>
			<div className="card-content">
				<span className="card-title">Вход в систему</span>

				<Input
					label="Логин"
					disabled={checkForm}
					value={handlers.name.value}
					onChange={handlers.name.onChange}
					invalid={handlers.name.invalid}
					invalidMessage={handlers.name.invalidMessage}
				/>

				<Input
					label="Пароль"
					type="password"
					disabled={checkForm}
					value={handlers.password.value}
					onChange={handlers.password.onChange}
					invalid={handlers.password.invalid}
					invalidMessage={handlers.password.invalidMessage}
				/>
			</div>

			<div className="card-action">
				<BlackButton type="submit" disabled={disabledSubmit || checkForm}>
					Войти
					<i className="material-icons right">send</i>
				</BlackButton>
			</div>

			<Progress canVisible={checkForm} />
		</form>
	);
};

export default Login;
