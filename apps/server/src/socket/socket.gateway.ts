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

  handleConnection(socket: Socket) {
    const sessionId = socket.handshake.query.sessionId as string;
    const token = socket.handshake.query.token as string;
    if (!sessionId || !token) return socket.disconnect();

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
  create(@MessageBody() data: string, @ConnectedSocket() socket: Socket) {
    const content = `서버가 받은 내용 : ${data}`;

    const clientInfo = this.socketToTokenMap.get(socket);
    if (!clientInfo) return;

    this.broadcastChat(clientInfo.sessionId, content);
  }

  private broadcastChat(sessionId: string, content: string) {
    this.server.to(sessionId).emit('chatMessage', { content });
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
