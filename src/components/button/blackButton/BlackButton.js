import React from "react";
import BaseButton from "../baseButton";
import styles from "./BlackButton.module.scss";

const BlackButton = ({ children, ...props }) => (
	<BaseButton
		classNameContainer={styles.black}
		classNameButton={styles.button}
		{...props}
	>
		{children}
	</BaseButton>
);

/* BaseButton.defaultProps = {
	tag: "button",
	type: "button",
};

BaseButton.propTypes = {
	tag: PropTypes.oneOf(["button", "a", "Link"]),
	type: PropTypes.oneOf(["button", "submit", "reset"]),
	disabled: PropTypes.bool,
	invalid: PropTypes.bool,
	invalidMessage: PropTypes.string,
}; */

export default BlackButton;
