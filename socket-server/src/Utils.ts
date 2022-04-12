import playerStatusDto from "dtos/playerStatus.dto";
import gameStatusDto from "../dtos/gameStatus.dto";

export const allPlayerMap = new Map<string, playerStatusDto>()
export const allRoomStatus = new Map<string, gameStatusDto>()

export function generateChunks() : string[] {
	const tetrominos : string = 'IJLOSTZ'
	const randTetromino: string[] = new Array
	for (let i = 0; i < 10;i++) {
		randTetromino.push(tetrominos[Math.floor(Math.random() * tetrominos.length)])
	}
	return randTetromino
}