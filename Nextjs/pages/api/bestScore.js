import prisma from "../../lib/prisma";
import jwt from "jsonwebtoken";
import errorDispatcher from "../../lib/errorDispatcher";

export default async function handler(req, res) {

	console.log('=> ', req.body)
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

			console.log(user)

			if (user?.bestScore < score) {
				console.log('qua ', score)
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
			console.log(e)
			errorDispatcher(res, e);
		}
	}
}

