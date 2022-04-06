import {
	OnGatewayConnection,
	OnGatewayDisconnect,
	OnGatewayInit, SubscribeMessage,
	WebSocketGateway, WebSocketServer,
} from '@nestjs/websockets';
import {Socket, Server } from "socket.io";
import { Logger } from "@nestjs/common";
import { generateChunks } from './Utils';
import roomPayloadDto from 'dtos/roomPayload.dto';

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
	startGame(client: Socket, {room} : roomPayloadDto) {
		const participants = []
		this.server.sockets.adapter.rooms.get(room).forEach(player => participants.push(player))
		this.logger.log("Richiesta di start da : ", client.id, "nella Room: ", room)
		const chunks = generateChunks()
		this.logger.log('Chunks: ', chunks)

		this.server.to(room).emit('startGame', {chunks, participants})
	}

	@SubscribeMessage('spectreUpdate')
	spectraScattering(client: Socket, {stage, room}) {
		/*
		 * lavoro su tutto lo stage in arrivo per pulire il dato
		 * il primo map mi dara la Row, il secondo map, quello che assegno
		 * a columns mi dara appunto la posizione nella colonna del pezzo
		 * il filter serve ad eliminare tutti i valori "undefined" che torna il map
		 * il For Loop finale serve a shiftare l'array spectra cosi da eliminare le righe
		 * in cui non c'è nessun pezzo, alla fine otteniamo il dato pulito delle coordinate
		 * [Row, Column] dei pezzi cosi da inviare un payload piu piccolo ai client per renderizzare
		 * lo spettro
		 * */
		const spectra : any[] = stage.map( (row, i) => {
			return {
				row: i,
				columns : row.map((el, i) => {
					if (el[0] !== 0)
						return i
				}).filter( el => el !== undefined)
			}
		})
		for (let i = 0; i < spectra.length;){
			if (spectra[i].columns.length === 0)
				spectra.shift()
			else
				i++
		}
		/* Con questo emit invio il dato a tutti gli ALTRI (me escluso) partecipanti della room */
		client.broadcast.to(room).emit('scatteringSpectra', { spectra, id: client.id })

		/* Con questo emit invio il dato a tutti (me incluso) i partecipanti della room
		 *      this.server.to(room).emit('scatteringSpectra', { spectra, id: client.id})
		 * */
	}

	@SubscribeMessage('moreChunkRequest')
	emitMoreChunks(client: Socket, { room }: roomPayloadDto) {
		const chunks = generateChunks()
		console.log('serving new Chunks to -> ', room)
		this.server.to(room).emit('servingChunks', {chunks})
	}

	@SubscribeMessage('malusRowsRequest')
	emitMalus(client: Socket, {value, room}) {
		client.broadcast.to(room).emit('emittingMalusRows', {value})
	}
}