import React from 'react';
import WithAuth from "./HOC/WithAuth";
import SettingsComponent from "../components/SettingsComponent";

function Settings () {
	return (
		WithAuth(SettingsComponent)
	);
}

export default Settings;