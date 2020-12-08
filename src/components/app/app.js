import React from "react";
import { Switch, Redirect, BrowserRouter } from "react-router-dom";
import EmptyLayout from "../layout/emptyLayout";
import MainLayout from "../layout/mainLayout";
import Contacts from "../pages/contacts";
import Login from "../pages/login";

const App = () => {
	return (
		<BrowserRouter>
			<Switch>
				<Redirect exact from="/" to="/contacts" />

				<MainLayout path="/contacts">
					<Contacts />
				</MainLayout>

				<EmptyLayout path="/login">
					<Login />
				</EmptyLayout>
			</Switch>
		</BrowserRouter>
	);
};

export default App;
