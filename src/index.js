import React from "react";
import ReactDOM from "react-dom";
import App from "./components/app";
import { Provider } from "react-redux";
import store from "./redux/store";
import "materialize-css/dist/js/materialize.min.js";
import "./assets/index.scss";
import LocalStorage from "./utils/LocalStorage";

store.subscribe(() => {
	LocalStorage.store = store.getState();
});

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById("root")
);
