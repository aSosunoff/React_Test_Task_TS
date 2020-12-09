import React from "react";
import { Link, Redirect, Route } from "react-router-dom";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { authUserSelectors } from "../../../redux/selectors";

const MainLayout = ({ isAuthenticated, user, children, ...props }) => {
	return !isAuthenticated ? (
		<Redirect exact from="*" to="/login" />
	) : (
		<>
			<nav
				className="blue-grey darken-1"
				style={{
					marginBottom: "15px",
				}}
			>
				<div className="nav-wrapper">
					<ul id="nav-mobile" className="left">
						<li>
							<Link to="/">
								<i className="material-icons" title="контакты">
									import_contacts
								</i>
							</Link>
						</li>
					</ul>

					<ul id="nav-mobile" className="right">
						<li>
							<Link to="/profile">
								<i className="material-icons" title={user.name}>
									person_pin
								</i>
							</Link>
						</li>
						<li>
							<Link to="/logout">
								<i className="material-icons" title="выход">
									exit_to_app
								</i>
							</Link>
						</li>
					</ul>
				</div>
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
