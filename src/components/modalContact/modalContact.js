import React, { useCallback, useEffect } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { useForm } from "../../hooks/useForm/useForm";
import { editContacts, addContacts } from "../../redux/actions";
import { contactSelector } from "../../redux/selectors/contactsSelectors";
import Modal from "../modal";
import BaseButton from "../UI/button/baseButton";
import Input from "../UI/input";
import { info } from "../../utils/toast";

const INITIAL_VALUES = {
	id: null,
	title: {
		value: "",
		validation: { required: true },
	},
	author: {
		value: "",
		validation: { required: true },
	},
};

function ModalContact({
	contact,
	editContacts,
	addContacts,
	isShow,
	onHideModal,
}) {
	const { values, handlers, setValue, reset, isDisabledAll } = useForm(
		INITIAL_VALUES
	);

	useEffect(() => {
		if (isShow) {
			if (contact?.id) {
				setValue({
					id: contact.id,
					title: contact.title,
					author: contact.author,
				});
			} else {
				reset();
			}
		}
	}, [setValue, reset, isShow, contact]);

	const submitEditHandler = useCallback(() => {
		editContacts(values);
		info("Контакт изменён");
		onHideModal();
	}, [values, editContacts, onHideModal]);

	const submitAddHandler = useCallback(() => {
		addContacts({
			title: values.title,
			author: values.author,
		});
		info("Контакт добавлен");
		onHideModal();
	}, [values, addContacts, onHideModal]);

	return (
		<Modal isShow={isShow} onHideModal={onHideModal}>
			<Modal.Title>
				{contact?.id ? "Редактирование" : "Добавление"} контактов
			</Modal.Title>

			<Modal.Body>
				<Input
					label="Наименование"
					value={handlers.title.value}
					onChange={handlers.title.onChange}
					invalid={handlers.title.touched && handlers.title.invalid}
					invalidMessage={handlers.title.invalidMessage}
				/>

				<Input
					label="Автор"
					value={handlers.author.value}
					onChange={handlers.author.onChange}
					invalid={handlers.author.touched && handlers.author.invalid}
					invalidMessage={handlers.author.invalidMessage}
				/>
			</Modal.Body>

			<Modal.Footer>
				{contact?.id ? (
					<BaseButton disabled={isDisabledAll} onClick={submitEditHandler}>
						Сохранить
					</BaseButton>
				) : (
					<BaseButton disabled={isDisabledAll} onClick={submitAddHandler}>
						Сохранить
					</BaseButton>
				)}
			</Modal.Footer>
		</Modal>
	);
}

export default connect(
	createStructuredSelector({
		contact: contactSelector,
	}),
	{ editContacts, addContacts }
)(ModalContact);
