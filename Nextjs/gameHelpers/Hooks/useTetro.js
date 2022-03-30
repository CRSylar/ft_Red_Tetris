import {useCallback, useState} from "react";
import {selectTetromino, TETROMINOES} from "../../gameComponents/tetrominoes";
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

		// Reverse row to get a rotated Tetromino
		if (direction > 0)
			return rotatedTetro.map(row => row.reverse())
	}

	const rotateTetro = (stage, direction) => {
		// Copia Profonda del tetro per modifica
		const tetroCp = JSON.parse(JSON.stringify(tetro))
		tetroCp.tetromino = rotation(tetroCp.tetromino, direction)

		const pos = tetroCp.pos.x
		let offset = 1
		// Controllo su tutta la riga se la rotazione del tetro causa una sovrapposizione
		// ( non posso rotare), il ciclo while serve per "allargare" la ricerca da 1 cella a + celle
		// intorno al pezzo da ruotare, se OFFSET diventa > della Grandezza del pezzo significa che ho trovato
		// impedimenti alla rotazione ALMENO fino a quella grandezza quindi non posso ruotare
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

	// Spawn di un Pezzo random in posizione centrale
	const spawnTetro = useCallback((chunk) => {
		setTetro({
			pos: {
				x: STAGE_WIDTH / 2 - 2,
				y: 0
			},
			tetromino: selectTetromino(chunk).shape,
			collided : false,
		})
	}, [])

	return [tetro, updateTetroPos, spawnTetro, rotateTetro];
}