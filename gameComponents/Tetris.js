import React from 'react';
import Stage from "./Stage";
import Display from "./Display";
import StartButton from "./StartButton";
import {createStage} from "../gameHelpers/Utility";
import styled from "styled-components";

const StyledTetrisWrapper = styled.div`
	width: 100vw;
	height: 100vh;
`


const StledTetris = styled.div`
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

function Tetris (props) {
	return (
		<StyledTetrisWrapper>
			<StledTetris>

			<Stage stage={createStage()}/>
			<div className={"Aside"}>

				<div>
					<Display text={"Score"}/>
					<Display text={"Rows"}/>
					<Display text={"Level"}/>
				</div>

				<StartButton />

			</div>
			</StledTetris>
		</StyledTetrisWrapper>
	);
}

export default Tetris;