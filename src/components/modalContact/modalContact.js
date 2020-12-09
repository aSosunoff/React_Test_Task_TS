import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import useForm from "../../hooks/useForm";
import { contactSelector } from "../../redux/selectors/contactsSelectors";
import Modal from "../modal";
import BaseButton from "../UI/button/baseButton";
import Input from "../UI/input";

const INITIAL_VALUES = { id: null, title: "", author: "" };
const INITIAL_VALIDATE = {
	title: {
		required: true,
	},
	author: {
		required: true,
	},
};

function ModalContact({ contact }) {
	const [isShowModal, setShowModal] = useState(false);

	const { values, handlers, setValue } = useForm(
		INITIAL_VALUES,
		INITIAL_VALIDATE
	);

	useEffect(() => {
		if (contact) {
			setShowModal(true);
			setValue({
				id: contact.id,
				title: contact.title,
				author: contact.author,
			});
		}
	}, [setValue, contact]);

	return (
		<Modal isShow={isShowModal} onHideModal={() => setShowModal(false)}>
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
				<BaseButton
					onClick={() => {
						console.log(values);
					}}
				>
					Сохранить
				</BaseButton>
			</Modal.Footer>
		</Modal>
	);
}

export default connect(
	createStructuredSelector({
		contact: contactSelector,
	})
)(ModalContact);
