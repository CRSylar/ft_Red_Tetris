import prisma from "../../lib/prisma";

export default async function handler(req, res) {

	const users = await prisma.user.findMany({})

	users.forEach( (user) => delete user.password)

	res.json(users)
}