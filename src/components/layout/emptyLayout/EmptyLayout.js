import React from "react";
import { Route } from "react-router-dom";
import styles from "./EmptyLayout.module.scss";
import cn from "classnames";

const EmptyLayout = ({ children, ...props }) => {
	return (
		<div
			className={cn(
				styles["grid-layout"],
				styles["grid-layout_center"],
				"blue-grey",
				"darken-3"
			)}
		>
			<Route {...props}>{children}</Route>
		</div>
	);
};

export default EmptyLayout;
