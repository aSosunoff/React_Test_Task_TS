import React, { useCallback, useEffect, useMemo } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import is from "is_js";
import { useForm } from "@asosunoff/react_use_form";
import { editContacts, addContacts } from "../../redux/actions";
import { contactSelector } from "../../redux/selectors/contactsSelectors";
import Modal from "@asosunoff/react-modal";
import BaseButton from "../UI/button/baseButton";
import Input from "../UI/input";
import { info } from "../../utils/toast";

const INITIAL_VALUES = {
  id: {
    value: null,
  },
  name: {
    value: "",
    validation: (value) => {
      if (is.empty(value)) {
        return {
          errorMessage: "Необходимо заполнить поле",
        };
      }
    },
  },
  phone: {
    value: "",
    validation: (value) => {
      if (is.empty(value)) {
        return {
          errorMessage: "Необходимо заполнить поле",
        };
      }
    },
  },
};

function ModalContact({ contact, editContacts, addContacts, isShow, onHideModal }) {
  const initialValues = useMemo(() => {
    if (contact) {
      return Object.entries(contact).reduce(
        (acc, [key, value]) => ({
          ...acc,
          [key]: {
            ...acc[key],
            value,
          },
        }),
        INITIAL_VALUES
      );
    }

    return INITIAL_VALUES;
  }, [contact]);

  console.log(initialValues);

  const { values, handlers, setValue, resetHandler, isInvalidForm } = useForm(initialValues);

  useEffect(() => {
    if (isShow) {
      if (contact?.id) {
        setValue(contact);
      } else {
        resetHandler();
      }
    }
  }, [setValue, resetHandler, isShow, contact]);

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
      <Modal.Title>{contact?.id ? "Редактирование" : "Добавление"} контактов</Modal.Title>

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
          <BaseButton disabled={isInvalidForm} onClick={submitEditHandler}>
            Сохранить
          </BaseButton>
        ) : (
          <BaseButton disabled={isInvalidForm} onClick={submitAddHandler}>
            Сохранить
          </BaseButton>
        )}
        <BaseButton disabled={isInvalidForm} onClick={resetHandler}>
          Сбросить
        </BaseButton>
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
