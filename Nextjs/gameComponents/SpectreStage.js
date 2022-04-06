import React from 'react';
import styled from "styled-components";
import {STAGE_HEIGHT, STAGE_WIDTH} from "../gameHelpers/Utility";
import SpectreCell from "./SpectreCell";


const StyledStage = styled.div`
	display: grid;
	grid-template-rows: repeat(
		${STAGE_HEIGHT},
		calc(25vw / ${STAGE_WIDTH})
	);
	grid-template-columns: repeat(${STAGE_WIDTH}, 1fr);
	width: 100%;
	margin: 0.5rem;
	max-width: 25vw;
	background: #000;
`


function SpectreStage ({stage}) {
	return (
		<StyledStage>
			{stage.map(row => row.map((cell, x) =>
				<SpectreCell key={x} type={cell[0]} />)
			)}
		</StyledStage>
	);
}

export default SpectreStage;