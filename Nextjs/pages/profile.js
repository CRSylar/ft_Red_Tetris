import React from 'react';
import WithAuth from "./HOC/WithAuth";
import ProfileComponent from "../components/ProfileComponent";

function Profile () {

	return (
		WithAuth(ProfileComponent)
	)
}

export default Profile