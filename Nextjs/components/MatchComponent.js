import React, {useEffect, useState} from 'react';
import Tetris from "../gameComponents/Tetris";
import styles from "../styles/Match.module.css"
import {useRouter} from "next/router";
import io from "socket.io-client";

let socket = null

function MatchComponent () {

	const {query} = useRouter()
	const [host, setHost] = useState(false)

	useEffect( () => {
		if (!socket) {
			socket = io('http://localhost:8080/', {
				transports: ['websocket']
			})
			const lobby = Object.keys(query)[0].split('[')
			socket.emit('joinRoom', lobby[0] )
			socket.on('Welcome', ({msg, payload}) => {
				console.log(msg)
				setHost(payload)
			})
			socket.on('Created', ({msg, payload}) => {
				console.log(msg)
				setHost(payload)
				})
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