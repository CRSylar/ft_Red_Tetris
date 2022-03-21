import jwt from "jsonwebtoken";

export default function handler(req, res) {

	const valid = jwt.verify(req.cookies.Red_Tetris, process.env.JWT_SECRET, {}, (err, status) => {
		console.log("E: ", err)
		console.log('S: ', status)
		return status
		}
	)
	if (valid)
		res.status(200).json({ status: 'ValidJWT' })
	else
		res.status(401).json({status: "401 Unauthorized"})
}