export const valid = (value, { required, minLength }) => {
	const isRequired = required && value.trim() === "";

	const isMinLength = minLength && value.length < minLength;

	return {
		invalid: isRequired || isMinLength || false,
		invalidMessage: isRequired
			? "Необходимо заполнить поле"
			: isMinLength
			? `Длина должна быть не меньше ${minLength} символов`
			: "",
	};
};

export const isValuePrimitive = (value) =>
	!(typeof value === "object" && value !== null);

export const forMap = (obj, callback) =>
	Object.fromEntries(Object.entries(obj).map(callback));
