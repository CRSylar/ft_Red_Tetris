
export const allPlayerMap = new Map()

export function generateChunks() : string[] {
	const tetrominos : string = 'IJLOSTZ'
	const randTetromino: string[] = new Array
	for (let i = 0; i < 10;i++) {
		randTetromino.push(tetrominos[Math.floor(Math.random() * tetrominos.length)])
	}
	return randTetromino
}