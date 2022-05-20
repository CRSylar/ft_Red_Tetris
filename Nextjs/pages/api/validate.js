import jwt from "jsonwebtoken";
import errorDispatcher from "../../lib/errorDispatcher";
import cookies from "../../utils/cookies";

async function handler(req, res) {

	const valid = jwt.verify(req.cookies.Red_Tetris, process.env.JWT_SECRET, {},
		(err, status) => {
				return status
		}
	)
	if (!valid){
		res.cookie('Red_Tetris', '', {logout: true, path: "/", httpOnly: true})
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
			console.log(e)
			errorDispatcher(res, e)
		}

	}
}

export default cookies(handler)