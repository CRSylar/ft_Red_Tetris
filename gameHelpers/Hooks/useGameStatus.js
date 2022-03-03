import {useCallback, useEffect, useState} from "react";


export const useGameStatus = (rowsCleared) => {

	const [score, setScore] = useState(0)
	const [rows, setRows] = useState(0)
	const [level, setLevel] = useState(0)

	const Points = [40, 100, 300, 1200]

	const calcScore = useCallback(() => {

		if (rowsCleared > 0) {
			setScore(prevState =>
				prevState + Points[(rowsCleared - 1) % 4] * (level + 1)
			)

			setRows(prevState => prevState + rowsCleared)
		}
	}, [level, Points, rowsCleared])

	useEffect( () => {
		calcScore()
	}, [calcScore, rowsCleared, score])

	return [score, setScore, level, setLevel, rows, setRows]

}