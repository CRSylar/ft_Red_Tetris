
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
			if (tetro.tetromino[y][x] !== 0) {
				// check that movement is allowed in Y axis
				if (
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