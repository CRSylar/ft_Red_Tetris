import jwt from "jsonwebtoken";
import errorDispatcher from "../../lib/errorDispatcher";


export default async function handler(req, res) {

	const valid = jwt.verify(req.cookies.Red_Tetris, process.env.JWT_SECRET, {},
		(err, status) => status
	)
	if (!valid){
		res.status(401).json({status: "MissingToken Unauthorized"})
	}
	else {
		try {
			const user = await prisma.user.findUnique({
				where: {
					id: valid.id,
				}
			})
			delete user.password
			res.status(200).json(user)
		} catch (e) {
			errorDispatcher(res, e)
		}

	}
}