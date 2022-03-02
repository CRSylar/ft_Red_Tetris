import {useCallback, useState} from "react";
import {randomTetromino, TETROMINOES} from "../../gameComponents/tetrominoes";
import {checkCollision, STAGE_WIDTH} from "../Utility";


export const useTetro = () => {

	const [tetro, setTetro] = useState( {
		pos: {x: 0, y: 0},
		tetromino: TETROMINOES[0].shape,
		collided : false,
	})

	const updateTetroPos = ({x, y, collided}) => {

		setTetro(prevState => ({
			...prevState,
			pos: {
				x: (prevState.pos.x + x),
				y: (prevState.pos.y + y),
			},
			collided,
		}))
	}

	const rotation = (tetromino, direction) => {
		// swap Rows & Cols
		const rotatedTetro = tetromino.map( (_, i) =>
			tetromino.map(col => col[i]
			)
		)

		console.log(rotatedTetro)
		// Reverse row ro get a rotated Tetromino
		if (direction > 0)
			return rotatedTetro.map(row => row.reverse())
		return rotatedTetro.reverse
	}

	const rotateTetro = (stage, direction) => {
		const tetroCp = JSON.parse(JSON.stringify(tetro))
		tetroCp.tetromino = rotation(tetroCp.tetromino, direction)

		const pos = tetroCp.pos.x
		let offset = 1
		while (checkCollision(tetroCp, stage, {x: 0, y:0})) {
			tetroCp.pos.x += offset
			offset = -(offset + (offset > 0 ? 1 : -1))
			if (offset > tetroCp.tetromino[0].length) {
				rotation(tetroCp.tetromino, -direction)
				tetroCp.pos.x = pos
				return
			}
		}

		setTetro(tetroCp)
	}

	const spawnTetro = useCallback(() => {
		setTetro({
			pos: {
				x: STAGE_WIDTH / 2,
				y: 0
			},
			tetromino: randomTetromino().shape,
			collided : false,
		})
	})

	return [tetro, updateTetroPos, spawnTetro, rotateTetro];
}