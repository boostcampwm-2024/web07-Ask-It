import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

import { ChatsService } from '@chats/chats.service';
import { SessionTokenValidationGuard } from '@common/guards/session-token-validation.guard';
import { LoggerService } from '@logger/logger.service';
import { SOCKET_EVENTS } from '@socket/socket.constant';

interface Client {
  sessionId: string;
  token: string;
  socket: Socket;
}

@WebSocketGateway()
export class SocketGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  private tokenToSocketMap = new Map<string, Pick<Client, 'sessionId' | 'socket'>>(); //key : token
  private socketToTokenMap = new Map<Socket, Pick<Client, 'sessionId' | 'token'>>(); //key : socket

  constructor(
    private readonly chatsService: ChatsService,
    private readonly logger: LoggerService,
    private readonly sessionTokenValidationGuard: SessionTokenValidationGuard,
  ) {}

  async handleConnection(socket: Socket) {
    const sessionId = socket.handshake.query.sessionId as string;
    const token = socket.handshake.query.token as string;

    try {
      await this.sessionTokenValidationGuard.validateSessionToken(sessionId, token);
    } catch (error) {
      this.logger.warn(`Connection rejected: invalid sessionId or token`, 'SocketGateway');
      return socket.disconnect();
    }

    const originalSocket = this.tokenToSocketMap.get(token);

    if (originalSocket) {
      this.logger.warn(
        `Duplicate connection detected: token=${token}, disconnecting previous connection`,
        'SocketGateway',
      );
      originalSocket.socket.emit(SOCKET_EVENTS.DUPLICATED_CONNECTION);
      originalSocket.socket.disconnect();
    }

    this.socketToTokenMap.set(socket, { sessionId, token });
    this.tokenToSocketMap.set(token, { sessionId, socket });

    socket.join(sessionId);
    this.broadcastParticipantCount(sessionId);

    this.logger.log(`Client connected: token=${token}, sessionId=${sessionId}, socketId=${socket.id}`, 'SocketGateway');
  }

  handleDisconnect(socket: Socket) {
    const clientInfo = this.socketToTokenMap.get(socket);
    if (!clientInfo) {
      this.logger.warn(`Client disconnected: socketId=${socket.id}, no clientInfo found`, 'SocketGateway');
      return;
    }

    const { sessionId, token } = clientInfo;
    socket.leave(sessionId);
    this.tokenToSocketMap.delete(token);
    this.socketToTokenMap.delete(socket);
    this.broadcastParticipantCount(sessionId);
    this.logger.log(
      `Client disconnected: token=${token}, sessionId=${sessionId}, socketId=${socket.id}`,
      'SocketGateway',
    );
  }

  @SubscribeMessage(SOCKET_EVENTS.CREATE_CHAT)
  async create(@MessageBody() data: string, @ConnectedSocket() socket: Socket) {
    const clientInfo = this.socketToTokenMap.get(socket);
    if (!clientInfo) {
      this.logger.warn(`createChat event rejected: socketId=${socket.id}, no clientInfo found`, 'SocketGateway');
      return;
    }
    try {
      const { sessionId, token } = clientInfo;
      this.logger.log(`createChat event: token=${token}, sessionId=${sessionId}, data=${data}`, 'SocketGateway');
      const chattingData = await this.chatsService.saveChat({ sessionId, token, body: data });
      this.broadcastChat(clientInfo.sessionId, chattingData);
    } catch (error) {
      this.logger.error(
        `Failed to create chat: socketId=${socket.id}, error=${error.message}`,
        error.stack,
        'SocketGateway',
      );
      socket.emit(SOCKET_EVENTS.CHAT_ERROR, { message: '채팅 생성에 실패했습니다', error: error.message });
    }
  }

  private broadcastChat(sessionId: string, data: Record<any, any>) {
    this.server.to(sessionId).emit(SOCKET_EVENTS.CHAT_MESSAGE, data);
  }

  public createEventBroadcaster(event: string) {
    return (sessionId: string, token: string, content: Record<any, any>) => {
      const client = this.tokenToSocketMap.get(token);
      if (client) {
        client.socket.broadcast.to(sessionId).emit(event, content);
      }
    };
  }

  private getParticipantCount(sessionId: string) {
    const room = this.server.sockets.adapter.rooms.get(sessionId);
    return room ? room.size : 0;
  }

  private broadcastParticipantCount(sessionId: string) {
    this.server.to(sessionId).emit(SOCKET_EVENTS.PARTICIPANT_COUNT_UPDATED, {
      participantCount: this.getParticipantCount(sessionId),
    });
  }

  broadcastNewQuestion = this.createEventBroadcaster(SOCKET_EVENTS.QUESTION_CREATED);

  broadcastQuestionUpdate = this.createEventBroadcaster(SOCKET_EVENTS.QUESTION_UPDATED);

  broadcastQuestionDelete = this.createEventBroadcaster(SOCKET_EVENTS.QUESTION_DELETED);

  broadcastQuestionLike = this.createEventBroadcaster(SOCKET_EVENTS.QUESTION_LIKED);

  broadcastNewReply = this.createEventBroadcaster(SOCKET_EVENTS.REPLY_CREATED);

  broadcastReplyUpdate = this.createEventBroadcaster(SOCKET_EVENTS.REPLY_UPDATED);

  broadcastReplyDelete = this.createEventBroadcaster(SOCKET_EVENTS.REPLY_DELETED);

  broadcastReplyLike = this.createEventBroadcaster(SOCKET_EVENTS.REPLY_LIKED);

  broadcastHostChange = this.createEventBroadcaster(SOCKET_EVENTS.HOST_CHANGED);

  broadcastSessionEnd = this.createEventBroadcaster(SOCKET_EVENTS.SESSION_ENDED);
}
