import {cloneElement} from "react";

export const STAGE_WIDTH = 12
export const STAGE_HEIGHT = 20

export const createStage = () => (
	Array.from( Array(STAGE_HEIGHT), () =>
		new Array(STAGE_WIDTH).fill([0, 'clear'])
	)
)

export const checkCollision = (tetro, stage, {x: moveX, y: moveY}) => {

	let tetroLength = tetro.tetromino.length
	for (let y = 0; y < tetroLength; y += 1) {
		for (let x = 0; x < tetroLength; x += 1) {

			if (tetro.tetromino[y][x] !== 0) {
				if (
				// check that movement is allowed in Y axis
				!stage[y + tetro.pos.y + moveY] ||
					// check that movement is allowed in X axis
					 !stage[y + tetro.pos.y + moveY][x + tetro.pos.x + moveX] ||
					// check if the cell we're moving to is not clear
						stage[y + tetro.pos.y + moveY][x + tetro.pos.x + moveX][1] !== 'clear'
				)
					return true
			}
		}
	}

}

export const insertMalusRows = (stage, setStage,  rows) => {
	const newStage = stage
	for (let i = 0; i < rows; i++){
		newStage.shift()
		newStage.push(new Array(STAGE_WIDTH).fill(['b', 'blocked']))
	}
}

export const drawSpectra = (spectra, id) => {

	const newStage = createStage()
	spectra.map( el => {
		el.columns.map(c => newStage[el.row][c] = [1, 'merged'])
	})

	return [newStage, id]
}