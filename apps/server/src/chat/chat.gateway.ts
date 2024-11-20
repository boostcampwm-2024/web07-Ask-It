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

@WebSocketGateway({ cors: true })
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  private tokenToSocketMap = new Map<string, string>();
  private socketToTokenMap = new Map<string, string>();

  handleConnection(client: Socket) {
    const sessionId = client.handshake.query.sessionId as string;
    const token = client.handshake.query.token as string;

    if (!sessionId || !token) {
      client.disconnect();
      return;
    }

    this.tokenToSocketMap.set(token, client.id);
    this.socketToTokenMap.set(client.id, token);

    client.join(sessionId);
    console.log(`Client ${client.id} with token ${token} joined session ${sessionId}`);
  }

  handleDisconnect(client: Socket) {
    const token = this.socketToTokenMap.get(client.id);

    if (token) {
      this.tokenToSocketMap.delete(token);
      this.socketToTokenMap.delete(client.id);
    }

    console.log(`Client ${client.id} disconnected`);
  }

  @SubscribeMessage('sendMessage')
  sendMessageToSession(@MessageBody() data: { sessionId: string; message: string }, @ConnectedSocket() client: Socket) {
    const { sessionId, message } = data;
    const token = this.socketToTokenMap.get(client.id);

    if (!token) return;

    client.to(sessionId).emit('message', { sender: token, message });
    console.log(`Message from ${token} to session ${sessionId}: ${message}`);
  }

  broadcastToSession(sessionId: string, excludeToken: string, message: string) {
    const excludeSocketId = this.tokenToSocketMap.get(excludeToken);

    const room = this.server.sockets.adapter.rooms.get(sessionId);

    if (!room) {
      console.log(`Room ${sessionId} does not exist.`);
      return;
    }

    room.forEach((socketId) => {
      if (socketId !== excludeSocketId) {
        const socket = this.server.sockets.sockets.get(socketId);
        socket?.emit('message', { user: 'system', message });
      }
    });

    console.log(`Broadcasted message to session ${sessionId}, excluding token ${excludeToken}: ${message}`);
  }
}
