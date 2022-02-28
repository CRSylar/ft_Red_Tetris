import {useCallback, useState} from "react";
import {randomTetromino, TETROMINOES} from "../../gameComponents/tetrominoes";
import {STAGE_WIDTH} from "../Utility";


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
				x: (prevState.pos.x += x),
				y: (prevState.pos.y += y),
			},
			collided,
		}))
	}

	const spawnTetro = useCallback(() => {
		setTetro({
			pos: {
				x: STAGE_WIDTH / 2 - 2 ,
				y: 0
			},
			tetromino: randomTetromino().shape,
			collided : false,
		})
	})

	return [tetro, updateTetroPos, spawnTetro];
}