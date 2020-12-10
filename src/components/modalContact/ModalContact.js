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
	name: {
		value: "",
		validation: { required: true },
	},
	phone: {
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
				setValue(contact);
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
		addContacts(values);
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
					label="Имя"
					value={handlers.name.value}
					onChange={handlers.name.onChange}
					invalid={handlers.name.touched && handlers.name.invalid}
					invalidMessage={handlers.name.invalidMessage}
				/>

				<Input
					label="Телефон"
					value={handlers.phone.value}
					onChange={handlers.phone.onChange}
					invalid={handlers.phone.touched && handlers.phone.invalid}
					invalidMessage={handlers.phone.invalidMessage}
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
