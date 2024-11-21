import { UseGuards } from '@nestjs/common';
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

import { ChatsService } from '@src/chats/chats.service';
import { SessionTokenValidationGuard } from '@src/common/guards/session-token-validation.guard';

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

  constructor(private readonly chatsService: ChatsService) {}

  handleConnection(socket: Socket) {
    const sessionId = socket.handshake.query.sessionId as string;
    const token = socket.handshake.query.token as string;
    const originalSocket = this.tokenToSocketMap.get(token);

    if (!sessionId || !token) return socket.disconnect();

    if (originalSocket) {
      originalSocket.socket.emit('duplicatedConnection');
      originalSocket.socket.disconnect();
    }

    this.socketToTokenMap.set(socket, { sessionId, token });
    this.tokenToSocketMap.set(token, { sessionId, socket });

    socket.join(sessionId);
  }

  handleDisconnect(socket: Socket) {
    const clientInfo = this.socketToTokenMap.get(socket);
    if (!clientInfo) return;

    const { sessionId, token } = clientInfo;
    socket.leave(sessionId);
    this.tokenToSocketMap.delete(token);
    this.socketToTokenMap.delete(socket);
  }

  @SubscribeMessage('createChat')
  async create(@MessageBody() data: string, @ConnectedSocket() socket: Socket) {
    const clientInfo = this.socketToTokenMap.get(socket);
    if (!clientInfo) return;
    try {
      const { sessionId, token } = clientInfo;
      const chattingData = await this.chatsService.saveChat({ sessionId, token, body: data });
      this.broadcastChat(clientInfo.sessionId, chattingData);
    } catch (error) {
      socket.emit('chatError', { message: '채팅 생성에 실패했습니다', error: error.message });
    }
  }

  private broadcastChat(sessionId: string, data: Record<any, any>) {
    this.server.to(sessionId).emit('chatMessage', data);
  }

  private createEventBroadcaster(event: string) {
    return (sessionId: string, token: string, content: Record<any, any>) => {
      const client = this.tokenToSocketMap.get(token);
      if (client) {
        client.socket.broadcast.to(sessionId).emit(event, content);
      }
    };
  }

  broadcastNewQuestion = this.createEventBroadcaster('questionCreated');

  broadcastQuestionUpdate = this.createEventBroadcaster('questionUpdated');

  broadcastQuestionDelete = this.createEventBroadcaster('questionDeleted');

  broadcastQuestionLike = this.createEventBroadcaster('questionLiked');

  broadcastNewReply = this.createEventBroadcaster('replyCreated');

  broadcastReplyUpdate = this.createEventBroadcaster('replyUpdated');

  broadcastReplyDelete = this.createEventBroadcaster('replyDeleted');

  broadcastReplyLike = this.createEventBroadcaster('replyLiked');
}
