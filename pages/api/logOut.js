
import cookies from "../../utils/cookies";

async function handler(req, res) {
	res.cookie('Red_Tetris', '', {logout: true, path: "/", httpOnly: true})
	res.end()
}

export default cookies(handler)