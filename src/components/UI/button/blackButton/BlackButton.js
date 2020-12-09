import React from "react";
import BaseButton from "../baseButton";
import styles from "./blackButton.module.scss";

const BlackButton = ({ children, ...props }) => (
	<BaseButton
		classNameContainer={styles.black}
		classNameButton={styles.button}
		{...props}
	>
		{children}
	</BaseButton>
);

export default BlackButton;
