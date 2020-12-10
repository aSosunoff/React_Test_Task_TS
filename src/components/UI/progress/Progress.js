import React from "react";
import PropTypes from "prop-types";
import cn from "classnames";
import styles from "./Progress.module.scss";

const Progress = ({ canVisible }) => {
	return (
		<>
			{canVisible ? (
				<div className={cn("progress", styles.progress)}>
					<div className={cn("indeterminate", styles.indeterminate)}></div>
				</div>
			) : null}
		</>
	);
};

Progress.propTypes = {
	canVisible: PropTypes.bool,
};

export default Progress;
