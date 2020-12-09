import React, { useCallback, useEffect, useMemo } from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";

import useForm from "../../hooks/useForm";
import BlackButton from "../UI/button/blackButton";
import Input from "../UI/input";
import Progress from "../UI/progress/Progress";
import { danger, warning } from "../../utils/toast";
import { login } from "../../redux/actions";

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

const Login = ({ isAuthenticated, login, loading, loaded, error }) => {
	const history = useHistory();

	useEffect(() => {
		if (!loading && loaded && isAuthenticated) {
			return history.push("/");
		}

		if (!loading && loaded && !isAuthenticated) {
			warning("Введены не верные данные");
		}

		if (error) {
			return danger(error.message);
		}
	}, [history, isAuthenticated, loading, error, loaded]);

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
					value={handlers.name.value}
					onChange={handlers.name.onChange}
					invalid={handlers.name.invalid}
					invalidMessage={handlers.name.invalidMessage}
				/>

				<Input
					label="Пароль"
					type="password"
					disabled={loading}
					value={handlers.password.value}
					onChange={handlers.password.onChange}
					invalid={handlers.password.invalid}
					invalidMessage={handlers.password.invalidMessage}
				/>
			</div>

			<div className="card-action">
				<BlackButton type="submit" disabled={disabledSubmit || loading}>
					Войти
					<i className="material-icons right">send</i>
				</BlackButton>
			</div>

			<Progress canVisible={loading} />
		</form>
	);
};

const mapStateToProps = (state) => {
	return {
		isAuthenticated: state.authUser.isAuthenticated,
		loading: state.authUser.loading,
		loaded: state.authUser.loaded,
		error: state.authUser.error,
	};
};

const mapDispatchToProps = {
	login,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
