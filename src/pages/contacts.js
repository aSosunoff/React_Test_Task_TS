import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import Table from "@asosunoff/react-table";
import { loadContacts, deleteContacts, addContacts } from "../redux/actions";
import { contactsSelectors } from "../redux/selectors";
import { danger } from "../utils/toast";
import ModalContact from "../components/modalContact";

const Contacts = ({
	loadContacts,
	deleteContacts,
	contactsError,
	addContacts,
	contacts,
}) => {
	useEffect(() => {
		loadContacts();
	}, [loadContacts]);

	useEffect(() => {
		if (contactsError) {
			danger(contactsError.message);
		}
	}, [contactsError]);

	const [idContact, setIdContact] = useState(null);

	const [isShowModal, setShowModal] = useState(false);

	return (
		<>
			<Table
				title="Контакты"
				list={contacts}
				header={{
					title: {
						titleHead: "Наименование",
						titleCell: true,
						order: {
							type: "string",
							direction: "asc",
						},
						filter: {
							type: "text",
						},
					},
					author: {
						titleHead: "Автор",
						titleCell: true,
						order: {
							type: "string",
							direction: "asc",
						},
						filter: {
							type: "text",
						},
					},
				}}
				rowsBtn={[
					{
						title: "Редактировать контакт",
						handler: ({ id }) => {
							setShowModal(true);
							setIdContact(id);
						},
						icon: "edit",
					},
					{
						title: "Удалить контакт",
						handler: ({ id }) => deleteContacts(id),
						icon: "delete",
					},
				]}
				controlPanel={[
					{
						title: "Добавить контакт",
						handler: () => {
							addContacts({
								title: "test",
								author: "test author",
							});
						},
					},
				]}
				pageSize={10}
				onUnselectRecord={() => setIdContact(null)}
			/>

			<ModalContact
				id={idContact}
				isShow={isShowModal}
				onHideModal={() => setShowModal(false)}
			/>
		</>
	);
};

export default connect(
	createStructuredSelector({
		contacts: contactsSelectors.listSelector,
		contactsError: contactsSelectors.errorSelector,
	}),
	{
		loadContacts,
		deleteContacts,
		addContacts,
	}
)(Contacts);
