import prisma from "../../lib/prisma";
import jwt from "jsonwebtoken";
import errorDispatcher from "../../lib/errorDispatcher";

export default async function handler(req, res) {

	const valid = jwt.verify(req.cookies.Red_Tetris, process.env.JWT_SECRET, {},
		(err, status) => status
	)
	if (!valid){
		res.status(401).end()
	}
	else {
		const score = req.body.score
		try {
			const user = await prisma.user.findUnique({
				where: {
					id: valid.id
				}
			})

			if (user?.bestScore < score) {
				await prisma.user.update({
					where: {
						id : valid.id
					},
					data : {
						bestScore : score
					}
				})
			}
			res.status(200).end()
		} catch (e) {
			errorDispatcher(res, e);
		}
	}
}

