import { useEffect, useState} from "react";
import {gameInfo} from "../../gameComponents/Tetris";


export const useGameStatus = (rowsCleared = 0) => {

	const [score, setScore] = useState(0)
	const [rows, setRows] = useState(0)
	const [level, setLevel] = useState(0)

	const Points = [1200, 40, 100, 300]

	useEffect( () => {

		console.log('Row Cleared: ',rowsCleared)
		if (rowsCleared > 0) {

			setScore(prevState => prevState + Points[rowsCleared % 4] * (level + 1))
			gameInfo.bonusRow = rowsCleared - 1
			setRows(prevState => prevState + rowsCleared)
		}
	}, [rowsCleared])

	return [score, setScore, level, setLevel, rows, setRows]

}