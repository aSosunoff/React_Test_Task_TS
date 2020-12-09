import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { contactSelector } from "../../redux/selectors/contactsSelectors";

const Modal = ({ contact }) => {
	return <div>{JSON.stringify(contact)}</div>;
};

export default connect(
	createStructuredSelector({
		contact: contactSelector,
	})
)(Modal);
