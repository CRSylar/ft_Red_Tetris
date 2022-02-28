import {useEffect, useState} from "react";
import {createStage} from "../Utility";

export const useStage = (tetro, spawnTetro) => {

	const [stage, setStage] = useState(createStage())

	useEffect( () => {
		const update = prevStage => {

			const newStage = prevStage.map( row =>
				row.map( cell => (
					cell[1] === 'clear' ? [0, 'clear'] : cell )
				)
			)

			tetro.tetromino.forEach( (row, y) => {
				row.forEach( (val, x) => {
					if (val !== 0) {
						newStage[y + tetro.pos.y][x + tetro.pos.x] = [
							val,
							`${tetro.collided ? 'merged' : 'clear'}`,
						]
					}
				})
			})

			return newStage;
		}

		setStage(prevState => update(prevState))

	}, [tetro])

	return [stage, setStage];
}