import React from "react";
import { Route } from "react-router-dom";

const EmptyLayout = ({ children, ...props }) => {
	return (
		<div className="container">
			<Route {...props}>{children}</Route>
		</div>
	);
};

export default EmptyLayout;
