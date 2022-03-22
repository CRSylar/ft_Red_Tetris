import React, {useState} from 'react';
import Stage from "./Stage";
import Display from "./Display";
import StartButton from "./StartButton";
import {checkCollision, createStage} from "../gameHelpers/Utility";
import styled from "styled-components";
import {useTetro} from "../gameHelpers/Hooks/useTetro";
import {useStage} from "../gameHelpers/Hooks/useStage";
import {useInterval} from "../gameHelpers/Hooks/useInterval";
import {useGameStatus} from "../gameHelpers/Hooks/useGameStatus";

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

function Tetris () {

	const [speed, setSpeed] = useState(null);
	const [gameOver, setGameOVer] = useState(false);

	const [tetro, updateTetroPos, spawnTetro, rotateTetro] = useTetro();
	const [stage, setStage, rowsCleared] = useStage(tetro, spawnTetro);
	const [score, setScore, level, setLevel, rows, setRows] = useGameStatus(rowsCleared);

//	console.log('re-render')

	// Movimento laterale del Tetro
	const moveTetro = dir => {
		if (!checkCollision(tetro, stage, {x: dir, y: 0}))
			updateTetroPos({x: dir, y: 0})
	}

	const startGame = () => {
		// Reset everything
		setStage(createStage())
		setSpeed(1000)
		spawnTetro()
		setGameOVer(false)
		setScore(0)
		setRows(0)
		setLevel(0)
	}

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
				<StartButton callback={startGame} />

			</div>
			</StyledTetris>
		</StyledTetrisWrapper>
	);
}

export default Tetris;