import React from 'react';
import Box from "@mui/material/Box";
import styled from "styled-components";
import {TETROMINOES} from "./tetrominoes";

const StyledCell = styled.div`
	width: auto;
	background: rgba(${props => props.color}, 0.8);
	border: ${props => (props.type === 0? '0px solid': '4px solid')};
  border-bottom-color: rgba(${props => props.color}, 0.1);
  border-right-color: rgba(${props => props.color}, 1);
  border-top-color: rgba(${props => props.color}, 1);
  border-left-color: rgba(${props => props.color}, 0.3);
`


function Cell ({type}) {
	return (
		<StyledCell type={type} color={TETROMINOES[type].color} />
	);
}

export default Cell;