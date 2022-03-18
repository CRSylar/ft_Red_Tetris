import {Server as ServerIO} from 'socket.io'

export default async function socketHandler(req, res){
	if (!res.socket.server.io) {
		console.log("New socket.io server...")

		const httpserver = req.socket.server
		res.socket.server.io = new ServerIO(httpserver, {
			path: "/api/socket.io"
		});
	}
	res.end()
}
