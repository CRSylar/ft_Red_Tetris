
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

			//
		}
	}

}