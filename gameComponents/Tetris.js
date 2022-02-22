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
	align-items: flex-start;
	padding: 40px;
	margin: 0 auto;
	max-width: 900px;
	
	aside {
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
			{/* <Aside > */}
				<div>
					<Display text={"Score"}/>
					<Display text={"Rows"}/>
					<Display text={"Level"}/>
				</div>
				<StartButton />
			{/* </Aside> */}

			</StledTetris>
		</StyledTetrisWrapper>
	);
}

export default Tetris;