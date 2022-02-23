import React from 'react';
import styled from "styled-components";

const StyledStartButton = styled.button`
	box-sizing: border-box;
	margin: 0 0 1rem 0;
	padding: 1rem;
	min-height: 1.5rem;
	width: 100%;
	border-radius: 20px;
	border: none;
	color: white;
	background: #333;
	font-size: 1rem;
	outline: none;
	cursor: pointer;
`

function StartButton ({callback}) {
	return (
		<StyledStartButton onClick={callback}>{'Start Game!'}</StyledStartButton>
	);
}

export default StartButton;