import React from 'react';
import Favico from "./Favico";
import NavBar from "./NavBar";
import styles from "../styles/Home.module.css"

function HomeComponent () {
	return (
		<div className={styles.header}>
			<Favico/>
			{/* NAVBAR */}
			<NavBar/>

			{/* START NEW GAME */}

			{/* RULES & SETTINGS */}

		</div>
	);
}

export default HomeComponent;