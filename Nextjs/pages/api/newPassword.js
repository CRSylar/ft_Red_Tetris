import prisma from "../../lib/prisma";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import errorDispatcher from "../../lib/errorDispatcher";

export default async function handler(req, res) {

	const valid = jwt.verify(req.cookies.Red_Tetris, process.env.JWT_SECRET, {},
		(err, status) => status
	)
	if (!valid){
		res.status(401).json({status:'error', message: "Unauthorized, Missing or Invalid Token"})
	}
	else {
		try {
			const {data} = req.body
			const hash = await bcrypt.hashSync(data.password, 10)
			await prisma.user.update({
				where: {
					id: valid.id
				},
				data: {
					password: hash
				}
			})
			res.status(201).json({status: 'success', message: "Password Updated!"})
		} catch (e) {
			errorDispatcher(res, e)
		}
	}
}