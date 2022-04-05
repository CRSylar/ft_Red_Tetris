import {useCallback, useEffect, useState} from "react";
import {gameInfo} from "../../gameComponents/Tetris";


export const useGameStatus = (rowsCleared) => {

	const [score, setScore] = useState(0)
	const [rows, setRows] = useState(0)
	const [level, setLevel] = useState(0)

	const Points = [40, 100, 300, 1200]

	const calcScore = useCallback(() => {

		if (rowsCleared > 0) {

			setScore(prevState => {
				console.log(rowsCleared)
				return prevState + Points[(rowsCleared - 2) % 4] * (level + 1)
				}
			)
			gameInfo.bonusRow = rowsCleared - 2
			setRows(prevState => prevState + (rowsCleared - 1))
		}
	}, [level, Points, rowsCleared])

	useEffect( () => {
		calcScore()
	}, [calcScore, rowsCleared, score])

	return [score, setScore, level, setLevel, rows, setRows]

}