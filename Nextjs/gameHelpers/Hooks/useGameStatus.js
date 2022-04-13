import {useCallback, useEffect, useState} from "react";
import {gameInfo} from "../../gameComponents/Tetris";


export const useGameStatus = (rowsCleared) => {

	const [score, setScore] = useState(0)
	const [rows, setRows] = useState(0)
	const [level, setLevel] = useState(0)

	const Points = [40, 100, 300, 1200]

	const calcScore = useCallback(() => {
		console.log('Row Cleared: ',rowsCleared)
		if (rowsCleared > 0) {

			setScore(prevState => prevState + Points[rowsCleared % 4] * (level + 1))
			gameInfo.bonusRow = rowsCleared - 1
			setRows(prevState => prevState + rowsCleared)
		}
	}, [level, rowsCleared])

	useEffect( () => {
		calcScore()
	}, [calcScore, rowsCleared, score])

	return [score, setScore, level, setLevel, rows, setRows]

}