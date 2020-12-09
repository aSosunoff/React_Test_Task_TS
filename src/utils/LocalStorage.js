export default new Proxy(
	{},
	{
		get(target, property) {
			const value = localStorage.getItem(property);
			target[property] = value ? JSON.parse(value) : null;
			return target[property];
		},
		set(target, property, value) {
			target[property] = value;
			localStorage.setItem(property, JSON.stringify(value));
			return true;
		},
	}
);
