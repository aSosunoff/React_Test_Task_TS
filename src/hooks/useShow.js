import { useCallback, useState } from "react";

export default (initial) => {
	const [isShow, setShow] = useState(initial);

	const show = useCallback(() => {
		setShow(true);
	}, []);

	const hide = useCallback(() => {
		setShow(false);
	}, []);

	return {
		isShow,
		show,
		hide,
	};
};
