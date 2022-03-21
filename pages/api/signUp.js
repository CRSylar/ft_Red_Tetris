import bcrypt from "bcrypt";
import prisma from "../../lib/prisma";
import errorDispatcher from "../../lib/errorDispatcher";
import jwt from 'jsonwebtoken'
import cookies from "../../utils/cookies";

async function handler(req, res) {

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
		const payload = {
			id: user.id,
			email: user.email,
		}
		const token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: 8600}, {})
		res.cookie('Red_Tetris', token , {path:'/', httpOnly:true})
		res.status(201).json(user)
		res.end(res.getHeader('Set-Cookie'))
	} catch (e) {
		errorDispatcher(res,e)
	}
}

export default cookies(handler)