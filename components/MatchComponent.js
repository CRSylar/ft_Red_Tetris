import React from 'react';
import Tetris from "../gameComponents/Tetris";
import styles from "../styles/Match.module.css"

function MatchComponent () {
	return (
		<div className={styles.match}>
			<Tetris />
		</div>
	);
}

export default MatchComponent;