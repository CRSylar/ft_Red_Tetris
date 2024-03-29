import {useEffect, useState} from "react";
import {createStage} from "../Utility";
import { gameInfo} from "../../gameComponents/Tetris";

export const useStage = (tetro, spawnTetro) => {

	const [stage, setStage] = useState(createStage())
	const [rowsCleared, setRowsCleared] = useState(0)


	useEffect( () => {
		setRowsCleared(0)

		// Present Stage è quello attuale
		// NewStage in questa funzione è lo stage dopo il controllo di eliminazione riga
		// potrebbe essere lo stesso del present se non viene eliminata nessuna riga
		// Oppure se abbiamo eliminato 1a o + righe newStage contiene il nuovo campo
		const sweepRows = (presentStage) => {
			let i = 0
			return presentStage.reduce((newStage, row, idx) => {
				// contatore righe rimosse in questo reduce
				// cerchiamo almeno una volta il valore 0 (cella vuota) nella riga
				// se non presente ( -1 ) cerco allora se la riga non contiene
				// pezzi bloccati da malus ( non removibili), se anche questo findindex
				// torna -1 allora la riga è completa e va rimossa
				if ((row.findIndex(cell => cell[0] === 0) === -1) &&
					(row.findIndex(cell => cell[1] === 'blocked') === -1)) {
					i++
					// Unshift aggiunge nellArray X nuove righe all'INIZIO, dando l'effetto che il resto
					// scenda di X mantenendo lo Stage di dimensione costante
					newStage.unshift(new Array(presentStage[0].length).fill([0, 'clear']))
					if (idx === 19)
						setRowsCleared(i)

					return newStage
				}
				// altrimenti inseriamo la riga cosi com'é nello stage che stiamo ridisegnando e passiamo
				// alla riga successiva
				if (idx === 19)
					setRowsCleared(i)

				newStage.push(row)
				return newStage
			}, [])
		}


		const update = prevStage => {

			// A ogni iterazione devo ricalcolare tutto lo Stage per
			// Bloccare i pezzi che sono entrati in collisione
			const newStage = prevStage.map( row =>
				row.map( cell => (
					cell[1] === 'clear' ? [0, 'clear'] : cell )
				)
			)

			// Una volta copiato lo Stage controllo le collisioni e cambio opportunamente
			// lo stato di collisione ( solo delle celle con un valore, quelle con 0 saranno sempre Clear
			// per poter permettere gli incastri
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
			// Check for collision
			if (tetro.collided) {
				spawnTetro(gameInfo.allChunks[0])
				gameInfo.collision = true
				return sweepRows(newStage)
			}

			return newStage;
		}

		setStage(prevState => update(prevState))
	}, [tetro])

	return [stage, setStage, rowsCleared];
}