import React, {useEffect} from 'react';
import SpectreStage from "./SpectreStage";
import {createStage} from "../gameHelpers/Utility";


function Spectrum ({id, spectreStage}) {

	 let stage = createStage()

	if (spectreStage[0] !== null && spectreStage[1] === id)
		stage = spectreStage[0]

	return (
			<SpectreStage stage={stage} />
	);
}

export default Spectrum;