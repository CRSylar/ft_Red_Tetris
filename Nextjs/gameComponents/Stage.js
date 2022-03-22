import React from 'react';
import Cell from "./Cell";
import styled from "styled-components";
import {STAGE_HEIGHT, STAGE_WIDTH} from "../gameHelpers/Utility";


const StyledStage = styled.div`
	display: grid;
	grid-template-rows: repeat(
		${STAGE_HEIGHT},
		calc(25vw / ${STAGE_WIDTH})
	);
	grid-template-columns: repeat(${STAGE_WIDTH}, 1fr);
	grid-gap:1px;
	border: 2px solid #333;
	width: 100%;
	max-width: 25vw;
	background: #111;
`


function Stage ({stage}) {
	return (
		<StyledStage>
			{stage.map(row => row.map((cell, x) =>
				<Cell key={x} type={cell[0]} />)
			)}
		</StyledStage>
	);
}

export default Stage;