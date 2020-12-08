import React, { useCallback, useMemo } from "react";
import PropTypes from "prop-types";
import { v4 } from "uuid";
import cn from "classnames";
import styles from "./Input.module.scss";

const Input = ({
	type,
	label,
	invalid,
	invalidMessage,
	className,
	onChange,
	...attrsInput
}) => {
	const uniq = useMemo(() => v4(), []);

	const onChangeHandler = useCallback(({ target }) => onChange(target.value), [
		onChange,
	]);
	return (
		<div className={styles.input_container}>
			<input
				id={uniq}
				type={type}
				className={cn({ invalid, className })}
				onChange={onChangeHandler}
				{...attrsInput}
			/>

			<label
				htmlFor={uniq}
				className={cn({
					active: Boolean(attrsInput?.value),
				})}
			>
				{label}
			</label>

			{invalid ? (
				<small className={cn("helper-text invalid", styles.invalid)}>
					{invalidMessage}
				</small>
			) : null}
		</div>
	);
};

Input.defaultProps = {
	invalidMessage: "Необходимо заполнить поле",
	type: "text",
};

Input.propTypes = {
	label: PropTypes.string,
	invalidMessage: PropTypes.string,
	invalid: PropTypes.bool,
	disabled: PropTypes.bool,
	type: PropTypes.oneOf([
		"button",
		"checkbox",
		"file",
		"hidden",
		"image",
		"password",
		"radio",
		"reset",
		"submit",
		"text",
		"color",
		"date",
		"datetime",
		"datetime-local",
		"email",
		"number",
		"range",
		"search",
		"tel",
		"time",
		"url",
		"month",
		"week",
	]),
};

export default Input;
