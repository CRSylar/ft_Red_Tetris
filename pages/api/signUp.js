import bcrypt from "bcrypt";
import prisma from "../../lib/prisma";
import errorDispatcher from "../../lib/errorDispatcher";

export default async function handler(req, res) {

	const {Username, email, Password} = req.body;
	const hash = await bcrypt.hashSync(Password, 10)

	try {
		const user = await prisma.user.create({
			data: {
				username: Username,
				email: email,
				password: hash
			}
		})
		delete user.password
		res.status(201).json({user})
	} catch (e) {
		errorDispatcher(res,e)
	}
}