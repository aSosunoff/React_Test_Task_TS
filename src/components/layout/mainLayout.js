import React from "react";
import { Link, Route } from "react-router-dom";

const MainLayout = ({ children, ...props }) => {
	return (
		<>
			<nav>
				<ul>
					<li>
						<Link to="/">Contacts</Link>
					</li>
					<li>
						<Link to="/login">Login</Link>
					</li>
				</ul>
			</nav>

			<div className="container">
				<Route {...props}>{children}</Route>
			</div>
		</>
	);
};

export default MainLayout;
