import {useStage} from "./useStage";
import {useCallback, useEffect} from "react";


export const useGameStatus = (rowsCleared) => {

	const [score, setScore] = useStage(0)
	const [rows, setRows] = useStage(0)
	const [level, setLevel] = useStage(0)

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