import React from "react";
import PropTypes from "prop-types";
import cn from "classnames";
import styles from "./BaseButton.module.scss";

const BaseButton = ({
	tag,
	type,
	disabled,
	invalid,
	invalidMessage,
	classNameContainer,
	classNameButton,
	children,
	...props
}) => {
	const classDisabled = { [styles.disabled]: disabled };

	if (disabled) {
		props.onClick = (e) => e.preventDefault();
	}

	const buttonElement = React.createElement(
		tag,
		{
			key: "button",
			className: cn(classNameButton, styles.button, classDisabled),
			type,
			...props,
		},
		children
	);

	const invalidElement = invalid
		? React.createElement(
				"small",
				{
					key: "error",
					className: cn(styles.button__invalid, classDisabled),
				},
				invalidMessage
		  )
		: null;

	return React.createElement("div", { className: classNameContainer }, [
		buttonElement,
		invalidElement,
	]);
};

BaseButton.defaultProps = {
	tag: "button",
	type: "button",
};

BaseButton.propTypes = {
	tag: PropTypes.oneOf(["button", "a", "Link"]),
	type: PropTypes.oneOf(["button", "submit", "reset"]),
	disabled: PropTypes.bool,
	invalid: PropTypes.bool,
	invalidMessage: PropTypes.string,
};

export default BaseButton;
