import React, { useCallback, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { useForm } from "@asosunoff/react_use_form";
import BlackButton from "../components/UI/button/blackButton";
import Input from "../components/UI/input";
import Progress from "../components/UI/progress/Progress";
import { danger, warning } from "../utils/toast";
import { login } from "../redux/actions";
import { authUserSelectors } from "../redux/selectors";

const INITIAL_VALUES = {
	login: {
		value: "",
		validation: {
			required: {
				message: "Необходимо заполнить поле",
			},
		},
	},
	password: {
		value: "",
		validation: {
			required: {
				message: "Необходимо заполнить поле",
			},
			minLength: {
				value: 4,
				message: "Длина должна быть не меньше 4 символов",
			},
		},
	},
};

const Login = ({ isAuthenticated, login, loading, loaded, error }) => {
	const history = useHistory();

	useEffect(() => {
		if (!loading && loaded && isAuthenticated) {
			history.push("/");
		} else if (!loading && loaded && !isAuthenticated) {
			warning("Введены не верные данные");
		} else if (error) {
			danger(error.message);
		}
	}, [history, isAuthenticated, loading, error, loaded]);

	const { values, handlers, isFormInvalid } = useForm(INITIAL_VALUES);

	const loginHandler = useCallback(
		(e) => {
			e.preventDefault();
			login(values);
		},
		[login, values]
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
					disabled={loading}
					value={handlers.login.value}
					onChange={handlers.login.onChange}
					invalid={handlers.login.touched && handlers.login.invalid}
					invalidMessage={handlers.login.invalidMessage}
				/>

				<Input
					label="Пароль"
					type="password"
					disabled={loading}
					value={handlers.password.value}
					onChange={handlers.password.onChange}
					invalid={handlers.password.touched && handlers.password.invalid}
					invalidMessage={handlers.password.invalidMessage}
				/>
			</div>

			<div className="card-action">
				<BlackButton type="submit" disabled={isFormInvalid || loading}>
					Войти
					<i className="material-icons right">send</i>
				</BlackButton>
			</div>

			<Progress canVisible={loading} />
		</form>
	);
};

export default connect(
	createStructuredSelector({
		isAuthenticated: authUserSelectors.isAuthenticatedSelector,
		loading: authUserSelectors.loginLoadingSelector,
		loaded: authUserSelectors.loginLoadedSelector,
		error: authUserSelectors.loginErrorSelector,
	}),
	{
		login,
	}
)(Login);
