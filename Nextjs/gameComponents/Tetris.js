import React, {useCallback, useEffect, useState} from 'react';
import Stage from "./Stage";
import Display from "./Display";
import StartButton from "./StartButton";
import {checkCollision, createStage, drawSpectra} from "../gameHelpers/Utility";
import styled from "styled-components";
import {useTetro} from "../gameHelpers/Hooks/useTetro";
import {useStage} from "../gameHelpers/Hooks/useStage";
import {useInterval} from "../gameHelpers/Hooks/useInterval";
import {useGameStatus} from "../gameHelpers/Hooks/useGameStatus";
import {useRouter} from "next/router";
import io from "socket.io-client";
import Spectrum from "./Spectrum";

// Socket.io Instance
let socket = null

export const gameInfo = {allChunks: [], collision: false, bonusRow: 0 }

// Styled Components
const StyledTetrisWrapper = styled.div`
	width: 100vw;
	height: 100vh;
`

const StyledTetris = styled.div`
	display: flex;
	justify-content: center;
	align-items: flex-start;
	padding: 2.5rem;
	margin: auto;
	max-width: 900px;
	
	.Aside {
		width: 100%;
		max-width: 200px;
		display: block;
		padding: 0 20px;
	}
`
// Main Function of Game
function Tetris () {

	const [speed, setSpeed] = useState(null);
	const [inGame, setInGame] = useState(false);
	const [gameOver, setGameOVer] = useState(false);
	/* participants means the socket id of each player */
	const [participants, setParticipants] = useState([])
	const [spectreStage, setSpectreStage] = useState([null, null])

	const [tetro, updateTetroPos, spawnTetro, rotateTetro] = useTetro();
	const [stage, setStage, rowsCleared] = useStage(tetro, spawnTetro);
	const [score, setScore, level, setLevel, rows, setRows] = useGameStatus(rowsCleared);

	const {query} = useRouter()
	const Tlobby = Object.keys(query)[0]?.split('[')[0]
	const [host, setHost] = useState(false)

	// Connessione al WebSocket
	useEffect( () => {
		/* Create socket instance & emit the join request */
		if (!socket) {
			socket = io('http://localhost:8080/', {
				transports: ['websocket']
			})
			socket.emit('joinRoom', Tlobby )
			/* All Listeners */
				// join to exising room listener
			socket.on('Welcome', ({msg, payload}) => {
				console.log(msg)
				setHost(payload)
			})
				// join to newly created room listener (will turn off the welcome listener)
			socket.on('Created', ({msg, payload}) => {
				console.log(msg)
				setHost(payload)
				socket.off('Welcome')
			})
				// Host has started the game listener
			socket.on('startGame', ({chunks, participants}) => {
				setParticipants(participants.filter(player => player !== socket.id))
				//setParticipants(['1', '2', '3'])
				chunks.map( (chunk) => gameInfo.allChunks.push(chunk))
				startGame()
			})
				// More chunks coming from server
			socket.on('servingChunks',
				({chunks}) => chunks.map( chunk => gameInfo.allChunks.push(chunk)))
				// Receiving the spectre of other player's stage
			socket.on('scatteringSpectra', ({spectra, id}) => {
				setSpectreStage(drawSpectra(spectra, id))
			})
				// Receiving maluses when other player sweep more rows
			socket.on('emittingMalusRows', ({value}) => {
				console.log(value)
			})
		}

		if (socket) return () => socket.disconnect()
	}, [Tlobby, query, startGame])

	useEffect( () => {
		if (gameInfo.collision){
			gameInfo.allChunks.shift()
			gameInfo.collision = false
			socket?.emit('spectreUpdate', {stage, room: Tlobby})
			if (gameInfo.allChunks.length === 3)
				socket?.emit('moreChunkRequest', {room: Tlobby})
		}
	}, [gameInfo.collision])

	useEffect( () => {
		if (gameInfo.bonusRow > 0) {
			emitMalus()
			gameInfo.bonusRow = 0
		}
	}, [gameInfo.bonusRow])

	/* Emitters */
	const emitStartGame = () => {
		socket?.emit('startGameReq', {room: Tlobby})
	}

	const emitMalus = () => {
		socket?.emit('malusRowsRequest', {value : gameInfo.bonusRow , room:Tlobby})
	}

	// Movimento laterale del Tetro
	const moveTetro = dir => {
		if (!checkCollision(tetro, stage, {x: dir, y: 0}))
			updateTetroPos({x: dir, y: 0})
	}

	const startGame = useCallback(() => {
		// Reset everything
		setInGame(true)
		setStage(createStage())
		setSpeed(1000)
		spawnTetro(gameInfo.allChunks[0])
		gameInfo.allChunks.shift()
		setGameOVer(false)
		setScore(0)
		setRows(0)
		setLevel(0)
	}, [setLevel, setRows, setScore, setStage, spawnTetro])

	// Drop the Tetro by 1 line
	const drop = () => {
		// increase level & speed every 10rows
		if (rows > (level + 1) * 10) {
			setLevel(prevState => prevState + 1)
			setSpeed( 1000 / (level + 1) + 200)
		}
		// controllo collisione
		if (!checkCollision(tetro, stage, {x: 0, y: 1}))
			updateTetroPos({x: 0, y: 1, collided: false})
		else {
			updateTetroPos({x: 0, y: 0, collided: true})
			// Check se la collisione porta a un game over in caso siamo arrivati in cima alla griglia
			if (tetro.pos.y < 1) {
				console.log("GAME OVER!")
				setGameOVer(true)
				setSpeed(null)
			}
		}
	}

	// Al Rilascio del tasto DOWN riattiviamo la velocita del tetro
	// per il movimento "automatico"
	const keyUp = ({keyCode}) => {
		if (!gameOver && keyCode === 40)
			setSpeed(1000 / (level + 1) + 200)
	}

	// Usando DOWN il tetro scende di 1 riga, per evitare doppi movimenti
	// imposto la velocita momentaneamente a 0
	const dropTetro = () => {
		setSpeed(null)
		drop()
	}

	// Movimento del Tetro
	const move = ({keyCode}) => {
		if (gameOver)
			return
		switch (keyCode) {
			// LEFT
			case 37:
				moveTetro(-1)
				break;
			// RIGHT
			case 39:
				moveTetro(1)
				break;
			// DOWN
			case 40:
				dropTetro()
				break;
			// UP
			case 38:
				rotateTetro(stage, 1)
				break;
		}
	}

	// Automatically drop the Tetro at specified speed
	useInterval( () => {
		drop()
	}, speed)

	return (
		<StyledTetrisWrapper role={"button"} tabIndex={"0"}
		                     onKeyDown={e => move(e)} onKeyUp={keyUp} >
			{/* Actual player  */}
			<StyledTetris>
				<Stage stage={stage}/>

				<div className={"Aside"}>
					{gameOver ?
						(<Display gameOver={gameOver} text={'Game Over'} />)
						:
						(
							<div>
								<Display text={`Score: ${score}`}/>
								<Display text={`Rows: ${rows}`}/>
								<Display text={`Level: ${level}`}/>
							</div>
						)
					}
					{
						!inGame && (
							host ?
								(<StartButton callback={emitStartGame} />)
								:
								(<span style={{color:"white"}}>{'The game will start when the Host player is ready'}</span>))
					}

				</div>
			</StyledTetris>

			{/* Other Players */}
			<div style={{display:'flex', marginLeft:'1.5rem', overflowX:'scroll' }}>
			{
				participants.map( (el) => <Spectrum key={el} id={el} spectreStage={spectreStage} />)
			}
			</div>

		</StyledTetrisWrapper>
	);
}

export default Tetris;