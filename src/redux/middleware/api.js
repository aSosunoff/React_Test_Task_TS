import { FAILURE, REQUEST, SUCCESS } from "../types";
import axios from "../../utils/axios";

export default (store) => (next) => async (action) => {
	if (!action.CallAPI) return next(action);

	const { CallAPI, methodAPI, paramsAPI, type, ...rest } = action;

	next({ ...rest, type: type + REQUEST });

	try {
		const { data } = await axios[methodAPI](CallAPI, paramsAPI);

		return next({ ...rest, type: type + SUCCESS, response: data });
	} catch (error) {
		throw next({ ...rest, type: type + FAILURE, error });
	}
};
