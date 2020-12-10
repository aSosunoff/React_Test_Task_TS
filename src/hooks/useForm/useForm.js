import { useCallback, useMemo, useState } from "react";
import { valid, isValuePrimitive, forMap } from "./utils";

export const useForm = (initialValues = {}) => {
	const [form, setForm] = useState(initialValues);

	const values = useMemo(
		() =>
			forMap(form, ([key, value]) =>
				isValuePrimitive(value) ? [key, value] : [key, value.value]
			),
		[form]
	);

	const [touched, setTouched] = useState(
		forMap(initialValues, ([key]) => [key, false])
	);

	const setValue = useCallback((key, value) => {
		if (typeof key === "object") {
			setForm((prev) =>
				forMap(prev, ([field, value]) =>
					isValuePrimitive(value)
						? [field, key[field]]
						: [field, { ...value, value: key[field] }]
				)
			);
		} else {
			setForm((prev) => ({
				...prev,
				[key]: {
					...prev[key],
					value,
				},
			}));
		}
	}, []);

	const onChange = useCallback(
		(key) => (ev) => {
			setTouched((prev) => ({ ...prev, [key]: true }));
			setValue(key, ev.target ? ev.target.value : ev);
		},
		[setValue, setTouched]
	);

	const handlers = useMemo(
		() =>
			forMap(form, ([key, value]) =>
				isValuePrimitive(value)
					? [key, { value, onChange: onChange(key) }]
					: [
							key,
							{
								...valid(value.value, value.validation),
								touched: touched[key],
								value: value.value,
								onChange: onChange(key),
							},
					  ]
			),
		[onChange, form, touched]
	);

	const isDisabledAll = useMemo(
		() =>
			Object.values(handlers).reduce(
				(acc, { invalid }) => acc || invalid,
				false
			),
		[handlers]
	);

	const reset = useCallback(() => {
		setTouched(forMap(initialValues, ([key]) => [key, false]));
		setForm(initialValues);
		// eslint-disable-next-line
	}, [setTouched, setForm]);

	return {
		values,
		reset,
		handlers,
		setValue,
		isDisabledAll,
	};
};
