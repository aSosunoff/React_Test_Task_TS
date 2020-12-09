import React, { useCallback, useEffect } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import useForm from "../../hooks/useForm";
import { editContacts } from "../../redux/actions";
import { contactSelector } from "../../redux/selectors/contactsSelectors";
import Modal from "../modal";
import BaseButton from "../UI/button/baseButton";
import Input from "../UI/input";
import { info } from "../../utils/toast";

const INITIAL_VALUES = { id: null, title: "", author: "" };
const INITIAL_VALIDATE = {
	title: {
		required: true,
	},
	author: {
		required: true,
	},
};

function ModalContact({
	contact,
	editContacts,
	isShow,
	onHideModal,
	...props
}) {
	const { values, handlers, setValue, isDisabledAll } = useForm(
		INITIAL_VALUES,
		INITIAL_VALIDATE
	);

	useEffect(() => {
		if (isShow) {
			setValue({
				id: contact.id,
				title: contact.title,
				author: contact.author,
			});
		}
	}, [setValue, isShow, contact]);

	const submitHandler = useCallback(() => {
		editContacts(values);
		info("Контакт изменён");
		onHideModal();
	}, [values, editContacts, onHideModal]);

	return (
		<Modal isShow={isShow} onHideModal={onHideModal} {...props}>
			<Modal.Title>Добавление / Редактирование контактов</Modal.Title>

			<Modal.Body>
				<Input
					label="Наименование"
					value={handlers.title.value}
					onChange={handlers.title.onChange}
					invalid={handlers.title.invalid}
					invalidMessage={handlers.title.invalidMessage}
				/>

				<Input
					label="Автор"
					value={handlers.author.value}
					onChange={handlers.author.onChange}
					invalid={handlers.author.invalid}
					invalidMessage={handlers.author.invalidMessage}
				/>
			</Modal.Body>

			<Modal.Footer>
				<BaseButton disabled={isDisabledAll} onClick={submitHandler}>
					Сохранить
				</BaseButton>
			</Modal.Footer>
		</Modal>
	);
}

export default connect(
	createStructuredSelector({
		contact: contactSelector,
	}),
	{ editContacts }
)(ModalContact);
