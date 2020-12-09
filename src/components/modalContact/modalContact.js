import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { contactSelector } from "../../redux/selectors/contactsSelectors";
/* import cn from "classnames";
import styles from "./modalContact.module.scss"; */
import Modal from "../modal";

function ModalContact({ contact }) {
	const [isShowModal, setShowModal] = useState(false);

	useEffect(() => {
		if (contact) {
			setShowModal(true);
		}
	}, [contact]);

	return (
		<Modal isShow={isShowModal} onHideModal={() => setShowModal(false)}>
			<Modal.Title>Добавление / Редактирование контактов</Modal.Title>
			<Modal.Body>{JSON.stringify(contact)}</Modal.Body>
		</Modal>
	);
}

export default connect(
	createStructuredSelector({
		contact: contactSelector,
	})
)(ModalContact);
