import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import Table from "@asosunoff/react-table";
import { loadContacts, deleteContacts, addContacts } from "../redux/actions";
import { contactsSelectors } from "../redux/selectors";
import { danger } from "../utils/toast";
import Modal from "../components/modal";

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
						handler: ({ id }) => setIdContact(id),
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

			<Modal id={idContact} />
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
