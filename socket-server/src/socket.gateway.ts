import {
	OnGatewayConnection,
	OnGatewayDisconnect,
	OnGatewayInit, SubscribeMessage,
	WebSocketGateway, WebSocketServer,
} from '@nestjs/websockets';
import {Socket, Server } from "socket.io";
import { Logger } from "@nestjs/common";
import { generateChunks } from './Utils';

@WebSocketGateway(3001,{ transport: ['websocket'], path: '/socket.io' })
export class socketGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {

	@WebSocketServer() server: Server
	private logger: Logger = new Logger('socketGateway')

	afterInit(server : Server) : any {
		this.logger.log('Initialization')
	}

	handleConnection(client : Socket, ...args : any[]) : any {
		this.logger.log('Client Connected: ', client.id)
	}

	handleDisconnect(client : Socket) : any {
		this.logger.log('Client Disconnected: ', client.id)
	}

	@SubscribeMessage('joinRoom')
	createRoomRequest(client: Socket, payload: string) {
		// Check if the room exist in this object
		const rooms = this.server.sockets.adapter.rooms
		if ( rooms.get(payload)?.size ) {
			this.logger.log('Joined')
			client.join(payload)
			this.server.to(payload).emit('Welcome', {
				msg: `Sei Entrato nella Lobby: ${ payload }`,
				payload: false,
			})
		}
		else {
			this.logger.log('Created')
			client.join(payload)
			this.server.to(payload).emit('Created', {
				msg: `Sei il Propietario della Lobby: ${ payload }`,
				payload: true,
			})
		}
	}

	@SubscribeMessage('startGameReq')
	startGame(client: Socket, payload: {room: string}) {
		console.log("Richiesta di start da : ", client.id, "nella Room: ", payload.room)
		const chunks = generateChunks()
		console.log('Chunks: ', chunks)
		this.server.to(payload.room).emit('startGame', {chunks})
	}

}