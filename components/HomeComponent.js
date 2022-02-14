import React from 'react';
import Favico from "./Favico";
import NavBar from "./NavBar";
import styles from "../styles/Home.module.css"
import {Button} from "@mui/material";

function HomeComponent () {
	return (
		<div className={styles.container}>
			<Favico/>
			{/* NAVBAR */}
			<NavBar/>

			{/* START NEW GAME */}
			<div className={styles.play__box}>
				<h1 className={styles.title}>
				{'Play'}</h1>
			</div>

			{/* RULES & SETTINGS */}

		</div>
	);
}

export default HomeComponent;