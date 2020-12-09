import React from "react";
import { Link, Redirect, Route } from "react-router-dom";
import { connect } from "react-redux";

const MainLayout = ({ isAuthenticated, children, ...props }) => {
	return !isAuthenticated ? (
		<Redirect exact from="*" to="/login" />
	) : (
		<>
			<nav>
				<ul>
					<li>
						<Link to="/">Contacts</Link>
					</li>
					<li>
						<Link to="/logout">Logout</Link>
					</li>
				</ul>
			</nav>

			<div className="container">
				<Route {...props}>{children}</Route>
			</div>
		</>
	);
};

const mapStateToProps = (state) => {
	return {
		isAuthenticated: state.authUser.isAuthenticated,
	};
};

export default connect(mapStateToProps)(MainLayout);
