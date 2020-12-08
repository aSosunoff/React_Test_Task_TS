import React, { useState } from "react";
import useForm from "../../hooks/useForm";
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
	const [checkForm /* , setCheckForm */] = useState(false);

	const { /* values, */ handlers /* , reset */ } = useForm(
		INITIAL_VALUES,
		INITIAL_VALIDATE
	);

	return (
		<form
			className="grid-layout__item-center card hoverable" /* @submit.prevent="login" */
		>
			<div className="card-content">
				<span className="card-title">Вход в систему</span>

				<Input
					label="Табельный, Имя, Email"
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

			{/* <div className="card-action" v-if="!checkForm">
				<BlackButton type="submit">
					Войти
					<i className="material-icons right">send</i>
				</BlackButton>
			</div>

			<div className="progress" v-else>
				<div className="indeterminate"></div>
			</div> */}
		</form>
	);
};

export default Login;
