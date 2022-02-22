import React from 'react';
import Stage from "./Stage";
import Display from "./Display";
import StartButton from "./StartButton";
import {createStage} from "../gameHelpers/Utility";

function Tetris (props) {
	return (
		<div>
			<Stage stage={createStage()}/>
			{/* <Aside > */}
				<div>
					<Display text={"Score"}/>
					<Display text={"Rows"}/>
					<Display text={"Level"}/>
				</div>
				<StartButton />
			{/* </Aside> */}

		</div>
	);
}

export default Tetris;