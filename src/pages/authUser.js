import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { authUserSelectors } from "../redux/selectors/";

const AuthUser = ({ user }) => {
	return (
		<>
			<div className="row">
				<div className="col s6 center-align">Имя</div>
				<div className="col s6 center-align">{user.name}</div>
			</div>

			<div className="row">
				<div className="col s6 center-align">Логин</div>
				<div className="col s6 center-align">{user.login}</div>
			</div>

			<div className="row">
				<div className="col s6 center-align">Пароль</div>
				<div className="col s6 center-align">{user.password}</div>
			</div>
		</>
	);
};

export default connect(
	createStructuredSelector({
		user: authUserSelectors.userSelector,
	})
)(AuthUser);
