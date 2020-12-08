import React, { useCallback, useMemo, useState } from "react";
import useForm from "../../hooks/useForm";
import BlackButton from "../button/blackButton";
import Input from "../input";

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
		(e) => {
			e.preventDefault();
			setCheckForm(true);
			setTimeout(() => {
				console.log(values);
				setCheckForm(false);
			}, 1000);
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

			{!checkForm ? (
				<div className="card-action">
					<BlackButton type="submit" disabled={disabledSubmit}>
						Войти
						<i className="material-icons right">send</i>
					</BlackButton>
				</div>
			) : (
				<div className="progress">
					<div className="indeterminate"></div>
				</div>
			)}
		</form>
	);
};

export default Login;
