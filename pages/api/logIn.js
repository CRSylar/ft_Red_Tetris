import prisma from "../../lib/prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cookies from "../../utils/cookies";

async function handler (req, res) {

	const {Email, Password} = req.body

	const user = await prisma.user.findUnique({
		where: {
			email: Email
		}
	})
	if (!user)
		res.status(404).json({status: 'error', message: 'User not Found'})
	else {
		if (bcrypt.compareSync(Password, user.password)) {
			delete user.password
			const payload = {
				id: user.id,
				email: user.email,
			}
			const token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: 86400}, {})
			res.cookie('Red_Tetris', token , {path:'/', httpOnly:true, maxAge: 86400})
			res.status(200).json(user)
		}
		else
			res.status(401).json({status: 'warning', message: 'Unauthorized, Wrong Password'})
	}
}

export default cookies(handler)