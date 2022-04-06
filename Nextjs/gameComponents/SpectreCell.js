import React from 'react';
import styled from "styled-components";

const StyledCell = styled.div`
	width: auto;
	background: ${props => props.type === 0 ? '#000' : '#ffba00'  };
`


function SpectreCell ({type}) {
	return (
		<StyledCell type={type} />
	);
}

export default React.memo(SpectreCell);