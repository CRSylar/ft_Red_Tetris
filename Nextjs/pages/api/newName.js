import prisma from "../../lib/prisma";
import jwt from "jsonwebtoken";
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
			const {newUserName} = req.body
			const user = await prisma.user.update({
				where: {
					id: valid.id
				},
				data: {
					username: newUserName
				}
			})
			delete user.password
			res.status(201).json({status: 'success', message: 'userName Updated Successfully', user})
		} catch (e) {
			errorDispatcher(res, e)
		}
	}
}
