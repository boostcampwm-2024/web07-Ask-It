import { Body, Controller, Post } from '@nestjs/common';

import { ChatGateway } from './chat.gateway';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatGateway: ChatGateway) {}

  @Post('broadcast')
  broadcastToSession(@Body() body: { sessionId: string; token: string; message: string }) {
    const { sessionId, token, message } = body;

    console.log(`HTTP Broadcast Request to session ${sessionId}, excluding token ${token}, message: ${message}`);

    this.chatGateway.broadcastToSession(sessionId, token, message);
  }
}
