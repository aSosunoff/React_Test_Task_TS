import { useCallback, useMemo, useState } from "react";

export default (initialValues = {}, initialValidation = {}) => {
	const [values, setValues] = useState(initialValues);

	const validate = useMemo(
		() =>
			Object.entries(initialValidation).reduce(
				(acc, [key, { required, minLength }]) => {
					const isRequired = required && values[key].trim() === "";

					const isMinLength = minLength && values[key].length < minLength;

					return {
						...acc,
						[key]: {
							invalid: isRequired || isMinLength || false,
							invalidMessage: isRequired
								? "Необходимо заполнить поле"
								: isMinLength
								? `Длина должна быть не меньше ${minLength} символов`
								: "",
						},
					};
				},
				{}
			),
		[initialValidation, values]
	);

	const handlers = useMemo(
		() =>
			Object.keys(values).reduce(
				(acc, key) => ({
					...acc,
					[key]: {
						value: values[key],
						onChange: onChange(key),
						...validate[key],
					},
				}),
				{}
			),
		// eslint-disable-next-line
		[validate, values]
	);

	const isDisabledAll = useMemo(
		() =>
			Object.values(handlers).reduce(
				(acc, { invalid }) => acc || invalid,
				false
			),
		[handlers]
	);

	const setValue = useCallback((key, value) => {
		if (typeof key === "object") {
			setValues((prev) => ({ ...prev, ...key }));
		} else {
			setValues((prev) => ({ ...prev, [key]: value }));
		}
	}, []);

	function onChange(key) {
		return (ev) => setValue(key, ev.target ? ev.target.value : ev);
	}

	return {
		values,
		reset: () => setValues(initialValues),
		handlers,
		setValue,
		isDisabledAll,
	};
};
