import React, {useState} from 'react';
import Stage from "./Stage";
import Display from "./Display";
import StartButton from "./StartButton";
import {checkCollision, createStage} from "../gameHelpers/Utility";
import styled from "styled-components";
import {useTetro} from "../gameHelpers/Hooks/useTetro";
import {useStage} from "../gameHelpers/Hooks/useStage";
import {useInterval} from "../gameHelpers/Hooks/useInterval";

// Styled Components
const StyledTetrisWrapper = styled.div`
	width: 100vw;
	height: 80vh;
`

const StyledTetris = styled.div`
	display: flex;
	justify-content: center;
	align-items: flex-start;
	padding: 2.5rem;
	margin: 2rem auto;
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
	const [stage, setStage] = useStage(tetro, spawnTetro);

//	console.log('re-render')

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
	}

	const drop = () => {
		if (!checkCollision(tetro, stage, {x: 0, y: 1}))
			updateTetroPos({x: 0, y: 1, collided: false})
		else {
			updateTetroPos({x: 0, y: 0, collided: true})
			if (tetro.pos.y < 1) {
				console.log("GAME OVER!")
				setGameOVer(true)
				setSpeed(null)
			}
		}
	}

	const keyUp = ({keyCode}) => {
		if (!gameOver && keyCode === 40)
		{
			setSpeed(1000)

			console.log('speed ON')
		}
	}

	const dropTetro = () => {
		console.log('speed OFF')
		setSpeed(null)
		drop()
	}

	const move = ({keyCode}) => {
		if (gameOver)
			return
		switch (keyCode) {
			case 37:
				moveTetro(-1)
				break;
			case 39:
				moveTetro(1)
				break;
			case 40:
				dropTetro()
				break;
			case 38:
				rotateTetro(stage, 1)
				break;
		}
		console.log(keyCode)
	}

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
							<Display text={"Score"}/>
							<Display text={"Rows"}/>
							<Display text={"Level"}/>
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