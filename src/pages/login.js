import React, { useCallback, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { useForm } from "../hooks/useForm/useForm";
import BlackButton from "../components/UI/button/blackButton";
import Input from "../components/UI/input";
import Progress from "../components/UI/progress/Progress";
import { danger, warning } from "../utils/toast";
import { login } from "../redux/actions";
import { authUserSelectors } from "../redux/selectors";

const INITIAL_VALUES = {
	login: {
		value: "",
		validation: { required: true },
	},
	password: {
		value: "",
		validation: {
			required: true,
			minLength: 4,
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

	const { values, handlers, isDisabledAll } = useForm(INITIAL_VALUES);

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
				<BlackButton type="submit" disabled={isDisabledAll || loading}>
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
