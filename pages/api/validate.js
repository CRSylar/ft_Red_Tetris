import jwt from "jsonwebtoken";
import errorDispatcher from "../../lib/errorDispatcher";


export default async function handler(req, res) {

	const valid = jwt.verify(req.cookies.Red_Tetris, process.env.JWT_SECRET, {},
		(err, status) => status
	)
	if (!valid)
		res.status(401).json({status: "401 Unauthorized"})
	else {
		const decoded = jwt.decode(req.cookies.Red_Tetris)

		try {
			const user = await prisma.user.findUnique({
				where: {
					id: decoded.id,
				}
			})
			delete user.password
			res.status(200).json(user)
		} catch (e) {
			errorDispatcher(e)
		}

	}
}