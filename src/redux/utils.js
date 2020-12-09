import { createSelector } from "reselect";

export const arrToMap = (arr) =>
	arr.reduce((acc, item) => ({ ...acc, [item.id]: item }), {});

const idSelector = (_, props) => props.id;

export const getById = (selector, defaultValue) =>
	createSelector(
		selector,
		idSelector,
		(entity, id) =>
			(Array.isArray(entity)
				? entity.find((element) => element.id === id)
				: entity[id]) || defaultValue
	);

export const mapToArray = (selector) => createSelector(selector, Object.values);
