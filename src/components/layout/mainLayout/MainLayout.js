import React from "react";
import { Link, Redirect, Route } from "react-router-dom";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { authUserSelectors } from "../../../redux/selectors/";

const MainLayout = ({ isAuthenticated, user, children, ...props }) => {
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
					<li>
						<a href="#">{user.name}</a>
					</li>
				</ul>
			</nav>

			<div className="container">
				<Route {...props}>{children}</Route>
			</div>
		</>
	);
};

export default connect(
	createStructuredSelector({
		isAuthenticated: authUserSelectors.isAuthenticatedSelector,
		user: authUserSelectors.userSelector,
	})
)(MainLayout);
