import React, {useEffect} from 'react';
import SpectreStage from "./SpectreStage";
import {createStage} from "../gameHelpers/Utility";


function Spectrum ({id, name, spectreStage}) {

	 let stage = createStage()

	if (spectreStage[0] !== null && spectreStage[1] === id)
		stage = spectreStage[0]

	return (
		<div style={{width: '120px', margin:'0.5rem'}}>
			<div style={{color:"white", display:'flex', justifyContent:'center'}}>
				{name}

			</div>
			<SpectreStage stage={stage} />
		</div>
	);
}

export default Spectrum;