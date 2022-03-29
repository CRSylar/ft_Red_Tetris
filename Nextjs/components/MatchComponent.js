import React, {useEffect} from 'react';
import Tetris from "../gameComponents/Tetris";
import styles from "../styles/Match.module.css"
import {useRouter} from "next/router";
import io from "socket.io-client";

let socket = null

function MatchComponent () {

	const {query} = useRouter()

	useEffect( () => {
		if (!socket) {
			socket = io('http://localhost:8080/', {
				transports: ['websocket']
			})
			const lobby = Object.keys(query)[0].split('[')
			console.log("Lobby OBJT",lobby)
			socket.emit('createRoom', )
			socket.on('Welcome', (payload) => console.log(payload))
		}

		if (socket) return () => socket.disconnect()
	}, [query])

	return (
		<div className={styles.match}>
			<Tetris />
		</div>
	);
}



export default MatchComponent;