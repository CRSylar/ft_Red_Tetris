import {
	OnGatewayConnection,
	OnGatewayDisconnect,
	OnGatewayInit, SubscribeMessage,
	WebSocketGateway, WebSocketServer,
} from '@nestjs/websockets';
import {Socket, Server } from "socket.io";
import { Logger } from "@nestjs/common";

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

	@SubscribeMessage('createRoom')
	createRoomRequest(client: Socket, payload: string) {
		client.join(payload)
		this.server.to(payload).emit('Welcome', `Sei Entrato nella Lobby: ${ payload }`)
	}

}