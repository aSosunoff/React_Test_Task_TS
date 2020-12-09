import React, { useEffect } from "react";
import { connect } from "react-redux";
import { logout } from "../../redux/actions";

const Logout = ({ logout }) => {
	useEffect(() => {
		setTimeout(logout, 1000);
	}, [logout]);

	return <div>Ждём вас ещё</div>;
};

export default connect(null, {
	logout,
})(Logout);
