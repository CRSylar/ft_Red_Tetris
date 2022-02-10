import React from 'react';
import WithAuth from "./HOC/WithAuth";
import HomeComponent from "../components/HomeComponent";

function Home () {
	return (
		WithAuth(HomeComponent)
	);
}

export default Home;