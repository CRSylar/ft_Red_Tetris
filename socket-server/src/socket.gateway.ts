import {
	OnGatewayConnection,
	OnGatewayDisconnect,
	OnGatewayInit, SubscribeMessage,
	WebSocketGateway, WebSocketServer,
} from '@nestjs/websockets';
import {Socket, Server } from "socket.io";
import { Logger } from "@nestjs/common";
import { generateChunks, allPlayerMap, allRoomStatus } from './Utils';
import roomPayloadDto from 'dtos/roomPayload.dto';

@WebSocketGateway(3001,{ transport: ['websocket'], path: '/socket.io' })
export class socketGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {

	@WebSocketServer() server: Server
	private logger: Logger = new Logger('socketGateway')

	afterInit(server : Server) : any {
		this.logger.log('Initialization')
	}

	handleConnection(client : Socket, ...args : any[]) : any {
		// Devo usare questo ignore perche mi da playerName come string[], su cui non posso
		// fare split, anche se ovviamente la variabile la setto io quindi sono sicuro sia string !== string[]
		// @ts-ignore
		const userName = client.handshake.query.playerName.split(']')[0]
		allPlayerMap.set(client.id, { userName, host: false, loser: false })
		this.logger.log('Client Connected: ', client.id)
	}

	handleDisconnect(client : Socket) : any {
		this.logger.log('Client Disconnected: ', client.id)
		client.broadcast.emit('clientLeaving', client.id)
		allPlayerMap.delete(client.id)
	}

	@SubscribeMessage('hostLeaving')
	assignNewHost(client: Socket, {room} : roomPayloadDto) {
		if (allPlayerMap.get(client.id).host) {
			const players = this.server.sockets.adapter.rooms.get(room)
			let newHost = false
			players.forEach( playerId => {
				if (playerId !== client.id && !allPlayerMap.get(playerId).loser && !newHost) {
					newHost = true
					allPlayerMap.set(playerId, {
						...allPlayerMap.get(playerId),
						host:true
					})
				}
				this.server.to(playerId).emit('hostUpgrade', {host: true})
			})
		}
	}

	@SubscribeMessage('joinRoom')
	createRoomRequest(client: Socket, payload: string[]) {
		const playerName = payload[1].split(']')[0]
		// Check if the room exist in this object
		const rooms = this.server.sockets.adapter.rooms
		if ( rooms.get(payload[0])?.size ) {
			this.logger.log('Joined')
			client.join(payload)
			this.server.to(client.id).emit('Welcome', {
				msg: `Sei Entrato nella Lobby: ${ payload[0] }`,
				payload: false,
				count: rooms.get(payload[0])?.size,
			})
			client.broadcast.to(payload).emit('Joined',  {
				msg: `${playerName} È entrato nella Lobby`,
				payload: rooms.get(payload[0])?.size,
			})
		}
		else {
			this.logger.log('Created')
			client.join(payload[0])
			this.server.to(payload[0]).emit('Created', {
				msg: `Sei il Propietario della Lobby: ${ payload[0] }`,
				payload: true,
			})
			allRoomStatus.set(payload[0], {inGame: false, quantity: 0})
			allPlayerMap.set(client.id, {
				...allPlayerMap.get(client.id),
				host: true,
			})
		}
	}

	@SubscribeMessage('startGameReq')
	startGame(client: Socket, {room} : roomPayloadDto) {
		if (allPlayerMap.get(client.id).host && !allRoomStatus.get(room).inGame) {
			const participants = []
			this.server.sockets.adapter.rooms.get(room).forEach(player => {
				const user = allPlayerMap.get(player)
				// resetto lo stato di loser a False a inizio game cosi da sovrascrivere eventuali game precedenti in cui era
				// stato settato a true
				allPlayerMap.set(player, {userName: user.userName, loser: false, host: user.host})
				participants.push([player, user.userName])
			})
			this.logger.log("Richiesta di start da : ", client.id, "nella Room: ", room)
			const chunks = generateChunks()
			this.logger.log('Chunks: ', chunks)
			allRoomStatus.set(room, {inGame: true, quantity: participants.length})
			this.server.to(room).emit('startGame', {chunks, participants})
		}
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
		client.broadcast.to(room).emit('scatteringSpectra', { spectra, id: client.id})

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
		//client.broadcast.to(room).emit('emittingMalusRows', {value})
		console.log("Malus : ", value, ' Room -> ', room)
		this.server.to(room).emit('emittingMalusRows', {value})
	}

	@SubscribeMessage('gameOver')
	updateLoserPlayer(client: Socket, {room} : roomPayloadDto) {
		const players = this.server.sockets.adapter.rooms.get(room)
		// Se la partita era in Single Player devo solo settare la partita come finita per poter essere rilanciata
		if (players.size === 1) {
			allRoomStatus.set(room, {
				...allRoomStatus.get(room),
				inGame: false
			})
			return
		}
		// Aggiorno lo stato del player su Loser se non era gia loser
		if (!allPlayerMap.get(client.id).loser){
			allPlayerMap.set(client.id, {
				...allPlayerMap.get(client.id),
				loser: true
			})
			// Aggiorno il conteggio dei giocatori ancora "in Gioco" cosi da tenere traccia del LastMenStanding
			const activePlayer = allRoomStatus.get(room).quantity - 1
			allRoomStatus.set(room, {
				...allRoomStatus.get(room),
				quantity: activePlayer
			})
			// Se c'é 1 solo utente rimasto la partita é finita, il vincitore deve diventare Host e il vecchio
			// host deve perdere questo status
			if (activePlayer === 1) {
				players.forEach( player => {
				// trovo il vecchio host e lo degrado - lato server
					if (allPlayerMap.get(player).host){
						allPlayerMap.set(player, {
							...allPlayerMap.get(player),
							host: false
						})
						// poi invio al client l'evento
						this.server.to(player).emit('downgradedLoser', {host: false})
					}
					// se il player non è perdente ( vincente) allora riceve l'evento e diventa host del prossimo match
					if (!allPlayerMap.get(player).loser) {
						this.server.to(room).emit('newWinner', allPlayerMap.get(player).userName)
						this.server.to(player).emit('YouWin' , {
							msg: 'Congrats! now you will promoted to Host !!',
							host: true
						})
						// aggiornamento host lato server
						allPlayerMap.set(player, {
							...allPlayerMap.get(player),
							host: true
						})
					}
				})
				// infine dichiaro il game come concluso - lato server ( altrimenti non é rilanciabile )
				allRoomStatus.set(room, {
					...allRoomStatus.get(room),
					inGame: false
				})
			}
		}
	}
}

