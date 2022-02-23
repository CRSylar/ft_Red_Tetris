import React from 'react';
import styled from "styled-components";

const StyledDisplay = styled.div`
	box-sizing: border-box;
	display: flex;
	align-items: center;
	justify-content: center;
	margin: 0 0 1rem 0;
	padding: 1rem;
	border: 4px solid #333;
	min-height: 1.5rem;
	width: 100%;
	border-radius: 20px;
	color: ${props => (props.gameOver ? 'red': '#FFF')};
	background: black;
	font-size: 1rem;
`

function Display ({gameOver, text}) {
	return (
		<StyledDisplay gameOver={gameOver}>{text}</StyledDisplay>
	);
}

export default Display;